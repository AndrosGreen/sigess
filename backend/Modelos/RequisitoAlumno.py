class RequisitoAlumno:
    def __init__(self, Requisito, Alumno, cumple):
        self.Requisito = Requisito
        self.Alumno = Alumno
	self.cumple = cumple
        

    @property
    def serialize(self):
        return {
            'Requisito': self.Requisito.serialize,
            'Alumno': self.Alumno.serialize,          
        }


