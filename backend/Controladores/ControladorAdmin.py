from sigess.db import executeStatement


def creaAdmin(admin):
    # TODO comprobar si el admin existe,
    # devuelve el admin si sale bien, false o error si no
    sql = "insert into admins values(%s, %s, %s, %s, %s)"
    sqlData = (admin.idAdmin, admin.nombre, admin.area, admin.correo, admin.clave)
    executeStatement(sql, sqlData)


def eliminaAdmin():
    # TODO Dani
    pass