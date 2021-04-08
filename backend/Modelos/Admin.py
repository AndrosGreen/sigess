class Admin:
    def __init__(self, idAdmin, nombre, area, correo, clave):
        self.idAdmin = idAdmin
        self.nombre = nombre
        self.area = area
        self.correo = correo
        self.clave = clave

    @property
    def serialize(self):
        return {
            "idAdmin": self.idAdmin,
            "nombre": self.nombre,
            "area": self.area,
            "correo": self.correo,
            "clave": self.clave
        }
