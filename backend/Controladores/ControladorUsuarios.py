from flask_login import login_user, logout_user

from Modelos.Usuario import Usuario
from sigess.db import executeQueryWithData


def login(usuario):
	"""Logea al usuario"""
	if usuario.nivelDePermisos > 1:
		sql = "select * from admins where idAdmin=%s and clave=md5(%s)"
	else:
		sql = "select * from alumnos where noControl=%s and clave=md5(%s)"
	data = (usuario.usuario, usuario.clave)
	rows = executeQueryWithData(sql, data)
	if len(rows) == 0:
		return False
	else:
		if usuario.nivelDePermisos > 1:
			row = rows[0]
			if row['esRevisor'] == 'F':
				usuario.nivelDePermisos = 3
			elif row['esRevisor'] == 'T':
				usuario.nivelDePermisos = 2
		login_user(usuario, remember=True)
		return True


def logout():
	"""Deslogea al usuario"""
	logout_user()


def obtenerUsuarioPorID(idUsuario):
	"""Obtiene el usaurio dado un ID"""
	# Prueba con alumnos
	sql = f"select * from alumnos where noControl=%s"
	data = idUsuario
	rows = executeQueryWithData(sql, data)
	if len(rows) == 1:
		row = rows[0]
		return Usuario.alumnoDedeFila(row)
	# Prueba con admins
	sql = f"select * from admins where idadmin=%s"
	data = idUsuario
	rows = executeQueryWithData(sql, data)
	if len(rows) == 1:
		row = rows[0]
		return Usuario.adminDesdeFila(row)
