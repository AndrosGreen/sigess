from Modelos.Admin import Admin
from sigess.db import executeStatement, executeQueryWithData


def obtenAdminPorID(idAdmin):
    """Obtiene un admin dado un id"""
    sql = "select * from admins where idAdmin = %s limit 1"
    data = idAdmin
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return None
    else:
        fila = filas[0]
        return Admin.desdeFila(fila)


def obtenAdminPorNombre(nombreAdmin):
    """Obtiene un admin dado un nombre"""
    sql = "select * from admins where nombre = %s limit 1"
    data = nombreAdmin
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return None
    else:
        fila = filas[0]
        return Admin.desdeFila(fila)


def existeAdmin(admin):
    """Comprueba si existe el admin con base al nombre"""
    sql = "select * from admins where nombre = %s limit 1"
    data = admin.nombre
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return False
    else:
        return True


def creaAdmin(admin):
    """Crea un admin y lo devuelve si sale bien o None si no"""
    sql = "insert into admins values(%s, %s, %s, %s, %s, %s)"
    data = (admin.idAdmin, admin.nombre, admin.area, admin.correo, admin.clave, admin.esRevisor)
    executeStatement(sql, data)
    return obtenAdminPorNombre(admin.nombre)


def eliminaAdmin(idAdmin):
    """Elimina un admin dado su id"""
    sql = "delete from admins where idAdmin = %s"
    data = idAdmin
    executeStatement(sql, data)


def obtenAdmins(nombreAdmin):
    """Obtiene todos los admins"""
    sql = "select * from admins where nombre != %s"
    data = nombreAdmin
    filas = executeQueryWithData(sql, data)
    admins = []
    for fila in filas:
        admins.append(Admin.desdeFila(fila).serialize)
    return admins


def modificaAdmin(admin):
    """Modifica un admin"""
    if len(admin.clave) > 0:
        sql = 'update admins set nombre=%s, area=%s, correo=%s, clave=%s, esRevisor=%s where idAdmin=%s'
        data = (admin.nombre, admin.area, admin.correo, admin.clave, admin.esRevisor, admin.idAdmin)
    elif len(admin.clave) == 0:
        sql = 'update admins set nombre=%s, area=%s, correo=%s, esRevisor=%s where idAdmin=%s'
        data = (admin.nombre, admin.area, admin.correo, admin.esRevisor, admin.idAdmin)
    executeStatement(sql, data)