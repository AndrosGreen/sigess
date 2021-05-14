from sigess.db import executeQuery, executeStatement, executeQueryWithData


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


def monitorearAlumnos():
	"""Obtiene los alumnos, sus tareas completas y las que tienen en total"""
	rows = executeQuery(
		"select a.noControl, concat(a.nombre,' ', a.apPaterno,' ', a.apMaterno) as nombre, "
		"cast(sum(if(a2.estado='A', 1, 0)) as SIGNED) as completos, count(a2.idAsignacion) as totales from alumnos a "
		"join asignacionesalumnos a2 on a.noControl = a2.noControl group by a.noControl"
	)
	return rows
