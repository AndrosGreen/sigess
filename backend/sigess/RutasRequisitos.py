from flask_login import login_required
from flask import jsonify, request
from Controladores import ControladorRequisitos
from Modelos.RequisitoAlumno import RequisitoAlumno
from Modelos.Requisito import Requisito

from sigess import app


@app.route('/requisitos/crea', methods=['POST'])
@login_required
def creaRequisito():
    json = request.json
   
    try:
        
        requisito = Requisito(
            json.get('nombre', "NombrePorDefecto"),
            json.get('revisadoPor', "1"),
            json.get('detalleARevisar', "Sin detalles"),          
        )

        ControladorRequisitos.crearRequisito(requisito)

        # Si sailó bien, prepara la respuesta buena
        resp = jsonify(requisito)
    # Si algo salió mal, en la respuesta se pone el error
    except Exception as error:
        resp = jsonify("Error: " + str(error))
    # Define el código de respuesta como OK
    resp.status_code = 200
    return resp


@app.route('/requisitos/elimina', methods=['POST'])
@login_required
def eliminaRequisito():
    _json = request.json
    try:
        _id = _json['idRequisito']
        ControladorRequisitos.eliminarRequisito(_id)
        resp = jsonify('Requisito deleted successfully!')
    except Exception as e:
        resp = jsonify("Error: " + str(e))
    resp.status_code = 200
    return resp


@app.route('/requisitos/obtenerUno', methods=['POST'])
@login_required
def obtenerRequisito():
    _json = request.json
    try:
        _id = _json['idREQUISITO']
        ControladorRequisitos.obtenerRequisito(_id)
        resp = ControladorRequisitos.obtenerRequisito(_id)
    except Exception as e:
        resp = jsonify("Error: " + str(e))
    resp.status_code = 200
    return resp

@app.route('/requisitos/estatusAlumno', methods=['GET'])
@login_required
#@admin_required
def obtenerRequistosAlumno():
    """"Obtiene la lista de requisitos del alumno"""
    _json = request.json
    _alumno = _json['noControl']
    requirements = ControladorRequisitos.listaRequisitosAlumno(_alumno)
    return jsonify(requirements)

@app.route('/requisitos/validarRequisitos', methods=['POST'])
@login_required
#@admin_required
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