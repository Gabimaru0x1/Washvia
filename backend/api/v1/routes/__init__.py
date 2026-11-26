#!/usr/bin/python3
"""Create the authentication blueprint and load its routes."""
from flask import Blueprint

auth_bp = Blueprint('auth', __name__,  url_prefix="/api/v1/auth")
dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/v1/users')
orders_bp = Blueprint('orders', __name__, url_prefix='/api/v1/user')

# Import routes to register them with the blueprint
from .auth import *  # noqa: E402
from .users import *  # noqa: E402
from .orders import *  # noqa: E402
