class PokemonRegion(object):
    def __init__(self, pokemon, region):
        self.pokemon = pokemon
        self.region = region

    @property
    def serialize(self):
        return {
            'Pokemon': self.pokemon.serialize,
            'Region': self.region.serialize
        }
