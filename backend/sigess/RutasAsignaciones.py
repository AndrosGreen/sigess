from flask import request, jsonify
from flask_login import login_required
from Controladores import ControladorAsignaciones
from sigess import app
from sigess.utils import admin_required, alumno_required


@app.route('/asignaciones/obtenerAsignacionesAlumnos', methods=['GET'])
@login_required
@admin_required
def obtenerAsignacionesAlumnos():
    """Obtiene datos de los alumnos y sus asignaciones hechas y las asignaciones totales que tienen"""
    asignaciones = ControladorAsignaciones.monitorearAlumnos()
    return jsonify(asignaciones)
