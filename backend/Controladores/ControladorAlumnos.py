from Modelos.AlumnoPreRegistro import AlumnoPreRegistro
from sigess.db import executeStatement, executeQueryWithData, executeQuery


def creaAlumno():
    pass


def eliminaAlumno():
    pass


def modificaAlumno():
    pass


def registraAlumno():
    pass


def listaAlumnos():
    pass


def existeAlumnoAPreRegistrar(alumno):
    """Consulta si existe el alumno a preregistrar en el pre registro o en los registros"""
    sql = 'select * from alumnospreregistro where noControl=%s'
    data = alumno.noControl
    filas = executeQueryWithData(sql, data)
    if len(filas) > 0:
        return True  # Si el alumno está en pre registro
    sql = 'select * from alumnos where noControl=%s'
    data = alumno.noControl
    filas = executeQueryWithData(sql, data)
    if len(filas) > 0:
        return True  # Si el alumno ya se registró
    return False  # El alumno no existe


def preRegistraAlumno(alumno):
    """Preregistra un alumno"""
    sql = 'insert into alumnospreregistro values(%s, md5(%s))'
    data = (alumno.noControl, alumno.clave)
    executeStatement(sql, data)


def obtenerAlumnosPreRegistrados():
    """Devuelve los alumnos preregistrados"""
    sql = "select * from alumnospreregistro"
    filas = executeQuery(sql)
    alumnos = []
    for fila in filas:
        alumnos.append(AlumnoPreRegistro.desdeFila(fila).serialize)
    return alumnos
