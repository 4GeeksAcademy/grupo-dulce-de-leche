"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.security import generate_password_hash, check_password_hash
from sqlalchemy import func

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Reset user's password
@api.route('/reset_password/<token>', methods=['POST'])
def reset_password(token):
    body = request.get_json(silent=True)
    user = User.query.filter_by(reset_token=token).first()

    if user is None:
        raise APIException('Invalid Token', status_code=400)

    if body is None:
        raise APIException('You must send information inside the body', status_code=400)

    new_password = body['new_password']
    confirm_password = body['confirm_password']

    if new_password is None:
        raise APIException('You must provide a password', status_code=400)

    # Verifies password doesn't have typos
    if new_password != confirm_password:
        raise APIException('Passwords do not match', status_code=400)

    # Updates the user's password
    user.password = generate_password_hash(new_password).decode("utf-8")
    # Removes the reset_token from the database
    user.reset_token = None
    db.session.commit()

    return jsonify({"message": "Password reset successfully"}), 200


# Updates user's password
@api.route('/updatepassword', methods=['PUT'])
@jwt_required()
def update_password():
    user_email = get_jwt_identity()
    body = request.get_json(silent=True)
    if body is None:
        raise APIException(
            "You must send information in the body", status_code=400)

    if "current_password" not in body or not body["current_password"]:
        raise APIException("Current password is required", status_code=422)

    if "new_password" not in body or not body["new_password"]:
        raise APIException("New password is required", status_code=422)

    user = User.query.filter_by(email=user_email).first()
    if user is None:
        raise APIException("User not found", status_code=404)

    # Check if the current password matches
    if not check_password_hash(user.password, body["current_password"]):
        raise APIException("Current password is incorrect", status_code=400)

    # Update the user's password with the new one
    user.password = generate_password_hash(
        body["new_password"]).decode("utf-8")
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200