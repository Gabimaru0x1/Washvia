#!/usr/bin/python3
"""This module defines the Flask application for the Washvia API."""

import os
from flask import Flask, jsonify
from api.v1.server import auth_bp
from api.v1.server import dashboard_bp
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect, CSRFError

from models import storage
from models.user import User

app = Flask(__name__)
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)

app.config.update(
    SECRET_KEY=os.environ["WASHVIA_SECRET_KEY"],
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=True,
)

CSRFProtect(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    """Look up the user by the ID stored in the session."""
    return storage.get(User, user_id)

@login_manager.unauthorized_handler
def unauthorized():
    """Return a JSON error with HTTP 401 when a route requires login."""
    return jsonify({'error': 'Unauthorized access'}), 401

@app.errorhandler(CSRFError)
def handle_csrf_error(error):
    return jsonify(error=error.description), 400

@app.teardown_appcontext
def teardown_db(exception):
    """Close the database session when the Flask application context ends."""
    storage.close()


if __name__ == '__main__':
	app.run(debug=False, host='127.0.0.1', port=5000)