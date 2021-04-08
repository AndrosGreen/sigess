from flask_login import login_user, logout_user

from Modelos.Usuario import Usuario
from sigess.db import executeQueryWithData


def login(user):
	if user.isAdmin:
		sql = "select * from admins where idAdmin=%s and clave=md5(%s)"
	else:
		sql = "select * from alumnos where noControl=%s and clave=md5(%s)"
	data = (user.id, user.passw)
	rows = executeQueryWithData(sql, data)
	if len(rows) == 0:
		return False
	else:
		login_user(user, remember=True)
		return True


def logout():
	logout_user()


def getUserByID(idUser):
	# Prueba con alumnos
	sql = f"select * from alumnos where noControl=%s"
	data = idUser
	rows = executeQueryWithData(sql, data)
	if len(rows) == 1:
		row = rows[0]
		return Usuario(row['noControl'], row['clave'], False)
	# Prueba con admins
	sql = f"select * from admins where idAdmin=%s"
	data = idUser
	rows = executeQueryWithData(sql, data)
	if len(rows) == 1:
		row = rows[0]
		return Usuario(row['nombre'], row['clave'], True)
