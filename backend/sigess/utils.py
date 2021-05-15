from functools import wraps
from base64 import b64decode

from flask import make_response
from flask_login import current_user


def admin_required(func):
    """Decorador para las rutas que requieran que el usuario sea admin"""

    @wraps(func)
    def decorated_view(*args, **kwargs):
        if not current_user.nivelDePermisos == 3:
            return {
                'mensaje': 'No tiene permiso de super admin'
            }
        return func(*args, **kwargs)

    return decorated_view


def revisor_required(func):
    """Decorador para las rutas que requieran que el usuario sea revisor"""

    @wraps(func)
    def decorated_view(*args, **kwargs):
        if not current_user.nivelDePermisos == 2:
            return {
                'mensaje': 'No tiene permiso de revisor'
            }
        return func(*args, **kwargs)

    return decorated_view


def alumno_required(func):
    """Decorador para las rutas que requieran que el usuario sea alumno"""

    @wraps(func)
    def decorated_view(*args, **kwargs):
        if not current_user.nivelDePermisos == 1 and not current_user.nivelDePermisos == 0:
            return {
                'mensaje': 'No tiene permiso de alumno'
            }
        return func(*args, **kwargs)

    return decorated_view


def generaVistaPDF(b64):
    """
    Genera una respuesta para ver un archivo como pdf
    dadoa una cadena base64 como entrada
    """
    binario = b64decode(b64)
    respuesta = make_response(binario)
    respuesta.headers['Content-Type'] = 'application/pdf'
    return respuesta


def generaVistaPDFConTitulo(b64, titulo):
    """
    Genera una respuesta para ver un archivo como pdf
    dada una cadena base64 como entrada y un titulo
    """
    if b64 is None:
        return "Documento no encontrado"
    binario = b64decode(b64)
    respuesta = make_response(binario)
    respuesta.headers['Content-Type'] = 'application/pdf'
    respuesta.headers['Content-Disposition'] = 'inline; filename=%s.pdf' % titulo
    return respuesta
