from flask_login import login_required
from flask import jsonify, request
from Controladores import ControladorRequisitos
from Modelos.RequisitoAlumno import RequisitoAlumno
from Modelos.Requisito import Requisito

from sigess import app
from sigess.utils import admin_required


@app.route('/requisitos/crea', methods=['POST'])
@login_required
def creaRequisito():
    # TODO: Mensaje cuando el nombre ya exista
    json = request.json

    requisito = Requisito(
        0,
        json.get('nombre', "NombrePorDefecto"),
        json.get('revisadoPor', "1"),
        json.get('detalleARevisar', "Sin detalles"),
    )

    ControladorRequisitos.crearRequisito(requisito)

    resp = {
        'mensaje': 'Requisito agregado exitosamente',
        'Requisito': requisito.serialize
    }
    return resp


@app.route('/requisitos/elimina', methods=['POST'])
@login_required
def eliminaRequisito():
    # TODO: Mensaje cuando el id no exista
    _json = request.json
    _id = _json['idRequisito']
    ControladorRequisitos.eliminarRequisito(_id)
    resp = {
        'mensaje': 'Requisito eliminado correctamente'
    }
    return resp


@app.route('/requisitos/obtenerUno', methods=['POST'])
@login_required
def obtenerRequisito():
    # Todo: Manejar cuando requsito es none
    _json = request.json
    _id = _json['idRequisito']
    ControladorRequisitos.obtenerRequisito(_id)
    requisito = ControladorRequisitos.obtenerRequisito(_id)
    resp = {
        'requisito': requisito.serialize
    }
    return resp


@app.route('/requisitos/estatusAlumno', methods=['GET'])
@login_required
# @alumno_required
def obtenerRequistosAlumno():
    """"Obtiene la lista de requisitos del alumno"""
    _json = request.json
    _alumno = _json['noControl']
    requirements = ControladorRequisitos.listaRequisitosAlumno(_alumno)
    return jsonify(requirements)


@app.route('/requisitos/validarRequisitos', methods=['POST'])
@login_required
@admin_required
def validarRequisitos():
    """"Valida los requisitos dados a los alumnos"""
    json = request.json
    for js in json:
        req_alumno = RequisitoAlumno(
            js['Requisito'],
            js['Alumno'],
            js['cumple']
        )
        requirements = ControladorRequisitos.validarRequisitosAlumno(req_alumno)
    return jsonify({
        "mensaje": "Se valido los requisitos para los alumnos"
    })


@app.route('/requisitos/actualizaRequisito', methods=['POST'])
@login_required
@admin_required
def actualizarRequisito():
    """"Valida los requisitos dados a los alumnos"""
    json = request.json
    requisito = Requisito.desdeFila(json)
    if not ControladorRequisitos.existeRequisito(requisito):
        return jsonify({
            "mensaje": "El requisito no existe"
        })
    ControladorRequisitos.actualizarRequisito(requisito)
    return jsonify({
        "mensaje": "Se actualizó el requisito exitosamente"
    })

@app.route('/requisitos/obtenerTodos', methods=['GET'])
@login_required
def obtenerRequisitosTodos():
    """"Obtiene la lista de todos los requistos ingresados"""
    requirements = ControladorRequisitos.listaRequisitos()
    return jsonify(requirements)
