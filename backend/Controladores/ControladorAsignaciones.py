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
	"""Obtiene los alumnos y las tareas que han hecho y las que tienen en total"""
	rows = executeQuery("select a.noControl, concat(a.nombre,' ', a.apPaterno,' ', a.apMaterno) as nombre, "
						"count(a.noControl) as Tareas, (select count(l.Asignaciones_idAsignacion) from asign"
						"acionesalumnos l where l.Alumnos_noControl=a.noControl) as Total from alumnos a nat"
						"ural join asignacionesalumnos p where p.estado='A'")
	return rows