from Modelos.AlumnoPreRegistro import AlumnoPreRegistro
from Modelos.Alumno import Alumno
from sigess.db import executeStatement, executeQueryWithData, executeQuery

def obtenAlumnoPorNombre(nombreAlumno):
    """Obtiene un alumno dado un nombre"""
    sql = "select * from alumnos where nombre = %s limit 1"
    data = nombreAlumno
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return None
    else:
        fila = filas[0]
        return Alumno.desdeFila(fila)

def creaAlumno(alumno):
    """Crea un alumno y lo devuelve si sale bien o None si no"""
    sql = "insert into alumnos values(%s, %s, %s, %s, %s, md5(%s), %s, %s)"
    data = (alumno.noControl, alumno.nombre, alumno.apPaterno, alumno.apMaterno, alumno.correo, alumno.clave, alumno.carrera,alumno.programa, alumno.encargado, alumno.empresa)
    executeStatement(sql, data)
    return obtenAlumnoPorNombre(alumno.nombre)


def eliminaAlumno(noControl):
    """Elimina un alumno dado su id"""
    sql = "delete from alumnos where noControl = %s"
    data = noControl
    executeStatement(sql, data)


def modificaAlumno(alumno):
    """Modifica un alumno"""
    sql = 'update alumnos set nombre=%s, apPaterno=%s, apMaterno=%s, correo=%s, clave=md5(%s), carrera=%s, programa=%s, encargado=%s, empresa=%s where noControl=%s'
    data = (alumno.nombre, alumno.apPaterno, alumno.apMaterno, alumno.correo, alumno.clave, alumno.carrera, alumno.programa, alumno.encargado, alumno.empresa,alumno.noControl)
    executeStatement(sql, data)


def registraAlumno(alumno):
    """Checa si un alumno está preregistrado y si es así lo registra, sino regresa None"""
    if existeAlumnoAPreRegistrar(alumno)==True:
        creaAlumno(alumno)
    else:
        return None


def listaAlumnos():
    rows = executeQuery("select * from alumnos")
    return rows  # Ya tiene los datos del pokemon

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
