"""

ALMACENA SERVER v5.0

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
from functools import wraps
from datetime import timedelta
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message



ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "AlmaCena"
jwt = JWTManager(app)
app.url_map.strict_slashes = False


# DATABASE Configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
CORS(app)
setup_admin(app)
setup_commands(app)
bcrypt = Bcrypt(app)
app.register_blueprint(api, url_prefix='/api')

def active_account_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        if user_id is None:
            raise APIException("User not found", status_code=404)

        user = User.query.get(user_id)
        if user is None:
            raise APIException("User not found", status_code=404)

        if not user.is_active:
            return jsonify({"msg": "Account is deactivated"}), 403

        return fn(*args, **kwargs)

    return wrapper

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

##############################################################################################################################
##############################################################################################################################

######################################################### USER DATA ############################################################

# READ | TODOS LOS USUARIOS

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.name} for user in users]), 200


# READ |
@app.route('/profile', methods=['GET'])
@jwt_required()
@active_account_required
def get_user():
    user_id = get_jwt_identity()
    if user_id is None:
        raise APIException("User not found", status_code=404)
    user = User.query.get(user_id)
    if user is None:
        raise APIException("User not found", status_code=404)
    return jsonify(user.serialize()), 200

# UPDATE |
@app.route('/profile', methods=['PUT'])
@jwt_required()
@active_account_required
def update_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    body = request.get_json()

    if body is None:
        raise APIException("Request body is missing", status_code=400)

    # Actualizar campos del usuario
    user.name = body.get("name", user.name)
    user.last_name = body.get("last_name", user.last_name)
    user.address = body.get("address", user.address)

    # Verificar si se proporcionó una nueva contraseña
    new_password = body.get("new_password")

    if new_password:
        # Actualizar la contraseña si se proporcionó una nueva
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    db.session.commit()

    return jsonify({"msg": "Perfil de usuario actualizado con éxito"}), 200

# DELETE | 
@app.route('/profile', methods=['DELETE'])
@jwt_required()
@active_account_required
def delete_user():
    user_id = get_jwt_identity()
    user_to_delete = User.query.get(user_id)

    if user_to_delete is None:
        raise APIException("User not found", status_code=404)
    
    user_to_delete.is_active = False
    db.session.commit()

    return jsonify({"msg": "User deactivated successfully"}), 200


# PUT | REACTIVAR USUARIO POR EMAIL

@app.route('/reactivate', methods=['PUT'])
def reactivate_user():
    data = request.get_json()
    email_to_reactivate = data.get("email")

    user_to_reactivate = User.query.filter_by(email=email_to_reactivate, is_active=False).first()

    if user_to_reactivate is None:
        return jsonify({"msg": "User not found or already active"}), 404

    # Reactivar el usuario
    user_to_reactivate.is_active = True
    db.session.commit()

    return jsonify({"msg": "User reactivated successfully"}), 200

##############################################################################################################################
##############################################################################################################################

################################################# GESTION DE USUARIO ##########################################################

# SIGNUP #

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    app.logger.info("Data received from signup endpoint: %s", data)
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    last_name = data.get("last_name")
    address = data.get("address")
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
    expires = timedelta(minutes=15)
    access_token = create_access_token(identity=new_user.id, expires_delta=expires)
    return jsonify({"El usuario": name, "fue creado con exito, su token es": access_token, "user_id": new_user.id}), 201


# LOGIN #

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()
    if user.is_active == False: return jsonify({"msg": "Account is deactivated"}), 403
    if user and bcrypt.check_password_hash(user.password, password):
        # CORRECT PASS=> GENERATE TOKEN
        expires = timedelta(minutes=15)
        access_token = create_access_token(identity=user.id, expires_delta=expires)
        return jsonify({"token": access_token, "user_id": user.id}), 200
    else:
        # USER NOT FOUND OR INCORRECT PASS
        return jsonify({"msg": "Bad username or password"}), 401


# USER | LOGOUT #

@app.route("/logout", methods=["POST"])
@jwt_required()
@active_account_required
def logout():
    return jsonify({"msg": "Logout successful"}), 200


# USER | PASSWORD RECOVERY #

app.config.update(dict(
    DEBUG = False,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = 'rsm.fries@gmail.com',
    MAIL_PASSWORD = 'ckoyxwdizftenmls',
))
mail = Mail(app)

@app.route('/api/send_mail', methods=['GET'])
def send_mail():
    msg = Message(subject="test de mail", sender='rsm.fries@gmail.com', recipients=['rsm.fries@gmail.com'])
    msg.body = "Hola desde la clase"

    try:
        mail.send(msg)
        return jsonify({"message": "Mail sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)



##############################################################################################################################
##############################################################################################################################

########################################## MATERIAS PRIMAS o INGREDIENTES ###################################################

# CREATE |

@app.route('/dashboard/ingredients', methods=['POST'])
@jwt_required()
@active_account_required
def create_ingredient():
    user_id = get_jwt_identity()
    body = request.get_json()

    if body is None:
        raise APIException("Request body is missing", status_code=400)

    user = User.query.get(user_id)
    if not user:
        raise APIException("User not found", status_code=404)

    cantidad = body.get("cantidad", 0)
    minimo_stock = body.get("minimo_stock", 0)

    new_user_materia_prima = UserMateriasPrimas(
        user_id=user_id,
        cantidad_stock=cantidad,
        minimo_stock=minimo_stock
    )

    new_materia_prima = MateriasPrimas(
        nombre=body.get("nombre"),
        clasificacion=body.get("clasificacion"),
        unidad_medida=body.get("unidad_medida")
    )

    new_user_materia_prima.materias_primas_relationship = new_materia_prima  # Relacion

    db.session.add(new_user_materia_prima)
    db.session.commit()

    return jsonify({"msg": "Materia Prima creada con éxito"}), 201

# READ |

@app.route('/dashboard/ingredients', methods=['GET'])
@jwt_required()
@active_account_required
def get_user_ingredients():
    user_id = get_jwt_identity()
    user_materias_primas = UserMateriasPrimas.query.filter_by(
        user_id=user_id).all()
    ingredients_list = []
    for user_materia_prima in user_materias_primas:
        materia_prima = MateriasPrimas.query.get(
            user_materia_prima.materias_primas_id)
        if materia_prima:
            ingredient_data = {
                "materia_prima_id": user_materia_prima.materias_primas_id,
                "nombre": materia_prima.nombre,
                "cantidad_stock": user_materia_prima.cantidad_stock,
                "cantidad_stock_minimo": user_materia_prima.minimo_stock,
                "clasificacion": materia_prima.clasificacion,
                "unidad_medida": materia_prima.unidad_medida 
            }
            ingredients_list.append(ingredient_data)
    return jsonify(ingredients_list), 200

# UPDATE |

@app.route('/dashboard/ingredients', methods=['PUT'])
@jwt_required()
@active_account_required
def update_ingredient():
    user_id = get_jwt_identity()
    body = request.get_json()

    if body is None:
        raise APIException("Request body is missing", status_code=400)

    materia_prima_id = body.get("materia_prima_id")
    user_materia_prima = UserMateriasPrimas.query.filter_by(
        user_id=user_id, materias_primas_id=materia_prima_id).first()

    if not user_materia_prima:
        raise APIException(
            "Materia prima not found for the user", status_code=404)

    user_materia_prima.cantidad_stock = body.get(
        "cantidad_stock", user_materia_prima.cantidad_stock)
    user_materia_prima.minimo_stock = body.get(
        "minimo_stock", user_materia_prima.minimo_stock)

    db.session.commit()

    return jsonify({"msg": "Materia Prima actualizada con éxito"}), 200

# DELETE |

@app.route('/dashboard/ingredients', methods=['DELETE'])
@jwt_required()
@active_account_required
def delete_ingredient():
    user_id = get_jwt_identity()

    # Obtener ID desde el cuerpo del request
    body = request.get_json()
    if body is None or "materia_prima_id" not in body:
        raise APIException(
            "Request body is missing materia_prima_id", status_code=400)

    materia_prima_id = body["materia_prima_id"]

    # Buscar la materia prima del usuario
    user_materia_prima = UserMateriasPrimas.query.filter_by(
        user_id=user_id, materias_primas_id=materia_prima_id).first()

    if not user_materia_prima:
        return jsonify({"error": "Materia prima no encontrada para el usuario especificado"}), 404

    # Eliminar la materia prima del usuario
    db.session.delete(user_materia_prima)
    db.session.commit()

    return jsonify({"msg": "Materia Prima eliminada con éxito"}), 200

##############################################################################################################################
##############################################################################################################################

####################################################### PRODUCTOS ############################################################

# CREATE |

@app.route('/dashboard/products', methods=['POST'])
@jwt_required()
@active_account_required
def create_product():
    user_id = get_jwt_identity()
    body = request.get_json()

    if body is None:
        raise APIException("Request body is missing", status_code=400)

    user = User.query.get(user_id)
    if not user:
        raise APIException("User not found", status_code=404)

    receta_nombre = body.get("receta_nombre")
    receta = Receta.query.filter_by(nombre=receta_nombre).first()

    if not receta:
        raise APIException("Receta not found", status_code=404)

    cantidad_inventario = body.get("cantidad_inventario", 0)
    clasificacion = body.get("clasificacion", "")
    cantidad_inventario_minimo = body.get("cantidad_inventario_minimo", 0)

    new_user_producto_final = UserProductoFinal(
        user_id=user_id,
        receta_id=receta.id,
        cantidad_inventario=cantidad_inventario,
        clasificacion=clasificacion,
        cantidad_inventario_minimo=cantidad_inventario_minimo
    )

    db.session.add(new_user_producto_final)
    db.session.commit()

    return jsonify({"msg": "Producto Final creado con éxito"}), 201

# READ |

@app.route('/dashboard/products', methods=['GET'])
@jwt_required()
@active_account_required
def get_user_products():
    user_id = get_jwt_identity()
    user_products = UserProductoFinal.query.filter_by(user_id=user_id).all()
    products_list = []
    for user_product in user_products:
        receta = Receta.query.get(user_product.receta_id)
        if receta:
            product_data = {
                "receta_id": user_product.receta_id,
                "nombre": receta.nombre,
                "cantidad_inventario": user_product.cantidad_inventario,
                "clasificacion": user_product.clasificacion,
                "cantidad_inventario_minimo": user_product.cantidad_inventario_minimo,
                "unidad_medida": receta.unidad_medida
            }
            products_list.append(product_data)
    return jsonify(products_list), 200


# UPDATE |

@app.route('/dashboard/products', methods=['PUT'])
@jwt_required()
@active_account_required
def update_product():
    user_id = get_jwt_identity()

    # Obtener ID desde el cuerpo del request
    body = request.get_json()
    if body is None or "id" not in body:
        raise APIException("Request body is missing ID", status_code=400)

    product_id = body["id"]

    # Obtener el producto final
    user_producto = UserProductoFinal.query.filter_by(
    user_id=user_id, receta_id=product_id).first()

    if user_producto is None:
        return jsonify({"error": "Producto final no encontrado para el usuario especificado"}), 404

    # Actualizar campos del Producto Final
    if "cantidad_inventario" in body:
        user_producto.cantidad_inventario = body["cantidad_inventario"]
    if "clasificacion" in body:
        user_producto.clasificacion = body["clasificacion"]
    if "cantidad_inventario_minimo" in body:
        user_producto.cantidad_inventario_minimo = body["cantidad_inventario_minimo"]

    db.session.commit()
    

    return jsonify({"msg": "Producto Final actualizado con éxito"}), 200


# DELETE |

@app.route('/dashboard/products', methods=['DELETE'])
@jwt_required()
@active_account_required
def delete_product():
    user_id = get_jwt_identity()

    # Obtener ID desde el cuerpo del request
    body = request.get_json()
    if body is None or "product_id" not in body:
        raise APIException(
            "Request body is missing product_id", status_code=400)

    product_id = body["product_id"]

    # Buscar el producto final del usuario
    user_producto = UserProductoFinal.query.filter_by(
        user_id=user_id, receta_id=product_id).first()

    if not user_producto:
        return jsonify({"error": "Producto final no encontrado para el usuario especificado"}), 404 

    # Eliminar el producto final del usuario
    db.session.delete(user_producto)
    db.session.commit()

    return jsonify({"msg": "Producto Final eliminado con éxito"}), 200


##############################################################################################################################
##############################################################################################################################

################################################## TODAS LAS RECETAS #########################################################

# READ |

@app.route('/dashboard/recipes', methods=['GET'])
@jwt_required()
@active_account_required
def get_user_recipes():
    user_id = get_jwt_identity()
    user_recetas = UserReceta.query.filter_by(user_id=user_id).all()
    recipes_list = []
    for user_receta in user_recetas:
        recipe_data = {
            "receta_id": user_receta.receta_id,
            "nombre": user_receta.receta_relationship.nombre,
            "rinde": user_receta.receta_relationship.rinde,
            "unidad_medida": user_receta.receta_relationship.unidad_medida,
        }
        recipes_list.append(recipe_data)
    return jsonify(recipes_list), 200


##############################################################################################################################
##############################################################################################################################

######################################################### RECETA #############################################################

# CREATE |

@app.route('/dashboard/recipes', methods=['POST'])
@jwt_required()
@active_account_required
def create_recipe():
    user_id = get_jwt_identity()
    body = request.get_json()

    if body is None:
        raise APIException("Request body is missing", status_code=400)

    user = User.query.get(user_id)
    if not user:
        raise APIException("User not found", status_code=404)

    new_recipe = Receta(
        nombre=body.get("nombre"),
        rinde=body.get("rinde"),
        unidad_medida=body.get("unidad_medida")
    )

    # Obtener las materias primas del usuario para mostrar en las opciones de la receta
    user_materias_primas = UserMateriasPrimas.query.filter_by(
        user_id=user_id).all()

    # Asociar ingredientes a la receta
    ingredientes_receta_info = []  # Lista para almacenar la información de los ingredientes

    for ingrediente in body.get("ingredientes", []):
        materia_prima_id = ingrediente.get("materia_prima_id")
        cantidad_necesaria = ingrediente.get("cantidad_necesaria")

        # Verificar que la materia prima pertenezca al usuario
        matching_materias_primas = [
            mp for mp in user_materias_primas if mp.materias_primas_id == materia_prima_id]

        if not matching_materias_primas:
            raise APIException(
                "Invalid ingredient: Materia prima not found for the user", status_code=400)

        # Tomar la primera coincidencia
        materia_prima_id = matching_materias_primas[0].materias_primas_id

        # Obtener la información de la materia prima, incluida la unidad de medida
        materia_prima = MateriasPrimas.query.get(materia_prima_id)

        if materia_prima:
            # Crear la relación entre la receta y la materia prima como ingrediente
            new_ingrediente = IngredientesReceta(
                receta_relationship=new_recipe,
                materias_primas_id=materia_prima_id,
                cantidad_necesaria=cantidad_necesaria
            )
            db.session.add(new_ingrediente)

            # Almacenar la información del ingrediente en la lista
            ingrediente_data = {
                "materia_prima_id": materia_prima_id,
                "nombre": materia_prima.nombre,
                "cantidad_necesaria": cantidad_necesaria,
                "unidad_medida": materia_prima.unidad_medida
            }
            ingredientes_receta_info.append(ingrediente_data)

    # Crear la relación entre el usuario y la receta
    user_receta = UserReceta(
        user_relationship=user,
        receta_relationship=new_recipe
    )
    db.session.add(user_receta)

    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({"msg": "Receta creada con éxito", "ingredientes": ingredientes_receta_info}), 201

# READ |

@app.route('/dashboard/recipes/<int:recipe_id>', methods=['GET'])
@jwt_required()
@active_account_required
def get_user_recipe(recipe_id):
    user_id = get_jwt_identity()
    user_receta = UserReceta.query.filter_by(
        user_id=user_id, receta_id=recipe_id).first()
    if user_receta is None:
        return jsonify({"error": "Receta no encontrada para el usuario especificado"}), 404
    receta_info = {
        "receta_id": user_receta.receta_id,
        "nombre": user_receta.receta_relationship.nombre,
        "rinde": user_receta.receta_relationship.rinde,
        "unidad_medida_rinde": user_receta.receta_relationship.unidad_medida,
        "ingredientes": []
    }
    ingredientes_receta = IngredientesReceta.query.filter_by(
        receta_id=recipe_id).all()
    for ingrediente in ingredientes_receta:
        materia_prima = MateriasPrimas.query.get(
            ingrediente.materias_primas_id)
        if materia_prima:
            ingrediente_data = {
                "materia_prima_id": ingrediente.materias_primas_id,
                "nombre": materia_prima.nombre,
                "cantidad_necesaria": ingrediente.cantidad_necesaria,
                "unidad_medida": materia_prima.unidad_medida
            }
            receta_info["ingredientes"].append(ingrediente_data)
    return jsonify(receta_info), 200


# UPDATE |


@app.route('/dashboard/recipes/<int:recipe_id>', methods=['PUT'])
@jwt_required()
@active_account_required
def update_recipe(recipe_id):
    user_id = get_jwt_identity()
    user_receta = UserReceta.query.filter_by(
        user_id=user_id, receta_id=recipe_id).first()

    if user_receta is None:
        return jsonify({"error": "Receta no encontrada para el usuario especificado"}), 404

    body = request.get_json()
    if body is None:
        raise APIException("Request body is missing", status_code=400)

    # Actualizar campos de la receta
    user_receta.receta_relationship.nombre = body.get(
        "nombre", user_receta.receta_relationship.nombre)
    user_receta.receta_relationship.rinde = body.get(
        "rinde", user_receta.receta_relationship.rinde)
    user_receta.receta_relationship.unidad_medida = body.get(
        "unidad_medida", user_receta.receta_relationship.unidad_medida)

    # Actualizar ingredientes
    ingredientes_actualizados = body.get("ingredientes", [])

    # Obtener todos los ingredientes existentes de la receta
    ingredientes_existentes = IngredientesReceta.query.filter_by(
        receta_id=recipe_id).all()

    # Crear un conjunto de IDs de ingredientes existentes para facilitar la comparación
    ids_ingredientes_existentes = set(
        ingrediente.materias_primas_id for ingrediente in ingredientes_existentes)

    # Iterar sobre los ingredientes proporcionados en el cuerpo del JSON
    for ingrediente in ingredientes_actualizados:
        materia_prima_id = ingrediente.get("materia_prima_id")
        cantidad_necesaria = ingrediente.get("cantidad_necesaria")

        # Verificar que la materia prima pertenezca al usuario
        matching_materias_primas = UserMateriasPrimas.query.filter_by(
            user_id=user_id, materias_primas_id=materia_prima_id).first()

        if not matching_materias_primas:
            raise APIException(
                "Invalid ingredient: Materia prima not found for the user", status_code=400)

        # Actualizar la cantidad necesaria si el ingrediente ya existe
        if materia_prima_id in ids_ingredientes_existentes:
            ingrediente_existente = next(
                i for i in ingredientes_existentes if i.materias_primas_id == materia_prima_id)
            ingrediente_existente.cantidad_necesaria = cantidad_necesaria
        else:
            # Crear la relación entre la receta y la materia prima como nuevo ingrediente
            new_ingrediente = IngredientesReceta(
                receta_relationship=user_receta.receta_relationship,
                materias_primas_id=materia_prima_id,
                cantidad_necesaria=cantidad_necesaria
            )
            db.session.add(new_ingrediente)

    # Eliminar ingredientes que no están en la lista de ingredientes actualizados
    ids_ingredientes_actualizados = set(
        ingrediente.get("materia_prima_id") for ingrediente in ingredientes_actualizados)
    ids_ingredientes_a_eliminar = ids_ingredientes_existentes - \
        ids_ingredientes_actualizados

    IngredientesReceta.query.filter(
        IngredientesReceta.materias_primas_id.in_(ids_ingredientes_a_eliminar),
        IngredientesReceta.receta_id == recipe_id
    ).delete(synchronize_session=False)

    db.session.commit()

    return jsonify({"msg": "Receta y ingredientes actualizados con éxito"}), 200

# DELETE |


@app.route('/dashboard/recipes/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
@active_account_required
def delete_recipe(recipe_id):
    user_id = get_jwt_identity()

    # Buscar la receta del usuario
    user_receta = UserReceta.query.filter_by(
        user_id=user_id, receta_id=recipe_id).first()

    if not user_receta:
        return jsonify({"error": "Receta no encontrada para el usuario especificado"}), 404

    # Eliminar la relación entre el usuario y la receta
    db.session.delete(user_receta)

    # Eliminar los ingredientes de la receta
    IngredientesReceta.query.filter_by(receta_id=recipe_id).delete()

    # Eliminar la receta
    db.session.delete(user_receta.receta_relationship)

    db.session.commit()

    return jsonify({"msg": "Receta eliminada con éxito"}), 200

################################################################################################################################
################################################################################################################################

######################################################### DASHBOARD ############################################################

 # READ |


@app.route('/dashboard', methods=['GET'])
@jwt_required()
@active_account_required
def get_user_dashboard():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    user_ingredientes = UserMateriasPrimas.query.filter_by(
        user_id=user_id).all()
    user_productos = UserProductoFinal.query.filter_by(user_id=user_id).all()

    ingredientes_list = []
    for user_ingrediente in user_ingredientes:
        if user_ingrediente.cantidad_stock <= user_ingrediente.minimo_stock:
            materia_prima = MateriasPrimas.query.get(
                user_ingrediente.materias_primas_id)
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

    response_data = {
        "name": user.name,
        "last_name": user.last_name,
        "ingredientes": ingredientes_list,
        "productos_finales": productos_list
    }

    return jsonify(response_data), 200

################################################################################################################################
################################################################################################################################

######################################################## MAKE RECIPE ############################################################


@app.route('/dashboard/recipes/make', methods=['POST'])
@jwt_required()
def make_recipe():
    try:
        user_id = get_jwt_identity()

        data = request.get_json()
        recipe_id = data.get('recipe_id')

        # Verifica que la receta exista para el usuario
        user_recipe = UserReceta.query.filter_by(user_id=user_id, receta_id=recipe_id).first()
        if not user_recipe:
            return jsonify({"error": "Receta no encontrada para el usuario especificado"}), 404

        # Obtén la lista de ingredientes de la receta
        ingredients = IngredientesReceta.query.filter_by(receta_id=recipe_id).all()

        # Actualiza las cantidades en las materias primas del usuario
        for ingredient in ingredients:
            material_id = ingredient.materias_primas_id
            quantity_needed = ingredient.cantidad_necesaria

            # Resta la cantidad necesaria de cada materia prima
            user_material = UserMateriasPrimas.query.filter_by(user_id=user_id, materias_primas_id=material_id).first()
            if user_material:
                user_material.cantidad_stock -= quantity_needed
                db.session.commit()

        # Aumenta la cantidad de productos finales según el rendimiento de la receta
        total_yield = user_recipe.receta_relationship.rinde
        user_product = UserProductoFinal.query.filter_by(user_id=user_id, receta_id=recipe_id).first()
        if user_product:
            user_product.cantidad_inventario += total_yield
            db.session.commit()

        return jsonify({"message": "Receta realizada con éxito"}), 200

    except SQLAlchemyError as e:
        print(e)
        return jsonify({"error": "Error al realizar la receta"}), 500


##################################################################################################################################
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
