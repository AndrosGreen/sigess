from flask_login import UserMixin


# El usuario es una abstracción de un alumno o admin
# para reconocer de manera rápida en operaciones que requieran discernir
# Hereda de UserMixin para poder usarse en login y logout
class Usuario(UserMixin):
    def __init__(self, usuario, clave, nivelDePermisos):
        self.usuario = usuario
        self.clave = clave
        self.nivelDePermisos = nivelDePermisos  # 1-> Alumnos, 2->Revisores, 3->Super admin
        self.id = usuario  # El id para el UserMixin

    @classmethod
    def alumnoDedeFila(cls, fila):
        return Usuario(fila['noControl'], fila['clave'], 1)

    @classmethod
    def adminDesdeFila(cls, fila):
        if fila['esRevisor'] == 'F':
            nivelDePermisos = 3
        elif fila['esRevisor'] == 'T':
            nivelDePermisos = 2
        return Usuario(fila['nombre'], fila['clave'], nivelDePermisos)

    @property
    def serialize(self):
        return {
            'usuario': self.usuario,
            'nivelDePermisos': self.nivelDePermisos
        }
