from Modelos.Admin import Admin
from sigess.db import executeStatement, executeQueryWithData, executeQuery


def obtenAdminPorID(idAdmin):
    """Obtiene un admin dado un id
    Args:
        idAdmin: El id del admin a obtener
    """
    sql = "select * from admins where idAdmin = %s limit 1"
    data = idAdmin
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return None
    else:
        fila = filas[0]
        return Admin.desdeFila(fila)


def obtenAdminPorNombre(nombreAdmin):
    """Obtiene un admin dado un nombre
    Args:
        nombreAdmin: El nombre del admin a obtener
    """
    sql = "select * from admins where nombre = %s limit 1"
    data = nombreAdmin
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return None
    else:
        fila = filas[0]
        return Admin.desdeFila(fila)


def existeAdmin(admin):
    """Comprueba si existe el admin con base al nombre
    Args:
        admin: El objeto admin a comprobar si existe basado en el nombre
    """
    sql = "select * from admins where nombre = %s limit 1"
    data = admin.nombre
    filas = executeQueryWithData(sql, data)
    if len(filas) == 0:
        return False
    else:
        return True


def creaAdmin(admin):
    """Crea un admin y lo devuelve si sale bien o None si no
    Args:
        admin: El objeto admin a crear en la base
    """
    sql = "insert into admins values(%s, %s, %s, %s, md5(%s), %s)"
    data = (admin.idAdmin, admin.nombre, admin.area, admin.correo, admin.clave, admin.esRevisor)
    executeStatement(sql, data)
    return obtenAdminPorNombre(admin.nombre)


def eliminaAdmin(idAdmin):
    """Elimina un admin dado su id
    Args:
        idAdmin: El id del admin a eliminar
    """
    sql = "delete from admins where idAdmin = %s"
    data = idAdmin
    executeStatement(sql, data)


def obtenAdmins(nombreAdmin):
    """Obtiene todos los admins excepto el actual
    Args:
        nombreAdmin: El nombre del admin a ignorar
    """
    sql = "select * from admins where nombre != %s"
    data = nombreAdmin
    filas = executeQueryWithData(sql, data)
    admins = []
    for fila in filas:
        admins.append(Admin.desdeFila(fila).serialize)
    return admins


def modificaAdmin(admin):
    """Modifica un admin
    Args:
        admin: El objeto admin a actualizar en la base con base a su id
    """
    if len(admin.clave) > 0:
        sql = 'update admins set nombre=%s, area=%s, correo=%s, clave=md5(%s), esRevisor=%s where idAdmin=%s'
        data = (admin.nombre, admin.area, admin.correo, admin.clave, admin.esRevisor, admin.idAdmin)
    elif len(admin.clave) == 0:
        sql = 'update admins set nombre=%s, area=%s, correo=%s, esRevisor=%s where idAdmin=%s'
        data = (admin.nombre, admin.area, admin.correo, admin.esRevisor, admin.idAdmin)
    executeStatement(sql, data)


def existeAdminPorID(idAdmin):
    """Consulta si un admin existe dado su id
    Args:
        idAdmin: El id del admin a comprobar su existencia
    """
    sql = "select count(*) as cuenta from admins where idAdmin=%s"
    data = idAdmin
    filas = executeQueryWithData(sql, data)
    fila = filas[0]
    existe = True if fila["cuenta"] == 1 else False
    return existe


def eliminaAdminPorID(admin):
    """Elimina el admin provisto
    Args:
        admin: EL objeto admin a eliminar con base a su id
    """
    if not admin.esRevisor:
        return
    sql = "delete from admins where idAdmin=%s"
    data = admin.idAdmin
    executeStatement(sql, data)


def obtenerAdminsSinRequisito():
    """Obtiene una lista de admins/revisores que no tengan requisito asignado"""
    sql = "select a.* from admins a " \
          "left join requisitos r on a.idAdmin = r.revisadoPor " \
          "where r.idRequisito is null " \
          "and a.esRevisor='T';"
    admins = []
    filas = executeQuery(sql)
    for fila in filas:
        admins.append(Admin.desdeFila(fila))
    return admins
