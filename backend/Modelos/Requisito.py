class Requisito:
    def __init__(self, idREQUISITO, nombre, revisadoPor, detalleARevisar):        
        self.idREQUISITO = idREQUISITO
        self.nombre = nombre 
	self.revisadoPor = revisadoPor 
	self.detalleARevisar = detalleARevisar      
        

    @property
    def serialize(self):
        return {
            'idREQUISITO': self.idREQUISITO,
            'nombre': self.nombre,
            'revisadoPor': self.revisadoPor,
	    'detalleARevisar': self.detalleARevisar,            
        }