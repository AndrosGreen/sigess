from flask import jsonify, request
from flask_login import login_required, current_user
from Modelos.Asignacion import Asignacion
from Modelos.Documentos import Documentos
from Controladores import ControladorAsignaciones
from sigess import app

@app.route('/asignaciones/creaAsignacion', methods=['POST'])
@login_required
def registraAsignacion():
    """Registra una asignacion y con sus relaciones a los alumnos y documentos"""
    _json = request.json
    assignment = Asignacion(
        _json['nombre'],
        _json['fechaIni'],
        _json['fechaFin']
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

@app.route('/asignaciones/modificarAsignacion', methods=['POST'])
@login_required
def modificarAsignacion():
    """Modifica la asignación"""
    _json = request.json
    _id = _json['idAsignacion']
    _nombre = _json['nombre']
    _fechaIni = _json['fechaIni']
    _fechaFin = _json['fechaFin']
    _instuccion = _json['instruccion']
    ControladorAsignaciones.modificarAsignacion(_id, _nombre, _fechaIni, _fechaFin, _instuccion)
    return {
        "mensaje": "Modificados correctamente"
    }

@app.route('/asignaciones/eliminaAsignacion', methods=['POST'])
@login_required
def eliminarAsignacion():
    """Elimina la asignación"""
    _json = request.json
    _idAsignacion = _json['idAsignacion']
    ControladorAsignaciones.eliminaAsignacion(_idAsignacion)
    return {
        "mensaje": "Eliminado correctamente"
    }


@app.route('/asignaciones/mostrarAsignaciones', methods=['POST'])
@login_required
def mostarAsignaciones():
    """Muestra una lista de las asignaciones"""
    _json = request.json
    _noControl = _json['noControl']
    assignment = ControladorAsignaciones.obtenerAsignaciones(_noControl)
    return jsonify(assignment)




