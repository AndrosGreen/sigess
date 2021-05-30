from Modelos.AlumnoPreRegistro import AlumnoPreRegistro
from Modelos.Alumno import Alumno
from sigess.db import executeStatement, executeQueryWithData, executeQuery


def obtenAlumnoPorNombre(nombreAlumno):
    """Obtiene un alumno dado un nombre
    Args:
        nombreAlumno: El nombre del alumno a obtener
    """
    sql = "select * from alumnos where nombre = %s limit 1"
    data = nombreAlumno
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return None
    else:
        fila = filas[0]
        return Alumno.desdeFila(fila)


def creaAlumno(alumno):
    """Crea un alumno y lo devuelve si sale bien o None si no
    Args:
        alumno: El objeto alumno a crear en la base
    """
    sql = "insert into alumnos values(%s, %s, %s, %s, %s, md5(%s), %s, %s, %s, %s, %s)"
    data = (alumno.noControl, alumno.nombre, alumno.apPaterno,
            alumno.apMaterno, alumno.correo, alumno.clave,
            alumno.telefono, alumno.carrera, alumno.programa,
            alumno.encargado, alumno.institucion)
    executeStatement(sql, data)
    return obtenAlumnoPorNombre(alumno.nombre)


def eliminaAlumno(noControl):
    """Elimina un alumno dado su id
    Args:
        noControl: El numero de control del alumno a eliminar
    """
    sql = "delete from alumnos where noControl = %s"
    data = noControl
    executeStatement(sql, data)


def modificaAlumno(alumno):
    """Modifica un alumno
    Args:
        alumno: El objeto alumno a modificar en la base con base al id
    """
    sql = 'update alumnos set nombre=%s, ' \
          'apPaterno=%s, apMaterno=%s, correo=%s, clave=md5(%s), ' \
          'carrera=%s, programa=%s, encargado=%s, institucion=%s where noControl=%s'
    data = (alumno.nombre, alumno.apPaterno, alumno.apMaterno,
            alumno.correo, alumno.clave, alumno.carrera, alumno.programa,
            alumno.encargado, alumno.institucion, alumno.noControl)
    executeStatement(sql, data)


def registraAlumno(alumno):
    """Registra al alumno, lo borra del preregistro y agrega sus requisitos
    Args:
        alumno: El objeto alumno a registrar en la base
    """
    eliminaPreRegistrado(alumno.noControl)
    creaAlumno(alumno)
    agregaRequisitosAlumno(alumno)
    return obtenAlumnoPorNombre(alumno.nombre)


def listaAlumnos():
    """Obtiene todos los alumnos"""
    rows = executeQuery("select * from alumnos")
    return rows  


def existeAlumnoRegistrado(alumno):
    """Consulta si el alumno a preregistrar ya está registrado
    Args:
        alumno: El alumno a consultar si está registrado
    """
    sql = 'select * from alumnos where noControl=%s'
    data = alumno.noControl
    filas = executeQueryWithData(sql, data)
    return len(filas) > 0


def existeAlumnoAPreRegistrar(alumno):
    """Consulta si el alumno está preregistrado
    Args:
        alumno: El alumno a consultar si está preregistrado
    """
    sql = 'select * from alumnospreregistro where noControl=%s'
    data = alumno.noControl
    filas = executeQueryWithData(sql, data)
    return len(filas) > 0


def preRegistraAlumno(alumno):
    """Preregistra un alumno
    Args:
        alumno: El objeto alumno a preregistrar
    """
    sql = 'insert into alumnospreregistro values(%s, md5(%s))'
    data = (alumno.noControl, alumno.clave)
    executeStatement(sql, data)


def obtenerAlumnosPreRegistrados():
    """Obtiene los alumnos preregistrados"""
    sql = "select * from alumnospreregistro"
    filas = executeQuery(sql)
    alumnos = []
    for fila in filas:
        alumnos.append(AlumnoPreRegistro.desdeFila(fila).serialize)
    return alumnos


def estaAlumnoPreRegistrado(noControl):
    """Obtiene si un alumno ya está preregistrado
    Args:
        noControl: El numero de control a consultar si ya está preregistrado
    """
    sql = "select count(*) as conteo from alumnospreregistro where noControl=%s"
    data = noControl
    filas = executeQueryWithData(sql, data)
    fila = filas[0]
    existePreRegistro = True if fila["conteo"] == 1 else False
    return existePreRegistro


def eliminaPreRegistrado(noControl):
    """Elimina el alumno del preregistro usando el numero de control
    Args:
        noControl: El número de control del alumno a eliminar del preregistro
    """
    sql = "delete from alumnospreregistro where noControl=%s"
    data = noControl
    executeStatement(sql, data)


def agregaRequisitosAlumno(alumno):
    """Agrega los requisitos de un alumno a registrar
    Args:
        alumno: El objeto alumno al cual se agregarán los requisitos pertinentes en la base
    """
    sql = "insert into alumnosRequisitos (select %s, idRequisito, 'P' from requisitos)"
    data = alumno.noControl
    executeStatement(sql, data)
