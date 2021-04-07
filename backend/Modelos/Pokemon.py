class Pokemon(object):
    def __init__(self, nombre, imagen, nivel, sexo):
        self.nombre = nombre
        self.imagen = imagen
        self.nivel = nivel
        self.sexo = sexo

    @property
    def nombre(self):
        return self.__nombre

    @nombre.setter
    def nombre(self, value):
        self.validaNombre(value)
        self.__nombre = value

    @property
    def imagen(self):
        return self.__imagen

    @imagen.setter
    def imagen(self, value):
        self.validaImagen(value)
        self.__imagen = value

    @property
    def nivel(self):
        return self.__nivel

    @nivel.setter
    def nivel(self, value):
        self.validaNivel(value)
        self.__nivel = value

    @property
    def sexo(self):
        return self.__sexo

    @sexo.setter
    def sexo(self, value):
        self.validaSexo(value)
        self.__sexo = value

    def validaNombre(self, value):
        if len(value) == 0:
            raise Exception("Falta nombre")
        if len(value) > 20:
            raise Exception("La longitud del nombre debe ser entre 1 y 20 caracteres")

    def validaImagen(self, value):
        if len(value) == 0:
            raise Exception("Falta imagen")
        if len(value) > 100:
            raise Exception("La longitud de la imagen debe ser entre 1 y 100 caracteres")

    def validaNivel(self, value):
        if isinstance(value, str):
            value = int(value)
        if value < 0:
            raise Exception("El nivel debe ser mayor a 0")

    def validaSexo(self, value):
        if len(value) < 1:
            raise Exception("Falta sexo")
        if value != "M" and value != "F" and value != "b" and value != "B":
            raise Exception("Debe ser M o F")

    @property
    def serialize(self):
        return {
            'Nombre': self.nombre,
            'Imagen': self.imagen,
            'Nivel': self.nivel,
            'Sexo': self.sexo
        }
