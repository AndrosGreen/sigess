class Region(object):
    def __init__(self, idRegion, nombre):
        self.idRegion = idRegion
        self.nombre = nombre


    @property
    def serialize(self):
        return {
            'idRegion': self.idRegion,
            'nombre': self.nombre
        }
