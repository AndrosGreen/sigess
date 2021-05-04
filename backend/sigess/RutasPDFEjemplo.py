from flask import request

from Controladores import ControladorAsignaciones
from sigess import app, utils


@app.route('/pdf/<int:idDoc>')
def pdfTest(idDoc):
    archivo = ControladorAsignaciones.obtenerPDF(idDoc)
    pdf = utils.generaVistaPDF(archivo)
    return pdf


@app.route('/pdfUpload', methods=["POST"])
def pdfUpload():
    json = request.json
    nombre = json["nombre"]
    archivo = json["archivo"]
    ControladorAsignaciones.subirPDF(nombre, archivo)
    return {
        'mensaje': 'Archivo subido'
    }