from flask import jsonify, request

from Controladores import ControladorPokemon
from Modelos.Pokemon import Pokemon
from sigess import app


@app.route('/pokemons')
def pokemons():
    pokemons = ControladorPokemon.getAllPokemons()
    resp = jsonify(pokemons)
    resp.status_code = 200
    return resp


@app.route('/regiones')
def regiones():
    regiones = ControladorPokemon.getAllRegiones()
    resp = jsonify(regiones)
    resp.status_code = 200
    return resp


@app.route('/pokemonesregiones')
def pokemonesregiones():
    pokemonesRegiones = ControladorPokemon.getAllPokemonesRegiones()
    resp = jsonify(pokemonesRegiones)
    resp.status_code = 200
    return resp


@app.route('/pokemons/<idPokemon>')
def pokemonPorID(idPokemon):
    # Obtiene el pokemon deacuerdo al nombre
    pokemon = ControladorPokemon.getPokemonById(idPokemon)
    # Los asigna como valor de respuesta
    resp = jsonify(pokemon)
    resp.status_code = 200
    return resp


@app.route('/pokemons/agrega', methods=['POST'])
def agregaPokemon():
    # Obtiene los datos de la petición
    json = request.json
    # Comienza try por si algo malo pasa
    try:
        # Crea un pokemon
        # El constructor arroja exepciones si se ingresan datos no válidos
        pokemon = Pokemon(
            json.get('nombre', "NombrePorDefecto"),
            json.get('imagen', "ImagenPorDefecto"),
            json.get('nivel', "1"),
            json.get('sexo', "F"),
        )

        ControladorPokemon.addPokemon(pokemon)

        # Si sailó bien, prepara la respuesta buena
        resp = jsonify(pokemon)
    # Si algo salió mal, en la respuesta se pone el error
    except Exception as error:
        resp = jsonify("Error: " + str(error))
    # Define el código de respuesta como OK
    resp.status_code = 200
    return resp


@app.route('/pokemons/actualiza/<_nombre>,<_imagen>,<_nivel>,<_sexo>', methods=['PUT'])
def actualizaPokemon(_nombre, _imagen, _nivel, _sexo):
    # Obtiene los datos
    _json = request.json
    # Verificacion a un error
    try:
        pokemon = Pokemon(_nombre, _imagen, _nivel, _sexo)
        ControladorPokemon.updatePokemon(pokemon)
        # Si salio bien, se prepara la respuesta
        resp = jsonify(_nombre + ' fue actualizado correctamente')
    # Si algo salió mal, en la respuesta se pone el error
    except Exception as e:
        resp = jsonify("Error: " + str(e))
    # Define el codigo de respuesta
    resp.status_code = 200
    return resp


@app.route('/pokemons/borra', methods=['DELETE'])
def borraPokemon():
    _json = request.json
    try:
        _nombre = _json['nombre']
        ControladorPokemon.deletePokemon(_nombre)
        resp = jsonify('Pokemon deleted successfully!')
    except Exception as e:
        resp = jsonify("Error: " + str(e))
    resp.status_code = 200
    return resp
