from sigess.db import executeQuery, executeStatement, executeQueryWithData
from Modelos.Asignacion import Asignacion

def obtenerPDF(idDocumento):
	"""Obtiene el pdf indicado por el ID"""
	sql = "select archivo from documentosPrueba where id=%s"
	datos = idDocumento
	filas = executeQueryWithData(sql, datos)
	fila = filas[0]
	archivo = fila["archivo"]
	return archivo


def subirPDF(nombre, archivo):
	"""Sube un pdf asumiendo que archivo es el pdf en base64"""
	sql = f"insert into documentosPrueba values(null, %s, %s)"
	data = (nombre, archivo)
	executeStatement(sql, data)

# Ingresa a la base de datos de asignaciones
def agregarAsignacion(assignment):
	"""Agrega una nueva asignacion"""
	sql = "insert into asignaciones values (null, %s, %s, %s, %s)"
	data = (assignment.nombre, assignment.inicioRecibos, assignment.finRecibos, assignment.etapa)
	executeStatement(sql, data)
	rows = executeQuery("select idAsignacion from asignaciones  order by idAsignacion desc limit 1")
	return rows[0]


def agregarAsignacionAlumnos(idAsignacion, nota):
	"""Inserta la relacion de AsingacionesAlumnos"""
	sql = "insert into asignacionesalumnos (select 'P', %s, %s, noControl from alumnos)"
	data = (nota, idAsignacion)
	executeStatement(sql, data)


def agregaDocAlumnos(idAsignacion, documents):
	"""Inserta la relación de los alumnos con los docuementos"""
	for nameDocument in documents:
		sql = "insert into documentosalumnos (select %s, null, null, %s, noControl from alumnos)"
		data = (nameDocument.nombre, idAsignacion)
		executeStatement(sql, data)

def agregaDocAdmin(idAsignacion, documents):
	"""Inserta los documentos del adminisitrador"""
	for nameDocument in documents:
		sql = "insert into documentosadmin values (%s, %s, null, %s)"
		data = (nameDocument.nombre, nameDocument.documento, idAsignacion)
		executeStatement(sql, data)