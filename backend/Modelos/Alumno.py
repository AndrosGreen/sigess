class Alumno:
    def __init__(self, noControl, nombre, apPaterno, apMaterno, correo, clave, carrera, programa, encargado, empresa):
        self.noControl = noControl
        self.nombre = nombre
        self.apPaterno = apPaterno
        self.apMaterno = apMaterno
        self.correo = correo
        self.clave = clave
        self.carrera = carrera
        self.programa = programa
        self.encargado = encargado
        self.empresa = empresa

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
            'empresa': self.empresa,
        }
