class Requisito:
    def __init__(self, idREQUISITO, nombre, revisadoPor, detalleARevisar):        
        self.idREQUISITO = idREQUISITO
        self.nombre = nombre
        self.revisadoPor = revisadoPor
        self.detalleARevisar = detalleARevisar

    @classmethod
    def desdeFila(cls, fila):
        return cls(
            fila['idREQUISITO'],
            fila['nombre'],
            fila['revisadoPor'],
            fila['detalleARevisar']
        )

    @property
    def serialize(self):
        return {
            'idREQUISITO': self.idREQUISITO,
            'nombre': self.nombre,
            'revisadoPor': self.revisadoPor,
	    'detalleARevisar': self.detalleARevisar,            
        }