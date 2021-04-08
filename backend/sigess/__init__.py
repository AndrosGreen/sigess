from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)


from sigess import RutasUsuario
from sigess import RutasAdmins
from sigess import RutasAlumnos
from sigess import RutasRequisitos

if __name__ == "__main__":
    app.run()
