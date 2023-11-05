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

    def __repr__(self):
         return '{}'.format (self.name)

    def serialize(self):
        return {
            "id": self.id,
            "name" : self.name,
            "last_name" : self.last.name,
            "email": self.email,
            "address": self.address
        }
    
class MateriasPrimas(db.Model):
    __tablename__ = 'materias_primas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    clasificacion = db.Column(db.String(80), nullable=False)

    def __repr__(self): #terminal con el print y en el admin
        return 'Materia prima: {} - Clasificacion {}'.format (self.nombre, self.clasificacion)
    
    def serialize(self):
        return {
            "nombre": self.nombre,
            "clasificacion": self.clasificacion,
        }
    
 
class UserMateriasPrimas(db.Model):
    __tablename__ = 'user_materias_primas'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) #tablename - el campo que va a relacionar user.id
    user_relationship = db.relationship(User) #clase - con la tabla:  User
    materias_primas_id = db.Column(db.Integer, db.ForeignKey('materias_primas.id'))
    materias_primas_relationship = db.relationship(MateriasPrimas)
    cantidad = db.Column(db.Integer, nullable=False)

    def __repr__(self): #terminal con el print y en el admin
        return 'Usuario {} con materia prima {}'.format (self.user.id, self.materias_primas.id)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "materias_primas_id": self.materias_primas_id,
            "cantidad": self.cantidad
        }

class Receta(db.Model):
    __tablename__ = 'receta'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False )
    rinde = db.Column(db.Integer, nullable=False)
    unidad_medida = db.Column(db.String(80), nullable=False )

    def __repr__(self): #terminal con el print y en el admin
        return 'Esta receta {} rinde para {} {}'.format (self.nombre, self.rinde, self.unidad_medida)
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "rinde": self.rinde
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    user_relationship = db.relationship(User) 
    materias_primas_id = db.Column(db.Integer, db.ForeignKey('materias_primas.id')) 
    materias_primas_id_relationship = db.relationship(MateriasPrimas) 
    receta_id = db.Column(db.Integer, db.ForeignKey('receta.id')) #tablename - el campo 
    receta_relationship = db.relationship(Receta) #clase - de la tabla
    cantidad = db.Column(db.Integer, nullable=False)
   

    def __repr__(self): #terminal con el print y en el admin
        return 'Ingrediente {} de la receta {}'.format (self.receta.id, self.materias_primas_id)
    
    def serialize(self):
        return {
            "id": self.id,
            "materias_primas_id": self.materias_primas_id,
            "receta_id": self.receta_id,
            "user_materias_primas_id": self.user_materias_primas_id
        }


# Revisar, nose si tiene que ser de id receta o nombre de la receta
class UserProductoFinal(db.Model):
    __tablename__ = 'user_producto_final'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    user_relationship = db.relationship(User) 
    receta_id = db.Column(db.Integer, db.ForeignKey('receta.id')) #tablename - el campo 
    receta_relationship = db.relationship(Receta) #clase - de la tabla
    cantidad = db.Column(db.Integer, nullable=False)
    clasificacion = db.Column(db.String(80), nullable=False)   

    def __repr__(self): #terminal con el print y en el admin
        return 'Usuario {} tiene un producto final {} de la receta {}'.format (self.user.id, self.cantidad, self.receta.id )
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "receta_id": self.receta_id,
            "cantidad" : self.cantidad,
            "clasificacion": self.clasificacion_id

        }

