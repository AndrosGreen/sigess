from sigess.db import executeQuery, executeStatement, executeQueryWithData
from Modelos.Asignacion import Asignacion
import datetime
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
	sql = "insert into asignaciones values (null, %s, %s, %s)"
	data = (assignment.nombre, assignment.inicioRecibos, assignment.finRecibos)
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

def modificarAsignacion(id, name, dateS, dateE, note):
	"""Modifica los valores de las asignaciones como en asignaciones del alumno"""
	sql = "update asignaciones set nombre = %s, inicioRecibos = %s, finRecibos = %s where idAsignacion = %s"
	data = (name, dateS, dateE, id)
	executeStatement(sql, data)
	# Modificamos la tabla de relacion con el alumno
	sql = "update asignacionesalumnos set nota = %s where idAsignacion = %s"
	data = (note, id)
	executeStatement(sql, data)


def eliminaAsignacion(idAsignacion):
	"""Elimina una asignacion por su id"""
	try:
		sql = "delete from asignaciones where idAsignacion = %s"
		data = idAsignacion
		executeStatement(sql, data)
	except Exception as error:
		raise error


def obtenerAsignaciones(noControl):
	"""Obtiene una lista de las asignaciones"""
	sql = "select asi.idAsignacion, (asi.nombre), concat(asi.finRecibos, '') as fecha, al.nota as instrucciones, 'archivos' from " \
	" asignaciones asi join asignacionesalumnos al on asi.idAsignacion=al.idAsignacion" \
	" where al.noControl = %s "
	data = noControl
	rows = executeQueryWithData(sql, data)
	print(rows)
	for row in range(len(rows)):
		sql = "select nombre, concat('/documentos/alumnos/',idAsignacion,'/',idDocumentoAlumno) as ruta from documentosalumnos where noControl = %s " \
		" and idAsignacion = " + str(rows[row]['idAsignacion'])
		rows2 = executeQueryWithData(sql, data)
		rows[row]['archivos'] = dict.fromkeys({}, [])
		rows[row]['archivos'] = rows2
	return rows