
class AlumnoPreRegistro:
    def __init__(self, noControl, clave):
        self.noControl = noControl
        self.clave = clave

    @classmethod
    def desdeFila(cls, fila):
        return cls(
            fila['noControl'],
            fila['clave']
        )

    @property
    def serialize(self):
        return {
            'noControl': self.noControl
        }