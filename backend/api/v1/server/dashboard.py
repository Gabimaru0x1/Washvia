from flask_login import current_user, login_required
from . import dashboard_bp

@dashboard_bp.route("/dashboard")
@login_required
def dashboard():
	return f"Welcome, {current_user.email}!"
