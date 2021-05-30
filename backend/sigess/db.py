from flaskext.mysql import MySQL
import pymysql
import os

from sigess import app


"""Incluye lo necesario para conectarse a a base de datos"""
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = os.environ.get("DB_USER")
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ.get("DB_PASSWORD")
app.config['MYSQL_DATABASE_DB'] = os.environ.get("DB_DATABASE")
app.config['MYSQL_DATABASE_HOST'] = os.environ.get("DB_HOST")
mysql.init_app(app)

mysql = MySQL()
mysql.init_app(app)


def executeQueryWithData(sql, data):
    """Ejecuta una query con datos de entrada
    Args:
        sql: La consulta a ejecutar
        data: Los datos a adjuntar en la consulta
    """
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql, data)
        rows = cursor.fetchall()
        return rows
    except Exception as e:
        raise e


def executeQuery(sql):
    """Ejecuta una consulta sql y devuelve el resultado
    Args:
        sql: La consulta a ejecutar
    """
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql)
        rows = cursor.fetchall()
        return rows
    except Exception as e:
        raise e


def executeStatement(sql, data):
    """Ejecuta operaciones que no devuelvan valor usando datos parametrizados
    Args:
        sql: La consulta a ejecutar
        data: Los parámetros a incluir en la consulta
    """
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        return True
    except Exception as e:
        raise e
