from sigess.db import executeStatement, executeQueryWithData, executeQuery
from Modelos.Requisito import Requisito


def crearRequisito(requisito):
    """Crea un requisito en la base
    Args:
        requisito: El requisito a crear en la base
    """
    try:
        sql = "insert into requisitos values (null, %s,%s,%s);"

        data = (requisito.nombre, requisito.revisadoPor, requisito.detalleARevisar)

        executeStatement(sql, data)
    except Exception as error:
        raise error


def eliminarRequisito(idRequisito):
    """Elimina un requisito dado su id
    Args:
        idRequisito: El id del requisito a eliminar
    """
    try:
        sql = "delete from requisitos where idRequisito = %s;"
        data = idRequisito
        executeStatement(sql, data)
    except Exception as error:
        raise error


def obtenerRequisito(idRequisito):
    """Obtiene el reqisito identificado por el id
    Args:
        idRequisito: El id del requisito a obtener
    """
    try:
        rows = executeQuery("select * from requisitos where idRequisito = '{0}'".format(idRequisito))
        if len(rows) == 0:
            return None
        row = rows[0]
        return Requisito(row['idRequisito'], row['nombre'], row['revisadoPor'], row['detalleARevisar'])
    except Exception as error:
        raise error


def listaRequisitosAlumno(noConrtol):
    """Obtiene una lista de requisitos del alumnos definido por el numero de control
    Args:
        noConrtol: El numero de control del alumno
    """
    sql = "select req.*, al_req.cumple from requisitos req join alumnosrequisitos al_req on req.idRequisito=al_req.idRequisito and %s=al_req.noControl"
    rows = executeQueryWithData(sql, noConrtol)
    return rows


def actualizarRequisito(requisito):
    """Actualiza un requisito
    Args:
        requisito: El objeto del requisito a actualizar en la base
    """
    sql = "update requisitos set nombre=%s, detalleARevisar=%s where idRequisito=%s"
    datos = (requisito.nombre, requisito.detalleARevisar, requisito.idRequisito)
    executeStatement(sql, datos)


def existeRequisito(requisito):
    """Verifica si existe un requisito
    Args:
        requisito: El requisito a verificar su existencia
    """
    sql = "select count(*) as cuenta from requisitos where idRequisito=%s"
    data = requisito.idRequisito
    filas = executeQueryWithData(sql, data)
    fila = filas[0]
    cuenta = fila["cuenta"]
    return cuenta > 0


def validarRequisitosAlumno(requisitoAlumnos):
    """Valida los requisitos a los alumnos ingresados
    Args:
        requisitoAlumnos: El objeto requisito para un alumno
    """
    sql = ""
    if requisitoAlumnos.cumple == "A":
        sql = "update alumnosrequisitos set cumple='A' where noControl=%s and idRequisito=%s"
    elif requisitoAlumnos.cumple == "R":
        sql = "update alumnosrequisitos set cumple='R' where noControl=%s and idRequisito=%s"
    else:
        sql = "update alumnosrequisitos set cumple='P' where noControl=%s and idRequisito=%s"
    data = (requisitoAlumnos.Alumno, requisitoAlumnos.Requisito)
    executeStatement(sql, data)


def listaRequisitos():
    """Obtiene la lista de los requisitos ingresados"""
    sql = "select * from requisitos"
    requeriments = []
    rows  = executeQuery(sql)
    for row in rows:
        requeriments.append(Requisito.desdeFila(row).serialize)
    return requeriments


def listaRequisitosAdmin(idAdmin):
    """Obtiene la lista de alumnos con el estatus del requisito relacionados con el administrador
    Args:
        idAdmin: El id del admin a obtener sus requisitos
    """
    sql = "select concat(al.nombre,' ',al.apPaterno, ' ', al.apMaterno) as nombre,al.noControl, " \
          "al_req.cumple as estadoRequisito"
    sql += " from admins adm join requisitos req on adm.idAdmin=req.revisadoPor join alumnosrequisitos al_req on"
    sql += " al_req.idRequisito=req.idRequisito join alumnos al on al.noControl=al_req.noControl where adm.idadmin=%s"
    rows = executeQueryWithData(sql, idAdmin)
    return rows


def obtenerRequisitoAdmin(idAdmin):
    """Obtiene la lista de requisitos asignados a un administrador
    Args:
        idAdmin: El id del admin de donde se obtienen los requisitos
    """
    try:
        rows = executeQuery("select * from requisitos where revisadoPor = '{0}'".format(idAdmin))
        if len(rows) == 0:
            return None
        row = rows[0]
        return Requisito(row['idRequisito'], row['nombre'], row['revisadoPor'], row['detalleARevisar'])
    except Exception as error:
        raise error