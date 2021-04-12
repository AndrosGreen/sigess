from flask_login import login_required

from sigess import app


@app.route('/requisitos/crea', methods=['POST'])
@login_required
def creaRequisito():
    json = request.json
   
    try:
        
        requisito = Requisito(
            json.get('nombre', "NombrePorDefecto"),
            json.get('revisadoPor', "1"),
            json.get('detalleARevisar', "Sin detalles"),          
        )

        ControladorRequisitos.crearRequisito(requisito)

        # Si sailó bien, prepara la respuesta buena
        resp = jsonify(requisito)
    # Si algo salió mal, en la respuesta se pone el error
    except Exception as error:
        resp = jsonify("Error: " + str(error))
    # Define el código de respuesta como OK
    resp.status_code = 200
    return resp


@app.route('/requisitos/elimina', methods=['POST'])
@login_required
def eliminaRequisito():
    _json = request.json
    try:
        _id = _json['idRequisito']
        ControladorRequisitos.eliminarRequisito(_id)
        resp = jsonify('Requisito deleted successfully!')
    except Exception as e:
        resp = jsonify("Error: " + str(e))
    resp.status_code = 200
    return resp


@app.route('/requisitos/obtenerUno', methods=['POST'])
@login_required
def obtenerRequisito():
    _json = request.json
    try:
        _id = _json['idREQUISITO']
        ControladorRequisito.obtenerRequisito(_id)
        resp = ControladorRequisito.obtenerRequisito(_id)
    except Exception as e:
        resp = jsonify("Error: " + str(e))
    resp.status_code = 200
    return resp