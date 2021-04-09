class Admin:
    def __init__(self, idAdmin, nombre, area, correo, clave, esRevisor):
        self.idAdmin = idAdmin
        self.nombre = nombre
        self.area = area
        self.correo = correo
        self.clave = clave
        self.esRevisor = esRevisor

    @classmethod
    def desdeFila(cls, fila):
        return cls(
            fila['idAdmin'],
            fila['nombre'],
            fila['area'],
            fila['correo'],
            fila['clave'],
            fila['esRevisor']
        )

    @property
    def serialize(self):
        return {
            "idAdmin": self.idAdmin,
            "nombre": self.nombre,
            "area": self.area,
            "correo": self.correo,
            # "clave": self.clave,
            "esRevisor": self.esRevisor
        }
