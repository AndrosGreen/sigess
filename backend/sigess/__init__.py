from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
CORS(
    app,
    origins='*',
    allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    resources={r"*": {"origins": "*"}},
    supports_credentials=True,
    withCredentials=True
)
app.config['CORS_HEADERS'] = 'Content-Type'

login_manager = LoginManager()
login_manager.init_app(app)


from sigess import RutasUsuarios
from sigess import RutasAsignaciones
from sigess import RutasAlumnos
from sigess import RutasRequisitos
from sigess import RutasAdmins
from sigess import RutasPDFEjemplo
from sigess import RutasAsignaciones
from sigess import RutasDocumentos

if __name__ == "__main__":
    app.run()
