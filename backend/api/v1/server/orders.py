#!/usr/bin/python
"""This module defines the requested service routes for the Washvia API."""
from flask import request, jsonify
from flask_login import login_required, current_user
from . import orders_bp
from models.service_req import ServiceReq
from models import storage


def order_response(order):
    """Return the order fields shown on the customer dashboard."""
    return {
        "id": order.id,
        "service": order.service,
        "pickup_address": order.pickup_address,
        "status": order.status,
        "picked_up_on": (
            order.picked_up_on.isoformat() if order.picked_up_on else None
        ),
        "delivered_on": (
            order.delivered_on.isoformat() if order.delivered_on else None
        ),
    }


@orders_bp.route('/orders/', methods=['POST'], strict_slashes=False)
@login_required
def create_order():
    """Request a service for the signed-in customer."""
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No service requested'}), 400

    user_id = current_user.id
    service = data.get("service")
    address = data.get("pickup_address")

    if not address:
        return jsonify({'error': 'Enter a pick up address'})

    order = ServiceReq(
        user_id=user_id,
        service=service,
        pickup_address=address
    )
    order.save()

    return jsonify(order_response(order)), 201


@orders_bp.route('/orders/', methods=['GET'], strict_slashes=False)
@login_required
def list_orders():
    """Get list of user's requested services"""
    orders = storage.get_orders_for_user(current_user.id)

    return jsonify([order_response(order) for order in orders])
