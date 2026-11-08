#!/usr/bin/python3
"""This module defines the authentication routes for the Washvia API."""
from flask import Blueprint, request, jsonify
from api.v1.server import auth_bp
from models.user import User
from models import storage
from api.v1.services.security import hash_password, check_password

@auth_bp.route('/signup/', methods=['POST'], strict_slashes=False)
def signup():
    """Handle signup requests and create a Washvia user account."""
    
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
        return jsonify({'error': 'Missing required fields'}), 
    
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

    return jsonify({'message': 'Login successful', 'user': user.email}), 200