from sigess.db import executeStatement, executeQueryWithData, executeQuery
from Modelos.Requisito import Requisito


# Recibe un requisito y lo crea
def crearRequisito(requisito):
    try:
        sql = "insert into requisitos values (null, %s,%s,%s);"

        data = (requisito.nombre, requisito.revisadoPor, requisito.detalleARevisar)

        executeStatement(sql, data)
    except Exception as error:
        raise error


# Para un id, elimina ese requisito
def eliminarRequisito(id_requisito):
    try:
        sql = "delete from requisitos where idRequisito = %s;"
        data = id_requisito
        executeStatement(sql, data)
    except Exception as error:
        raise error


# Recibe un id de requisito y devuelve el requisito serializado
def obtenerRequisito(id_requisito):
    try:
        rows = executeQuery("select * from requisitos where idRequisito = '{0}'".format(id_requisito))
        if len(rows) == 0:
            return None
        row = rows[0]
        return Requisito(row['idRequisito'], row['nombre'], row['revisadoPor'], row['detalleARevisar'])
    except Exception as error:
        raise error


# Recibe un alumno y devuelve los requisitos de este
def listaRequisitosAlumno(data):
    """Obtiene una lista de requisitos del alumnos recibido"""
    sql = "select req.* from requisitos req join alumnosrequisitos al_req on req.idRequisito=al_req.idRequisito and %s=al_req.noControl"
    rows = executeQueryWithData(sql, data)
    requirements = []
    for row in rows:
        requirements.append(Requisito.desdeFila(row).serialize)
    return requirements


# Recibe los requisitos y los alumnos para validar esos requisitos
def validarRequisitosAlumno(requisitoAlumnos):
    """Valida los requisitos a los alumnos ingresados"""
    sql = ""
    if requisitoAlumnos.cumple == "T":
        sql = "update alumnosrequisitos set cumple='T' where noControl=%s and idRequisito=%s"
    else:
        sql = "update alumnosrequisitos set cumple='F' where noControl=%s and idRequisito=%s"
    data = (requisitoAlumnos.Alumno, requisitoAlumnos.Requisito)
    executeStatement(sql, data)
