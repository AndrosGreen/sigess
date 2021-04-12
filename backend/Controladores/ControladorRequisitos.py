from sigess.db import executeStatement, executeQueryWithData, executeQuery
from Modelos.Requisito import Requisito

#Recibe un requisito y lo crea
def crearRequisito(requisito):
    try:        
        sql = "insert into requisitos values (%s,%s,%s);"
        
        data = (requisito.nombre, requisito.revisadoPor, requisito.detallesARevisar)
        
        executeStatement(sql, data)
    except Exception as error:
        raise error


# Para un id, elimina ese requisito
def eliminarRequisito(id_requisito):
    try:
        sql = "delete from requisitos where idREQUISITO = %s;"
        data = id_requisito
        executeStatement(sql, data)
    except Exception as error:
        raise error

# Recibe un id de requisito y devuelve el requisito serializado
def obtenerRequisito(id_requisito):
try:
    rows = executeQuery("select * from requisitos where id_requisito = '{0}'".format(id_requisito))
    if len(rows) == 0:
        return None
    row = rows[0]
    return Requisito(row['nombre'], row['revisadoPor'], row['detallesARevisar'])
except Exception as error:
        raise error


# Recibe un alumno y devuelve los requisitos de este
def listaRequisitosAlumno():
    # TODO Mike
    pass


def validarRequisitosAlumno():
    # TODO Mike
    pass