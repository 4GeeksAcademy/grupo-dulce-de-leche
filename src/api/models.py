from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    reset_token = db.Column(db.String(100), unique=True, nullable=True)
    photo_url = db.Column(db.String(500))

    def __repr__(self):
         return '{}'.format (self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name" : self.name,
            "last_name" : self.last_name,
            "email": self.email,
            "address": self.address,
            "photo_url": self.photo_url,
        }
    
class MateriasPrimas(db.Model):
    __tablename__ = 'materias_primas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    clasificacion = db.Column(db.String(80), nullable=False)
    unidad_medida = db.Column(db.String(80), nullable=False )
    

    def __repr__(self): #terminal con el print y en el admin
        return 'Materia prima: {} - Clasificacion {} - Unidad de medida: {}'.format (self.nombre, self.clasificacion, self.unidad_medida)
    
    def serialize(self):
        return {
            "nombre": self.nombre,
            "clasificacion": self.clasificacion,
            "unidad_medida": self.unidad_medida,
        }
    
 
class UserMateriasPrimas(db.Model):
    __tablename__ = 'user_materias_primas'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) #tablename - el campo que va a relacionar user.id
    user_relationship = db.relationship(User) #clase - con la tabla:  User
    materias_primas_id = db.Column(db.Integer, db.ForeignKey('materias_primas.id'))
    materias_primas_relationship = db.relationship(MateriasPrimas)
    cantidad_stock = db.Column(db.Integer, nullable=False)
    minimo_stock = db.Column(db.Integer, nullable=False)

    def __repr__(self): #terminal con el print y en el admin
        return 'Usuario {} con materia prima {}'.format (self.user.id, self.materias_primas.id)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "materias_primas_id": self.materias_primas_id,
            "cantidad_stock": self.cantidad_stock,
            "minimo_stock": self.minimo_porcentaje
        }

class Receta(db.Model):
    __tablename__ = 'receta'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False )
    rinde = db.Column(db.Integer, nullable=False)
    unidad_medida = db.Column(db.String(80), nullable=False )
    photo_url = db.Column(db.String(500))

    def __repr__(self): #terminal con el print y en el admin
        return 'La receta de {}, rinde para {} {}'.format (self.nombre, self.rinde, self.unidad_medida)
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "rinde": self.rinde,
            "photo_url": self.photo_url
        }
    
class UserReceta(db.Model):
    __tablename__ = 'user_receta'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    user_relationship = db.relationship(User) 
    receta_id = db.Column(db.Integer, db.ForeignKey('receta.id')) #tablename - el campo 
    receta_relationship = db.relationship(Receta) #clase - de la tabla

    def __repr__(self): #terminal con el print y en el admin
        return 'Receta {} del usuario: {}'.format (self.user.id, self.receta.id)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "receta_id": self.receta_id
        }


# crear campo cantidad de ingredientes - listo
class IngredientesReceta(db.Model):
    __tablename__ = 'ingredientes_receta'
    id = db.Column(db.Integer, primary_key=True)
    materias_primas_id = db.Column(db.Integer, db.ForeignKey('materias_primas.id')) 
    materias_primas_id_relationship = db.relationship(MateriasPrimas) 
    receta_id = db.Column(db.Integer, db.ForeignKey('receta.id')) #tablename - el campo 
    receta_relationship = db.relationship(Receta) #clase - de la tabla
    cantidad_necesaria = db.Column(db.Integer, nullable=False)
   

    def __repr__(self): #terminal con el print y en el admin
        return 'Ingrediente {} de la receta {}'.format (self.receta.id, self.materias_primas_id)
    
    def serialize(self):
        return {
            "id": self.id,
            "materias_primas_id": self.materias_primas_id,
            "receta_id": self.receta_id,
            "user_materias_primas_id": self.user_materias_primas_id,
            "cantidad_necesaria": self.cantidad_necesaria,
        }


# Revisar, nose si tiene que ser de id receta o nombre de la receta
class UserProductoFinal(db.Model):
    __tablename__ = 'user_producto_final'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    user_relationship = db.relationship(User) 
    receta_id = db.Column(db.Integer, db.ForeignKey('receta.id')) #tablename - el campo 
    receta_relationship = db.relationship(Receta) #clase - de la tabla
    cantidad_inventario = db.Column(db.Integer, nullable=False)
    clasificacion = db.Column(db.String(80), nullable=False)   
    cantidad_inventario_minimo = db.Column(db.Integer, nullable=False)

    def __repr__(self): #terminal con el print y en el admin
        return 'Usuario {} tiene un producto final {} de la receta {}'.format (self.user.id, self.cantidad_inventario, self.receta.id )
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "receta_id": self.receta_id,
            "cantidad_inventario" : self.cantidad_inventario,
            "clasificacion": self.clasificacion_id,
            "cantidad_inventario_minimo": self.cantidad_inventario_minimo
        }

