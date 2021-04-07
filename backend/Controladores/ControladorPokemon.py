from Modelos.Pokemon import Pokemon
from Modelos.PokemonRegion import PokemonRegion
from Modelos.Region import Region
from sigess.db import executeQuery, executeStatement


def getAllPokemons():
    rows = executeQuery("select * from pokemons")
    return rows  # Ya tiene los datos del pokemon


def getPokemonById(id):
    rows = executeQuery("select * from pokemons where nombre = '{0}'".format(id))
    row = rows[0]
    return row #Ya tiene los datos del pokemon


def getAllRegiones():
    rows = executeQuery("select * from regiones")
    return rows  # Ya tiene los datos del pokemon


def getAllPokemonesRegiones():
    query = "select p.*, r.* from pokemons p "
    query += "join pokemonregion pr on p.nombre=pr.idPokemon "
    query += "join regiones r on pr.idRegion=r.idRegion"
    rows = executeQuery(query)
    result = []
    for row in rows:
        pokemon = Pokemon(row['nombre'], row['imagen'], row['nivel'], row['sexo'])
        region = Region(row['idRegion'], row['r.nombre'])
        pokemonRegion = PokemonRegion(pokemon, region)
        result.append(pokemonRegion.serialize)
    return result


def addPokemon(pokemon):
    try:
        # Prepara el sql con comodines, (el procedimiento los asigna automáticamente)
        sql = "insert into pokemons values (%s,%s,%s,%s);"
        # Pone los datos que reemplazarán los comodines, deben estar dentro del paréntesis
        data = (pokemon.nombre, pokemon.imagen, pokemon.nivel, pokemon.sexo)
        # Y ejecuta la operación
        executeStatement(sql, data)
    except Exception as error:
        raise error

def updatePokemon(pokemon):
    try:
        sql = "update pokemons set imagen = %s, nivel = %s, sexo = %s where nombre = %s;"
        # asinga los datos que se remplazaran en la consulta
        data = (pokemon.imagen, pokemon.nivel, pokemon.sexo, pokemon.nombre)
        # Ejecuta la operacion
        executeStatement(sql, data)
    except Exception as error:
        raise error


def deletePokemon(pokemonName):
    try:
        sql = "delete from pokemons where nombre = %s;"
        data = pokemonName
        executeStatement(sql, data)
    except Exception as error:
        raise error