from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

# generates hash with bcrypt
def generate_password_hash(password):
    return bcrypt.generate_password_hash(password)

# compares password typed by user with hashed password in database
def check_password_hash(hash, password):
    return bcrypt.check_password_hash(hash, password)