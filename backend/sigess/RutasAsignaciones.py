
from flask import jsonify, request
from flask_login import login_required, current_user
from Modelos.Asignacion import Asignacion
from Modelos.Documentos import Documentos
from Controladores import ControladorAsignaciones
from sigess import app
from sigess.utils import admin_required, alumno_required


@app.route('/asignaciones/creaAsignacion', methods=['POST'])
@login_required
@admin_required
def registraAsignacion():
    """Registra una asignacion y con sus relaciones a los alumnos y documentos"""
    _json = request.json
    assignment = Asignacion(
        _json['nombre'],
        _json['fechaIni'],
        _json['fechaFin'],
        _json['instruccion']
    )
    documents = []
    for doc in _json['documentos']:
        newDoc = Documentos(
            doc['nombre'],
            doc['documento']
        )
        documents.append(newDoc)
    # Obtiene id de la signacion e inserta
    ID = ControladorAsignaciones.agregarAsignacion(assignment)
    ID = ID['idAsignacion']
    ControladorAsignaciones.agregarAsignacionAlumnos(ID)
    ControladorAsignaciones.agregaDocAlumnos(ID, documents)
    ControladorAsignaciones.agregaDocAdmin(ID, documents)
    return {
        "mensaje": "Agregado correctamente"
    }


@app.route('/asignaciones/modificarAsignacion', methods=['POST'])
@login_required
@admin_required
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
@admin_required
def eliminarAsignacion():
    """Elimina la asignación"""
    _json = request.json
    _idAsignacion = _json['idAsignacion']
    ControladorAsignaciones.eliminaAsignacion(_idAsignacion)
    return {
        "mensaje": "Eliminado correctamente"
    }


@app.route('/asignaciones/mostrarAsignaciones', methods=['GET'])
@login_required
@admin_required
def mostarAsignaciones():
    """Muestra una lista de las asignaciones"""
    assignment = ControladorAsignaciones.obtenerAsignaciones()
    return jsonify(assignment)
  
 
@app.route('/asignaciones/obtenerAsignacionesAlumnos', methods=['GET'])
@login_required
@admin_required
def obtenerAsignacionesAlumnos():
    """Obtiene datos de los alumnos y sus asignaciones hechas y las asignaciones totales que tienen"""
    asignaciones = ControladorAsignaciones.monitorearAlumnos()
    return jsonify(asignaciones)


@app.route('/asignaciones/pendientesDeRevisar', methods=['GET'])
@login_required
@admin_required
def obtenerPendientes():
    """Obtiene la lista de las tareas pendientes de revisar por el administrador"""
    asignaciones = ControladorAsignaciones.pendientesRevisar()
    return jsonify(asignaciones)


@app.route('/asignaciones/listaAsignacionesAlumnoActual', methods=['GET'])
@login_required
@alumno_required
def listaAsignacionesAlumnoActual():
    """Lista las asignaciones del alumno logeado actualmente"""
    alumnoActual = current_user
    asignacionesAlumno = ControladorAsignaciones.listaAsignacionesAlumno(alumnoActual.usuario)
    return jsonify(asignacionesAlumno)


@app.route('/asignaciones/obtenerDocumentosEnAsignacion', methods=['POST'])
@login_required
@alumno_required
def obtenerDocumentosEnAsignacion():
    """Obtiene los documentos de la asignacion y el alumno indicados"""
    json = request.json
    idAsignacion = json['idAsignacion']
    idAlumno = json['idAlumno']
    documentos = ControladorAsignaciones.obtenerDocumentosEnAsignacion(idAsignacion, idAlumno)
    return jsonify(documentos)
