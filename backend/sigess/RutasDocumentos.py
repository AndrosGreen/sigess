from Controladores import ControladorAsignaciones
from sigess import app


@app.route('/documentos/alumnos/tarea=<int:idAsignacion>&alumno=<string:idAlumno>&doc=<int:idDocumento>', methods=["GET"])
def obtenerPDFAlumno(idAsignacion, idAlumno, idDocumento):
    """Devuelve el pdf indicado por idDocumento en la asignación al alumno indicado por idAlumno"""
    pdf = ControladorAsignaciones.obtenerPDFAlumno(idAsignacion, idAlumno, idDocumento)
    return pdf


@app.route('/documentos/admin/tarea=<int:idAsignacion>&doc=<string:idDocumento>', methods=["GET"])
def obtenerPDFAdmin(idAsignacion, idDocumento):
    """Devuelve el pdf indicado por idDocumento en la asignación"""
    pdf = ControladorAsignaciones.obtenerPDFAdmin(idAsignacion, idDocumento)
    return pdf
