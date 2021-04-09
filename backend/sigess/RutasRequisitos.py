from flask_login import login_required

from sigess import app


@app.route('/requisitos/crea')
@login_required
def creaRequisito():
    # TODO Pancho
    pass


@app.route('/requisitos/elimina')
@login_required
def eliminaRequisito():
    # TODO Pancho
    pass


@app.route('/requisitos/obtenerUno')
@login_required
def obtenerRequisito():
    # TODO Pancho
    pass