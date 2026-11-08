#!/usr/bin/python3
"""This module defines the authentication routes for the Washvia API."""
from flask import request, jsonify, session, url_for, redirect
from flask_login import login_user, logout_user, login_required, current_user
from flask_wtf.csrf import generate_csrf
from . import auth_bp
from models.user import User
from models import storage
from api.v1.services.security import hash_password, check_password

@auth_bp.route('/csrf/', methods=['GET'], strict_slashes=False)
def get_csrf_token():
    """Generate and return a CSRF token for the client."""
    response = jsonify({'csrf_token': generate_csrf()})
    response.headers['Cache-Control'] = 'no-store'
    return response, 200

@auth_bp.route('/signup/', methods=['POST'], strict_slashes=False)
def signup():
    """Handle signup requests and create a Washvia user account."""
    if current_user.is_authenticated:
        return redirect(url_for('dashboard_bp.dashboard'))  # Redirect to a dashboard or home page if already logged in
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    address = data.get('address')
    phone_number = data.get('phone_number')

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    
    existing_user = storage.get_by_email(User, email)
    if existing_user:
        return jsonify(message='User already exists'), 409
    
    hashed = hash_password(password)

    user = User(email=email, password=hashed, first_name=first_name, last_name=last_name, address=address, phone_number=phone_number)
    user.save()
    
    del data["password"]

    return jsonify({'message': 'User created successfully', 'user': data}), 201

@auth_bp.route('/login/', methods=['POST'], strict_slashes=False)
def login():
    """Handle login requests and authenticate a Washvia user."""
    if current_user.is_authenticated:
        return jsonify(error="You are already logged in"), 409    
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    user = storage.get_by_email(User, email=email)
    if not user or not check_password(password, user.password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    session.clear()  # Clear the session to prevent session fixation attacks
    login_user(user)

    return jsonify({'message': 'Login successful', 'user': user.email, 'csrf_token': generate_csrf()}), 200

@auth_bp.route('/logout/', methods=['POST'], strict_slashes=False)
@login_required
def logout():
    """Handle logout requests and log out the current user."""
    logout_user()
    session.clear()  # Clear the session to ensure the user is logged out
    return jsonify({'message': 'Logout successful'}), 200
