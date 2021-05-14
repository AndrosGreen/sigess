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
	sql = "insert into asignaciones values (null, %s, %s, %s, %s)"
	data = (assignment.nombre, assignment.inicioRecibos, assignment.finRecibos, assignment.instruccion)
	executeStatement(sql, data)
	rows = executeQuery("select idAsignacion from asignaciones  order by idAsignacion desc limit 1")
	return rows[0]


def agregarAsignacionAlumnos(idAsignacion):
	"""Inserta la relacion de AsingacionesAlumnos"""
	sql = "insert into asignacionesalumnos (select 'P', null, %s, noControl from alumnos)"
	data = (idAsignacion)
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

def modificarAsignacion(id, name, dateS, dateE, instruccion):
	"""Modifica los valores de las asignaciones como en asignaciones del alumno"""
	sql = "update asignaciones set nombre = %s, inicioRecibos = %s, finRecibos = %s, instruccion = %s where idAsignacion = %s"
	data = (name, dateS, dateE, instruccion ,id)
	executeStatement(sql, data)


def eliminaAsignacion(idAsignacion):
	"""Elimina una asignacion por su id"""
	try:
		sql = "delete from asignaciones where idAsignacion = %s"
		data = idAsignacion
		executeStatement(sql, data)
	except Exception as error:
		raise error


def obtenerAsignaciones():
	"""Obtiene una lista de las asignaciones"""
	sql = "select distinct(idAsignacion), (nombre), concat(finRecibos, '') as fecha, instruccion as instrucciones, 'archivos' from " \
	" asignaciones"

	rows = executeQuery(sql)
	for row in range(len(rows)):
		sql = "select nombre, concat('/documentos/admin/',idAsignacion,'/',idDocumentoadmin) as ruta from documentosadmin where " \
		" idAsignacion = " + str(rows[row]['idAsignacion'])
		rows2 = executeQuery(sql)
		rows[row]['archivos'] = dict.fromkeys({}, [])
		rows[row]['archivos'] = rows2
	return rows

def monitorearAlumnos():
	"""Obtiene los alumnos, sus tareas completas y las que tienen en total"""
	rows = executeQuery(
		"select a.noControl, concat(a.nombre,' ', a.apPaterno,' ', a.apMaterno) as nombre, "
		"cast(sum(if(a2.estado='A', 1, 0)) as SIGNED) as completos, count(a2.idAsignacion) as totales from alumnos a "
		"join asignacionesalumnos a2 on a.noControl = a2.noControl group by a.noControl"
	)
	return rows


def pendientesRevisar():
	"""Obtiene las tareas que tienen estado P (pendiente)"""
	sql = "select asi.idasignacion, asi.nombre as asignacion, al.noControl, concat(al.nombre, ' ', al.apPaterno, ' ', al.apMaterno) as alumno, " \
		  "aa.estado, aa.nota, concat(asi.finRecibos,'') as fecha, 'archivos' from asignaciones asi join asignacionesalumnos aa on  " \
		  "asi.idAsignacion=aa.idAsignacion join alumnos al on al.noControl=aa.noControl where aa.estado = 'P'"
	rows = executeQuery(sql)
	for row in range(len(rows)):
		sql = "select nombre, concat('/documentos/alumno/',idAsignacion,'/',idDocumentoalumno) as ruta from documentosalumnos where " \
			  " idasignacion = " + str(rows[row]['idasignacion']) + " and noControl = '" + str(rows[row]['noControl']) + "'"
		rows2 = executeQuery(sql)
		rows[row]['archivos'] = dict.fromkeys({}, [])
		rows[row]['archivos'] = rows2
	return rows