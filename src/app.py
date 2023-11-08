"""

ALMACENA SERVER v2.0

"""

import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, MateriasPrimas, UserMateriasPrimas, Receta, UserReceta, IngredientesReceta, UserProductoFinal
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt



ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "AlmaCena"
jwt = JWTManager(app)
app.url_map.strict_slashes = False


# DATABASE Configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

CORS(app)
setup_admin(app)
setup_commands(app)
bcrypt = Bcrypt(app)

app.register_blueprint(api, url_prefix='/api')

# HANDLE ERRORS
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# ENDPOINTS | HOME

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# ENDPOINTS | VER TODOS LOS USERS

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.name} for user in users]), 200

# ENDPOINTS | VER INFO DE USER

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user():
    user_id=get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException("User not found", status_code=404)
    return jsonify(user.serialize()), 200


# USER | SIGNUP #


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    app.logger.info("Data received from signup endpoint: %s", data) 
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    last_name = data.get("last_name")
    address= data.get("address")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "Email already exists"}), 400

    new_user = User(
        email=email,
        password=bcrypt.generate_password_hash(password).decode('utf-8'),
        name=name,
        last_name=last_name,
        address=address
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({"token": access_token, "user_id": new_user.id}), 201


# USER | LOGIN #


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # CORRECT PASS=> GENERATE TOKEN
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token, "user_id": user.id}), 200
    else:
        # USER NOT FOUND OR INCORRECT PASS
        return jsonify({"msg": "Bad username or password"}), 401


# USER | LOGOUT #


@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify({"msg": "Logout successful"}), 200


# ENDPOINT | MATERIAS PRIMAS DEL USUARIO

@app.route('/dashboard/ingredients', methods=['GET'])
@jwt_required()
def get_user_ingredients():
    user_id=get_jwt_identity()
    user_materias_primas = UserMateriasPrimas.query.filter_by(user_id=user_id).all()

    ingredients_list = []
    for user_materia_prima in user_materias_primas:
        materia_prima = MateriasPrimas.query.get(user_materia_prima.materias_primas_id)
        if materia_prima:
            ingredient_data = {
                "materia_prima_id": user_materia_prima.materias_primas_id,
                "nombre": materia_prima.nombre,
                "cantidad_stock": user_materia_prima.cantidad_stock
            }
            ingredients_list.append(ingredient_data)

    return jsonify(ingredients_list), 200

# ENDPOINT | CREAR NUEVO INGREDIENTE CON USUARIO

@app.route('/dashboard/ingredients', methods=['POST'])
@jwt_required()
def create_ingredient():
    user_id=get_jwt_identity()
    body = request.get_json()
    if body is None:
        raise APIException("Request body is missing", status_code=400)

    # Verifica que el usuario exista en la base de datos
    user = User.query.get(user_id)
    if not user:
        raise APIException("User not found", status_code=404)

    # Obtiene la cantidad y la cantidad mínima del cuerpo de la solicitud o establece 0 como valor predeterminado
    cantidad = body.get("cantidad", 0)
    cantidad_minima = body.get("cantidad_minima", 0)

    new_user_materia_prima = UserMateriasPrimas(
        user_id=user_id,
        cantidad_stock=cantidad,
        minimo_stock=cantidad_minima
    )

    # Crea una nueva instancia de MateriasPrimas y establece la relación con UserMateriasPrimas
    new_materia_prima = MateriasPrimas(
        user_materias_primas=new_user_materia_prima,
        nombre=body.get("nombre"),
        clasificacion=body.get("clasificacion"),
        unidad_medida=body.get("unidad_medida")
    )

    # Agrega las nuevas instancias a la base de datos
    db.session.add(new_user_materia_prima)
    db.session.add(new_materia_prima)
    db.session.commit()

    return jsonify({"msg": "Materia Prima creada con éxito"}), 201




# ENDPOINT | PRODUCTOS DEL USUARIO

@app.route('/dashboard/products', methods=['GET'])
@jwt_required()
def get_user_products(user_id):
    user_id=get_jwt_identity()
    user_products = UserProductoFinal.query.filter_by(user_id=user_id).all()

    products_list = []
    for user_product in user_products:
        product_data = {
            "receta_id": user_product.receta_id,
            "nombre": user_product.receta_relationship.nombre,
            "cantidad_inventario": user_product.cantidad_inventario
        }
        products_list.append(product_data)

    return jsonify(products_list), 200

# ENDPOINT | RECETAS DEL USUARIO

@app.route('/dashboard/recipes', methods=['GET'])
@jwt_required()
def get_user_recipes():
    user_id=get_jwt_identity()
    user_recetas = UserReceta.query.filter_by(user_id=user_id).all()

    recipes_list = []
    for user_receta in user_recetas:
        recipe_data = {
            "receta_id": user_receta.receta_id,
            "nombre": user_receta.receta_relationship.nombre,
            "rinde": user_receta.receta_relationship.rinde
        }
        recipes_list.append(recipe_data)

    return jsonify(recipes_list), 200

# ENDPOINT | SINGLE RECIPE DE UN USUARIO

@app.route('/dashboard/recipes/<int:recipe_id>', methods=['GET'])
@jwt_required()
def get_user_recipe(recipe_id):
    user_id=get_jwt_identity()
    user_receta = UserReceta.query.filter_by(user_id=user_id, receta_id=recipe_id).first()

    if user_receta is None:
        return jsonify({"error": "Receta no encontrada para el usuario especificado"}), 404

    receta_info = {
        "receta_id": user_receta.receta_id,
        "nombre": user_receta.receta_relationship.nombre,
        "rinde": user_receta.receta_relationship.rinde,
        "ingredientes": []
    }

    ingredientes_receta = IngredientesReceta.query.filter_by(receta_id=recipe_id).all()
    for ingrediente in ingredientes_receta:
        materia_prima = MateriasPrimas.query.get(ingrediente.materias_primas_id)
        if materia_prima:
            ingrediente_data = {
                "materia_prima_id": ingrediente.materias_primas_id,
                "nombre": materia_prima.nombre,
                "cantidad_necesaria": ingrediente.cantidad_necesaria,
                "unidad_medida": materia_prima.unidad_medida
            }
            receta_info["ingredientes"].append(ingrediente_data)

    return jsonify(receta_info), 200


 # ENDPOINT | DASHBOARD DE UN USUARIO

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def get_user_dashboard():
    user_id=get_jwt_identity()
    user_ingredientes = UserMateriasPrimas.query.filter_by(user_id=user_id).all()
    user_productos = UserProductoFinal.query.filter_by(user_id=user_id).all()

    ingredientes_list = []
    for user_ingrediente in user_ingredientes:
        if user_ingrediente.cantidad_stock <= user_ingrediente.minimo_stock:
            materia_prima = MateriasPrimas.query.get(user_ingrediente.materias_primas_id)
            if materia_prima:
                ingrediente_data = {
                    "materia_prima_id": user_ingrediente.materias_primas_id,
                    "nombre": materia_prima.nombre,
                    "cantidad_stock": user_ingrediente.cantidad_stock,
                    "unidad_medida": materia_prima.unidad_medida,
                    "minimo_stock": user_ingrediente.minimo_stock
                }
                ingredientes_list.append(ingrediente_data)

    productos_list = []
    for user_producto in user_productos:
        if user_producto.cantidad_inventario <= user_producto.cantidad_inventario_minimo:
            producto = UserProductoFinal.query.get(user_producto.id)
            if producto:
                receta = Receta.query.get(producto.receta_id)
                if receta:
                    producto_data = {
                        "producto_final_id": user_producto.id,
                        "nombre": receta.nombre,
                        "cantidad_inventario": user_producto.cantidad_inventario,
                        "unidad_medida": receta.unidad_medida,
                        "clasificacion": user_producto.clasificacion,
                        "cantidad_inventario_minimo": user_producto.cantidad_inventario_minimo     
                    }
                    productos_list.append(producto_data)

    return jsonify({"ingredientes": ingredientes_list, "productos_finales": productos_list}), 200

##################################################################################################################################
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
    