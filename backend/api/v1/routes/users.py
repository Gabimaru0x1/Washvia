from flask import jsonify
from flask_login import current_user, login_required
from . import dashboard_bp


@dashboard_bp.route('/me', methods=['GET'], strict_slashes=False)
@login_required
def get_current_user():
    return jsonify({"first_name": current_user.first_name})
