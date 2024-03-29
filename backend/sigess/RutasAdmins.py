from flask import jsonify, request
from flask_login import login_required, current_user

from Controladores import ControladorAdmin
from Modelos.Admin import Admin
from sigess import app
from sigess.utils import admin_required


@app.route('/admins/creaAdmin', methods=['POST'])
@login_required
@admin_required
def creaAdmin():
    """Crea un admin si no existe"""
    json = request.json
    admin = Admin(
        None,  # El id se le asigna luego si se crea correctamente
        json['nombre'],
        json['area'],
        json['correo'],
        json['clave'],
        json['esRevisor']
    )
    if ControladorAdmin.existeAdmin(admin):
        return jsonify({
            'mensaje': 'El admin ya existe'
        })
    admin = ControladorAdmin.creaAdmin(admin)
    return jsonify({
        'mensaje': 'Administrador creado correctamente',
        'Admin': admin.serialize
    })


@app.route('/admins/eliminaAdmin', methods=['POST'])
@login_required
@admin_required
def eliminaAdmin():
    """"Dado un id de admin, lo elimina si existe"""
    json = request.json
    idAdmin = json['idAdmin']
    if ControladorAdmin.obtenAdminPorID(idAdmin) is None:
        mensaje = 'No existe admin con ese ID'
    else:
        ControladorAdmin.eliminaAdmin(idAdmin)
        mensaje = 'Admin eliminado correctamente'
    return jsonify({
        'mensaje': mensaje
    })


@app.route('/admins/obtenerAdmins', methods=['GET'])
@login_required
@admin_required
def obtenerAdmins():
    """"Obtiene la lista de admins, excepto uno mismo"""
    usuarioActual = current_user
    admins = ControladorAdmin.obtenAdmins(usuarioActual.usuario)
    return jsonify(admins)


@app.route('/admins/obtenerAdminPorID', methods=['POST'])
@login_required
@admin_required
def obtenerAdmin():
    """Obtiene un admin dado un id"""
    json = request.json
    idAdmin = json['idAdmin']
    admin = ControladorAdmin.obtenAdminPorID(idAdmin)
    if admin is None:
        return {
            'mensaje': 'No existe admin con ese ID'
        }
    return {
        'Admin': admin.serialize
    }


@app.route('/admins/actualizarAdmin', methods=['POST'])
@login_required
@admin_required
def modificarAdmin():
    """Modifica un admin si es que existe"""
    json = request.json
    admin = Admin.desdeFila(json)  # Cuenta como fila
    if ControladorAdmin.obtenAdminPorID(admin.idAdmin) is None:
        return {
            'mensaje': 'El admin a modificar no existe'
        }
    ControladorAdmin.modificaAdmin(admin)
    return {
        'mensaje': 'Admin modificado correctamente',
        'Admin': admin.serialize
    }


@app.route('/admins/obtenerAdminsSinRequisito', methods=['get'])
@login_required
@admin_required
def adminsSinRequisito():
    """Modifica un admin si es que existe"""
    adminsSinSerializar = ControladorAdmin.obtenerAdminsSinRequisito()
    adminsSerializados = []
    for admin in adminsSinSerializar:
        adminsSerializados.append(admin.serialize)
    return {
        'admins': adminsSerializados
    }
