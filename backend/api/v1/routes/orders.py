#!/usr/bin/python
"""This module defines the requested service routes for the Washvia API."""
from flask import request, jsonify
from flask_login import login_required, current_user
from . import orders_bp
from models.order import Order
from models import storage
from datetime import date, datetime, timezone


ADMIN_ACCESS_ERROR = "Admin access required."
ORDER_NOT_FOUND_ERROR = "Order not found."
AWAITING_PICKUP_STATUS = "Awaiting pickup"


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
        return jsonify({'error': 'Enter a pick up address'}), 400

    order = Order(
        user_id=user_id,
        service=service,
        pickup_address=address,
        status=AWAITING_PICKUP_STATUS
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
    """Return all orders as a JSON array for administrators.

    Return 403 if the authenticated user is not an administrator.
    """
    if current_user.role != "admin":
        return jsonify(error="Admin access required."), 403

    orders = storage.get_all_orders()
    return jsonify([order_response(order) for order in orders])


@orders_bp.route(
    '/orders/admin/<order_id>/picked_up',
    methods=['PATCH'],
    strict_slashes=False,
)
@login_required
def mark_order_picked_up(order_id):
    """Record the pickup date and mark an order as picked up.

    Require the order to be awaiting pickup and the JSON body to contain
    a valid ``picked_up_on`` date in YYYY-MM-DD format.

    Return the updated order as JSON on success. Return 400 for a missing
    or invalid pickup date in a parsed JSON body, 403 for a non-admin user,
    404 if the order does not exist, or 409 if it is not awaiting pickup.
    """
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

    if order.status != AWAITING_PICKUP_STATUS:
        return jsonify(
            error="Only orders awaiting pickup can be marked picked up."
        ), 409

    order.picked_up_on = picked_up_on
    order.status = "picked_up"
    order.save()

    return jsonify(order_response(order)), 200


@orders_bp.route(
    '/orders/admin/<order_id>/schedule',
    methods=['PATCH'],
    strict_slashes=False,
)
@login_required
def schedule_service(order_id):
    """Mark a picked-up order as scheduled and return it as JSON.

    Return 403 for a non-admin user, 404 if the order does not exist,
    or 409 if the order has not been marked picked up.
    """
    if current_user.role != "admin":
        return jsonify(error=ADMIN_ACCESS_ERROR), 403

    order = storage.get(Order, order_id)
    if order is None:
        return jsonify(error=ORDER_NOT_FOUND_ERROR), 404

    if order.status != "picked_up":
        return jsonify(
            error="Only picked-up orders can be scheduled."
        ), 409

    order.status = "scheduled"
    order.save()

    return jsonify(order_response(order)), 200


@orders_bp.route(
    '/orders/admin/<order_id>/start', methods=['PATCH'], strict_slashes=False
)
@login_required
def start_service(order_id):
    """Mark a scheduled order as in progress and return it as JSON.

    Return 403 for a non-admin user, 404 if the order does not exist,
    or 409 if the order is not scheduled.
    """
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
    """Mark an in-progress order as ready and return it as JSON.

    Return 403 for a non-admin user, 404 if the order does not exist,
    or 409 if the order is not in progress.
    """
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
    """Mark a ready order as delivered and return it as JSON.

    Record ``delivered_on`` as a UTC datetime without timezone information.
    Return 403 for a non-admin user, 404 if the order does not exist,
    or 409 if the order is not ready.
    """
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
    order.delivered_on = datetime.now(timezone.utc).replace(tzinfo=None)
    order.save()

    return jsonify(order_response(order)), 200


@orders_bp.route(
    '/orders/admin/<order_id>/cancel',
    methods=["PATCH"],
    strict_slashes=False,
)
@login_required
def cancel_order(order_id):
    """Cancel an order awaiting pickup and return it as JSON.

    Return 403 for a non-admin user, 404 if the order does not exist,
    or 409 if the order is not awaiting pickup.
    """
    if current_user.role != "admin":
        return jsonify(error=ADMIN_ACCESS_ERROR), 403

    order = storage.get(Order, order_id)
    if order is None:
        return jsonify(error=ORDER_NOT_FOUND_ERROR), 404

    if order.status != AWAITING_PICKUP_STATUS:
        return jsonify(
            error="Only orders awaiting pickup can be cancelled."
        ), 409

    order.status = "Cancelled"
    order.save()

    return jsonify(order_response(order)), 200
