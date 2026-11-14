from flask import jsonify
from flask_login import current_user, login_required
from . import dashboard_bp

@dashboard_bp.route("/dashboard")
@login_required
def dashboard():
    return jsonify({"first_name": current_user.first_name})
