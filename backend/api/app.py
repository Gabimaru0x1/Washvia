from flask import flask
from api.v1.server import auth_bp


app = Flask(__name__)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)