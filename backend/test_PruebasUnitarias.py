# Correr pruebas unitarias dentro de la carpeta backend
# pytest -v

import pytest
from Modelos.Usuario import Usuario
from Modelos.Alumno import Alumno
from Modelos.Admin import Admin

from Controladores import ControladorUsuarios
from Controladores import ControladorAdmin
from Controladores import ControladorAlumnos
from Controladores import ControladorAsignaciones
from Controladores import ControladorRequisitos

#PRUEBAS UNITARIAS 
#Login de un usuario no registrado
def test_login():
    user = Usuario("S28120183","SGHEIA", 1)
    assert ControladorUsuarios.login(user) == False

#Obtener admin por is id
def test_AdminID():
    assert ControladorAdmin.obtenAdminPorID(1).nombre == "Jorge"

#Obtener admin sin tenerlo registrado
def test_sinAdminID():
    assert ControladorAdmin.obtenAdminPorID(3412) == None

#Existe administradores señalados
@pytest.mark.parametrize(
    "admin,expect",
    [
        (Admin(None, "Jorge", "Admin", "pidielpez@gmail.com", "JuasJuas", "F"), True),
        (Admin(None, "Vere", "Inglés", "idiomas@itsur.com", "1234", "T"), False)
    ]
)
def test_ExisteAdmin(admin, expect):
    assert ControladorAdmin.existeAdmin(admin) == expect

#Existe alumno registrado
def test_ExisteAlumno():
    alumno = Alumno('S18120183', 'Daniel', 'Cerna', 'Torres', 'cernadaniel32@gmail.com', 'a7663feb304a590308375cecaa54742b', '4451091780', 'Sistemas computacionales', 'Training dojo', 'Luis German Gutierrez Torres', 'ITSUR')
    assert ControladorAlumnos.existeAlumnoRegistrado(alumno) == True

#Mostar los requisitos de un alumno con los parametros requeridos
def test_requisitoAlumno():
    respuesta = [
        {
            "cumple": "P",
            "detalleARevisar": "Acreditado nivel 5",
            "idRequisito": 1,
            "nombre": "Ingles",
            "revisadoPor": 2
        }
    ]   
    assert ControladorRequisitos.listaRequisitosAlumno('S18120183') == respuesta

#Obtener nulo el resultado al obtener un requisito que no esta registrado
def test_ObtenerRequisitoNoRegistrado():
    assert ControladorRequisitos.obtenerRequisito(123) == None

#Obtener los requisitos y de esos buscar si se encuentran
def test_ObtenerRequisto():
    requisitos = ControladorRequisitos.listaRequisitos() 
    assert "Ingles" in {
        requisito["nombre"]
        for requisito in requisitos
    }

#Lista de los alumnos preregistro
def test_ObtenerAlumnosPre():
    alumnos = [
        { "noControl": "S18120160"}
    ]
    assert ControladorAlumnos.obtenerAlumnosPreRegistrados() == alumnos

#Eliminar un asignacion que no esta registrada
def test_eliminarAsignacion():
    assert ControladorAsignaciones.eliminaAsignacion(123) == None

#No obtener resultado al requerir un documento que no se encuentra
def test_documentos():
    assert ControladorAsignaciones.obtenerDocumentosEnAsignacion(100,100) == ()

