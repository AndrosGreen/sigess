class Alumno:
    def __init__(self, noControl, nombre, apPaterno,
                 apMaterno, correo, clave, telefono,
                 carrera, programa, encargado, institucion):
        self.noControl = noControl
        self.nombre = nombre
        self.apPaterno = apPaterno
        self.apMaterno = apMaterno
        self.correo = correo
        self.clave = clave
        self.telefono = telefono
        self.carrera = carrera
        self.programa = programa
        self.encargado = encargado
        self.institucion = institucion

    @classmethod
    def desdeFila(cls, fila):
        return cls(
            fila['noControl'],
            fila['nombre'],
            fila['apPaterno'],
            fila['apMaterno'],
            fila['correo'],
            fila['clave'],
            fila['telefono'],
            fila['carrera'],
            fila['programa'],
            fila['encargado'],
            fila['institucion']
        )

    @property
    def serialize(self):
        return {
            'noControl': self.noControl,
            'nombre': self.nombre,
            'apPaterno': self.apPaterno,
            'apMaterno': self.apMaterno,
            'correo': self.correo,
            'clave': self.clave,
            'carrera': self.carrera,
            'programa': self.programa,
            'encargado': self.encargado,
            'institucion': self.institucion,
        }
