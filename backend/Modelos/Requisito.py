class Requisito:
    """Representa un requisito"""
    def __init__(self, idRequisito, nombre, revisadoPor, detalleARevisar):
        self.idRequisito = idRequisito
        self.nombre = nombre
        self.revisadoPor = revisadoPor
        self.detalleARevisar = detalleARevisar

    @classmethod
    def desdeFila(cls, fila):
        return cls(
            fila['idRequisito'],
            fila['nombre'],
            fila.get('revisadoPor', ""),
            fila['detalleARevisar']
        )

    @property
    def serialize(self):
        return {
            'idRequisito': self.idRequisito,
            'nombre': self.nombre,
            'revisadoPor': self.revisadoPor,
            'detalleARevisar': self.detalleARevisar,
        }
