#!/usr/bin/python
"""This module defines the requested service routes for the Washvia API."""
from flask import request, jsonify
from flask_login import login_required, current_user
from . import orders_bp
from backend.models.order import Order
from models import storage
from datetime import date, datetime, timezone


ADMIN_ACCESS_ERROR = "Admin access required."
ORDER_NOT_FOUND_ERROR = "Order not found."


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


@orders_bp.route('/orders', methods=['POST'], strict_slashes=False)
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

    order = Order(
        user_id=user_id,
        service=service,
        pickup_address=address
    )
    order.save()

    return jsonify(order_response(order)), 201


@orders_bp.route('/orders', methods=['GET'], strict_slashes=False)
@login_required
def list_orders():
    """Get list of user's requested services"""
    orders = storage.get_orders_for_user(current_user.id)

    return jsonify([order_response(order) for order in orders])


@orders_bp.route('/admin/orders', methods=['GET'], strict_slashes=False)
@login_required
def list_admin_orders():
    if current_user.role != "admin":
        return jsonify(error="Admin access required."), 403

    orders = storage.get_all_orders()
    return jsonify([order_response(order) for order in orders])


@orders_bp.route(
    '/orders/admin/<order_id>/pickup', methods=['PATCH'], strict_slashes=False
)
@login_required
def mark_order_picked_up(order_id):
    if current_user.role != "admin":
        return jsonify(error=ADMIN_ACCESS_ERROR), 403

    data = request.get_json()
    pickup_date = data.get("picked_up_on") if isinstance(data, dict) else None

    if not isinstance(pickup_date, str):
        return jsonify(error="Enter a pickup date in YYYY-MM-DD format."), 400

    try:
        picked_up_on = date.fromisoformat(pickup_date)
    except ValueError:
        return jsonify(error="Enter a valid date in YYYY-MM-DD format."), 400

    if picked_up_on.isoformat() != pickup_date:
        return jsonify(error="Use YYYY-MM-DD format."), 400

    order = storage.get(Order, order_id)
    if order is None:
        return jsonify(error=ORDER_NOT_FOUND_ERROR), 404

    if order.status != "scheduled":
        return jsonify(
            error="Only scheduled orders can be marked picked up."
        ), 409

    order.picked_up_on = picked_up_on
    order.status = "picked_up"
    order.save()

    return jsonify(order_response(order)), 200


@orders_bp.route(
    '/orders/admin/<order_id>/pickup', methods=['PATCH'], strict_slashes=False
)
@login_required
def start_service(order_id):
    if current_user.role != "admin":
        return jsonify(error=ADMIN_ACCESS_ERROR), 403

    order = storage.get(Order, order_id)
    if order is None:
        return jsonify(error=ORDER_NOT_FOUND_ERROR), 404

    if order.status != "scheduled":
        return jsonify(
            error="Only scheduled orders can be marked in progress"
        ), 409

    order.status = "In progress"
    order.save()

    return jsonify(order_response(order)), 200


@orders_bp.route(
    '/orders/admin/<order_id>/ready', methods=['PATCH'], strict_slashes=False
)
@login_required
def service_ready(order_id):
    if current_user.role != "admin":
        return jsonify(error=ADMIN_ACCESS_ERROR), 403

    order = storage.get(Order, order_id)
    if order is None:
        return jsonify(error=ORDER_NOT_FOUND_ERROR), 404

    if order.status != "In progress":
        return jsonify(
            error="Only started orders can be marked ready"
        ), 409

    order.status = "Ready"
    order.save()

    return jsonify(order_response(order)), 200


@orders_bp.route(
    '/orders/admin/<order_id>/delivered',
    methods=['PATCH'],
    strict_slashes=False,
)
@login_required
def service_delivered(order_id):
    if current_user.role != "admin":
        return jsonify(error=ADMIN_ACCESS_ERROR), 403

    order = storage.get(Order, order_id)
    if order is None:
        return jsonify(error=ORDER_NOT_FOUND_ERROR), 404

    if order.status != "Ready":
        return jsonify(
            error="Only ready orders can be marked delivered"
        ), 409

    order.status = "Delivered"
    order.save()

    return jsonify(order_response(order)), 200


@orders_bp.route(
    '/orders/admin/<order_id>/cancel',
    methods=["PATCH"],
    strict_slashes=False,
)
@login_required
def cancel_order(order_id):
    if current_user.role != "admin":
        return jsonify(error=ADMIN_ACCESS_ERROR), 403

    order = storage.get(Order, order_id)
    if order is None:
        return jsonify(error=ORDER_NOT_FOUND_ERROR), 404

    if order.status != "scheduled":
        return jsonify(error="Only scheduled orders can be cancelled."), 409

    order.status = "Cancelled"
    order.save()

    return jsonify(order_response(order)), 200
