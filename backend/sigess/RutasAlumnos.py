from flask import request, jsonify
from flask_login import login_required

from Controladores import ControladorAlumnos
from Modelos.AlumnoPreRegistro import AlumnoPreRegistro
from sigess import app
from sigess.utils import admin_required


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
def obtenerAlumnosPreRegistrados():
    """Obtiene alumnos preregistrados"""
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
