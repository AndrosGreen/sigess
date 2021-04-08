from flask import jsonify, request
from flask_login import login_required, current_user

from Controladores import ControladorUsuarios
from Modelos.Usuario import Usuario
from sigess import login_manager, app


@login_manager.user_loader
def cargaUsuario(userID):
    usuario = ControladorUsuarios.getUserByID(userID)
    return usuario


@login_manager.unauthorized_handler
def unautoriza():
    return jsonify("No está logeado")


@app.route('/usuarios/verifica')
@login_required
def verifica():
    # Tal vez aquí regresar el alumno o admin completo
    actualUser = current_user
    return jsonify(actualUser.serialize)


@app.route('/usuarios/login', methods=['POST'])
def login():
    json = request.json
    user = Usuario(json['id'], json['passw'], json['isAdmin'])
    if not ControladorUsuarios.login(user):
        return jsonify("El usuario no existe")
    else:
        actualUser = current_user
        return jsonify(actualUser.serialize)


@app.route('/usuarios/logout')
@login_required
def logout():
    # if current_user.is_authenticated:
    message = f'{current_user.user} deslogueado exitosamente'
    ControladorUsuarios.logout()
    return jsonify(message)
