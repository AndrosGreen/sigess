from flask_login import UserMixin


# El usuario es una abstracción de un alumno o admin
# para reconocer de manera rápida en operaciones que requieran discernir
# Hereda de UserMixin para poder usarse en login y logout
class Usuario(UserMixin):
    def __init__(self, user, passw, isAdmin):
        self.user = user
        self.passw = passw
        self.isAdmin = isAdmin
        self.id = user  # El id para el UserMixin


    @property
    def serialize(self):
        return {
            'user': self.user,
            'isAdmin': self.isAdmin
        }