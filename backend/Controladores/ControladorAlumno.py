from sigess.db import executeStatement


def creaAlumno(data):
    sql = "insert into alumnospreregistro values(%s, %s)"
    sqlData = (data['noControl'], data['clave'])
    executeStatement(sql, sqlData)
    pass


def eliminaAlumno():
    # TODO Dani
    pass


def preRegistraAlumno():
    # TODO Dani
    pass