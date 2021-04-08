from flaskext.mysql import MySQL
import pymysql
import os

from sigess import app

mysql = MySQL()
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = os.environ.get("DB_USER")
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ.get("DB_PASSWORD")
app.config['MYSQL_DATABASE_DB'] = os.environ.get("DB_DATABASE")
app.config['MYSQL_DATABASE_HOST'] = os.environ.get("DB_HOST")
mysql.init_app(app)

mysql = MySQL()
mysql.init_app(app)


# Devuelve las filas consultadas
def executeQueryWithData(sql, data):
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql, data)
        rows = cursor.fetchall()
        return rows
    except Exception as e:
        raise e


def executeQuery(sql):
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql)
        rows = cursor.fetchall()
        return rows
    except Exception as e:
        raise e


# Ejecuta una operación que no sea de tipo query
def executeStatement(sql, data):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        return True
    except Exception as e:
        raise e
