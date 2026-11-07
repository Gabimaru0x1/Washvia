#!/usr/bin/python3
"""Create the authentication blueprint and load its routes."""
from flask import Blueprint

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1')

from .auth import *  # Import routes to register them with the blueprint