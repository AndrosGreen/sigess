from flask import request, jsonify
from flask_login import login_required

from Controladores import ControladorAlumnos
from Modelos.Alumno import Alumno
from Modelos.AlumnoPreRegistro import AlumnoPreRegistro
from sigess import app
from sigess.utils import admin_required, alumno_required


@app.route('/alumnos/preRegistraAlumno', methods=['POST'])
@login_required
@admin_required
def preRegistraAlumno():
    """Preregistra un alumno"""
    json = request.json
    alumno = AlumnoPreRegistro(
        json['noControl'],
        json['clave']
    )
    if ControladorAlumnos.existeAlumnoAPreRegistrar(alumno):
        return {
            'mensaje': 'El alumno ya se registró previamente'
        }
    ControladorAlumnos.preRegistraAlumno(alumno)
    return {
        'mensaje': 'El alumno se preregistró exitosamente',
        'AlumnoPreRegistro': alumno.serialize
    }


@app.route('/alumnos/obtenerAlumnosPreRegistrados', methods=['GET'])
@login_required
@admin_required
def obtenerAlumnosPreRegistrados():
    """Obtiene alumnos preregistrados"""
    alumnos = ControladorAlumnos.obtenerAlumnosPreRegistrados()
    return jsonify(alumnos)


@app.route('/alumnos/eliminaPreRegistrado', methods=['POST'])
@login_required
@admin_required
def eliminaPreRegistrado():
    """Elimina un alumno preregistrados"""
    json = request.json
    noControl = json['noControl']
    if not ControladorAlumnos.estaAlumnoPreRegistrado(noControl):
        return{
            "mensaje": "El alumno no está preregistrado"
        }
    ControladorAlumnos.eliminaPreRegistrado(noControl)
    return{
        "mensaje": "Alumno eliminado del preregistro exitosamente"
    }


@app.route("/alumnos/registraAlumno", methods=["POST"])
@login_required
@alumno_required
def registraAlumno():
    """Registra un alumno si existe en pre registro"""
    json = request.json
    alumno = Alumno.desdeFila(json)
    respuesta = jsonify("")
    if ControladorAlumnos.existeAlumnoAPreRegistrar(alumno):
        alumno = ControladorAlumnos.registraAlumno(alumno)
        respuesta = jsonify({
            "mensaje": "Alumno registrado exitosamente",
            "Alumno": alumno.serialize
        })
    elif ControladorAlumnos.existeAlumnoRegistrado(alumno):
        respuesta = jsonify({
            "mensaje": "El alumno ya se registró previamente"
        })
    else:
        respuesta = jsonify({
            "mensaje": "El alumno no se encuentra en el preregistro"
        })
    return respuesta
