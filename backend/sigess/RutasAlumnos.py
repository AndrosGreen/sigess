from flask import jsonify
from flask_login import login_required, current_user

from sigess import app


@app.route('/alumnos/creaAlumno')
@login_required
def creaAlumno():
    # TODO Dani
    if not current_user.isAdmin:
        # Código si no es admin
        return jsonify("No es admin")
    else:
        # Código si sí es admin
        return jsonify("Pásele")
