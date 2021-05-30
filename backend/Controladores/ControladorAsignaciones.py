from sigess import utils
from sigess.db import executeQuery, executeStatement, executeQueryWithData




def obtenerPDF(idDocumento):
	"""(Función de prueba) Obtiene el pdf indicado por el ID
	Args:
		idDocumento: El id del documento a obtener
	"""
	sql = "select archivo from documentosPrueba where id=%s"
	datos = idDocumento
	filas = executeQueryWithData(sql, datos)
	fila = filas[0]
	archivo = fila["archivo"]
	return archivo


def subirPDF(nombre, archivo):
	"""(Función de prueba) Sube un pdf asumiendo que archivo es el pdf en base64
	Args:
		nombre: El nombre del archivo
		archivo: El archivo en base64 a subir
	"""
	sql = f"insert into documentosPrueba values(null, %s, %s)"
	data = (nombre, archivo)
	executeStatement(sql, data)



def agregarAsignacion(asignacion):
	"""Agrega una nueva asignacion
	Args:
		asignacion: La asignacion a agregar
	"""
	sql = "insert into asignaciones values (null, %s, %s, %s, %s)"
	data = (asignacion.nombre, asignacion.inicioRecibos, asignacion.finRecibos, asignacion.instruccion)
	executeStatement(sql, data)
	rows = executeQuery("select idAsignacion from asignaciones  order by idAsignacion desc limit 1")
	return rows[0]


def agregarAsignacionAlumnos(idAsignacion):
	"""Inserta la relacion de AsingacionesAlumnos
	Args:
		idAsignacion: El id de la asignación a agregar a los alumnos
	"""
	sql = "insert into asignacionesalumnos (select 'P', null, %s, noControl from alumnos)"
	data = idAsignacion
	executeStatement(sql, data)


def agregaDocAlumnos(idAsignacion, documents):
	"""Inserta la relación de los alumnos con los docuementos
	Args:
		idAsignacion: El id de la asignacion que tendrá los documentos
		documents: Los documentos que se agregarán a la asignación y el alumno podrá subir
	"""
	for nameDocument in documents:
		sql = "insert into documentosalumnos (select %s, null, null, %s, noControl from alumnos)"
		data = (nameDocument.nombre, idAsignacion)
		executeStatement(sql, data)


def agregaDocAdmin(idAsignacion, documents):
	"""Inserta los documentos del adminisitrador
	Args:
		idAsignacion: EL id de la asignación que tendrá los documentos
		documents: Los documentos del administrador de solo lectura para alumnos
	"""
	for nameDocument in documents:
		sql = "insert into documentosadmin values (%s, %s, null, %s)"
		data = (nameDocument.nombre, nameDocument.documento, idAsignacion)
		executeStatement(sql, data)


def modificarAsignacion(id, name, dateS, dateE, instruccion):
	"""Modifica los valores de las asignaciones como en asignaciones del alumno
	Args:
		id: El id de la asignación
		name: El nombre de la asignación
		dateS: La fecha de apertura de la asignación
		dateE: La fecha de cierre de la asignación
		instruccion: La intrucción a mostrar en la asignación
	"""
	sql = "update asignaciones set nombre = %s, inicioRecibos = %s, finRecibos = %s, instruccion = %s " \
		"where idAsignacion = %s"
	data = (name, dateS, dateE, instruccion, id)
	executeStatement(sql, data)


def eliminaAsignacion(idAsignacion):
	"""Elimina una asignacion por su id
	Args:
		idAsignacion: El id de la asignación a eliminar de la base
	"""
	try:
		sql = "delete from asignaciones where idAsignacion = %s"
		data = idAsignacion
		executeStatement(sql, data)
	except Exception as error:
		raise error


def obtenerAsignaciones():
	"""Obtiene la lista de las asignaciones"""
	sql = "select distinct(idAsignacion), (nombre), concat(finRecibos, '') as fecha, " \
		"instruccion as instrucciones, 'archivos' " \
		"from asignaciones"

	rows = executeQuery(sql)
	for row in range(len(rows)):
		sql = "select nombre, concat('/documentos/admin/',idAsignacion,'/',idDocumentoadmin) as ruta from documentosadmin where idAsignacion = " + str(rows[row]['idAsignacion'])
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
	sql = "select asi.idasignacion, asi.nombre as asignacion, al.noControl, " \
		"concat(al.nombre, ' ', al.apPaterno, ' ', al.apMaterno) as alumno, " \
		"aa.estado, aa.nota, concat(asi.finRecibos,'') as fecha, 'archivos' " \
		"from asignaciones asi " \
		"join asignacionesalumnos aa on asi.idAsignacion=aa.idAsignacion " \
		"join alumnos al on al.noControl=aa.noControl " \
		"where aa.estado = 'P'"
	rows = executeQuery(sql)
	for row in range(len(rows)):
		sql = "select nombre, concat('/documentos/alumno/', idAsignacion,'/', idDocumentoalumno) as ruta from documentosalumnos where idasignacion = " + str(rows[row]['idasignacion']) + " and noControl = '" + str(rows[row]['noControl']) + "'"
		rows2 = executeQuery(sql)
		rows[row]['archivos'] = dict.fromkeys({}, [])
		rows[row]['archivos'] = rows2
	return rows


def listaAsignacionesAlumno(noControl):
	"""Lista las tareas del alumno indicado por el no. de control
	Args:
		noControl: El numero de control del alumno a obtener las asignaciones
	"""
	sql = "select a.nombre, aa.* " \
		"from asignacionesalumnos aa " \
		"join asignaciones a on aa.idAsignacion = a.idAsignacion " \
		"where aa.noControl=%s;"
	datos = noControl
	filas = executeQueryWithData(sql, datos)
	return filas


def obtenerDocumentosEnAsignacion(idAsignacion, idAlumno):
	"""Obtiene los documentos de una asignación y de un alumno"""
	sql = "select nombre, idDocumentoAlumno from documentosalumnos where idAsignacion=%s and noControl=%s"
	datos = (idAsignacion, idAlumno)
	documentos = executeQueryWithData(sql, datos)
	return documentos


def obtenerPDFAlumno(idAsignacion, idAlumno, idDocumento):
	"""Obtiene el pdf del alumno"""
	sql = "select nombre, documento " \
		"from documentosalumnos where idDocumentoAlumno=%s and idAsignacion=%s and noControl=%s;"
	datos = (idDocumento, idAsignacion, idAlumno)
	filas = executeQueryWithData(sql, datos)
	fila = filas[0]
	titulo = fila['nombre']
	archivo = fila['documento']
	pdf = utils.generaVistaPDFConTitulo(archivo, f"{titulo}-{idAlumno}")
	return pdf


def obtenerPDFAdmin(idAsignacion, idDocumento):
	"""Obtiene el pdf del alumno"""
	sql = "select nombre, documento " \
		"from documentosadmin where idAsignacion=%s and idDocumentoAdmin=%s;"
	datos = (idAsignacion, idDocumento)
	filas = executeQueryWithData(sql, datos)
	fila = filas[0]
	titulo = fila['nombre']
	archivo = fila['documento']
	pdf = utils.generaVistaPDFConTitulo(archivo, f"{titulo}-Base")
	return pdf
