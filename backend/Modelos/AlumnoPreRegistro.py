
class AlumnoPreRegistro:
    """Representa un alumno del preregistro"""
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