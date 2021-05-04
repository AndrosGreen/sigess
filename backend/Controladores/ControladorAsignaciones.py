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
