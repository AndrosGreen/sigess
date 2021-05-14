from flask import jsonify, request
from flask_login import login_required, current_user
from Modelos.Asignacion import Asignacion
from Modelos.Documentos import Documentos
from Controladores import ControladorAsignaciones
from sigess import app

@app.route('/asignaciones/creaAsignacion', methods=['POST'])
#@login_required
def registraAsignacion():
    """Registra una asignacion y con sus relaciones a los alumnos y documentos"""
    _json = request.json
    assignment = Asignacion(
        _json['nombre'],
        _json['fechaIni'],
        _json['fechaFin'],
        _json['etapa']
    )
    documents = []
    for doc in _json['documentos']:
        newDoc = Documentos (
            doc['nombre'],
            doc['documento']
        )
        documents.append(newDoc)
    # Obtiene id de la signacion e inserta
    ID = ControladorAsignaciones.agregarAsignacion(assignment)
    ID =  ID['idAsignacion']
    ControladorAsignaciones.agregarAsignacionAlumnos(ID, _json['instruccion'])
    ControladorAsignaciones.agregaDocAlumnos(ID, documents)
    ControladorAsignaciones.agregaDocAdmin(ID, documents)
    return {
        "mensaje": "Agregado correctamente"
    }
