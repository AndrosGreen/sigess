from flask import jsonify, request
from flask_login import login_required, current_user

from Controladores import ControladorUsuarios
from Modelos.Usuario import Usuario
from sigess import login_manager, app


@login_manager.user_loader
def cargaUsuario(userID):
    """Obtiene el usuario al usar current_user
    Args:
        userID: El id del usuario a cargar
    """
    usuario = ControladorUsuarios.obtenerUsuarioPorID(userID)
    return usuario


@login_manager.unauthorized_handler
def desautoriza():
    """Método cuando ingresa alguien no logeado a un método con @login_required"""
    return jsonify({
        'mensaje': "No está logeado"
    })


@app.route('/usuarios/verifica')
@login_required
def verifica():
    """Devuelve los datos mínimos del usuario logeado"""
    usuarioActual = current_user
    return jsonify({
        'Usuario': usuarioActual.serialize
    })


@app.route('/usuarios/login', methods=['POST'])
def login():
    """Logea al usuario"""
    json = request.json
    if json['esAdmin']:
        # Comienza como revisor, si es admin el controlador actualiza el nivel
        nivelDePermiso = 2
    else:
        nivelDePermiso = 1
    usuario = Usuario(json['usuario'], json['clave'], nivelDePermiso)
    if not ControladorUsuarios.login(usuario):
        return jsonify("El usuario no existe o error en las credenciales")
    else:
        usuarioActual = current_user
        return jsonify({
            'Mensaje': 'Logeado exitosamente',
            'Usuario': usuarioActual.serialize
        })


@app.route('/usuarios/logout')
@login_required
def logout():
    """Deslogea al usuario"""
    ControladorUsuarios.logout()
    return jsonify({
        'mensaje': 'Deslogueado exitosamente'
    })
