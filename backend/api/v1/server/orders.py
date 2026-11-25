#!/usr/bin/python
"""This module defines the requested service routes for the Washvia API."""
from flask import request, jsonify, url_for, redirect
from flask_login import login_required, current_user
from . import orders_bp
from models.service_req import ServiceReq


@orders_bp.route('/orders/', methods=['POST'], strict_slashes=False)
def create_order():
    """Handle service requests by a user"""
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No service requested'}), 400

    user_id = current_user.id
    service = data.get("service")
    address = data.get("pickup_address")

    if not address:
        return jsonify({'error': 'Enter a pick up address'})

    order = ServiceReq(user_id=user_id, service=service, pickup_address=address)
    order.save()

    return jsonify({
        'message': 'Request created successfully',
        'Req_id': order.id,
        'status': order.status,
        'pickup_address': order.pickup_address
    }), 201
