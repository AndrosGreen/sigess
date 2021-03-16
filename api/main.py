import pymysql
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request
# from werkzeug import generate_password_hash, check_password_hash

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web', 
        'done': False
    }
]

@app.route('/',methods=['GET'])
def api():
    return jsonify({'tasks:':tasks})

@app.route('/peliculas')
def peliculas():
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("select * from pelicula")
    rows = cursor.fetchall()
    resp = jsonify(rows)
    resp.status_code = 200
    return resp

@app.route('/pelicula/<int:id>')
def pelicula(id):
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM pelicula WHERE idPelicula = %s", id)
    row = cursor.fetchone()
    resp = jsonify(row)
    resp.status_code = 200
    return resp

@app.route('/add',methods=['POST'])
def add_movie():
    _json = request.json
    _nombre = _json['nombre']
    _rating = _json['rating']
    sql = "insert into pelicula values (null,%s,%s);"
    data = (_nombre,_rating)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(sql,data)
    conn.commit()
    resp = jsonify('Movie added succesfully!')
    resp.status_code = 200
    return resp

@app.route('/update', methods=['POST'])
def update():
    _json = request.json
    _idPelicula = _json['idPelicula']
    _nombre = _json['nombre']
    _rating = _json['rating']
    sql = "Update pelicula set nombre = %s , rating = %s where idPelicula = %s;"
    data = (_nombre,_rating,_idPelicula)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(sql,data)
    conn.commit()
    resp = jsonify('Movie updated succesfully!')
    resp.status_code = 200
    return resp

@app.route('/delete/<int:id>')
def delete(id):
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("delete from pelicula where idPelicula = %s",id)
    conn.commit()
    resp = jsonify('Movie deleted successfully!')
    resp.status_code = 200
    return resp

if __name__ == "__main__":
    app.run()