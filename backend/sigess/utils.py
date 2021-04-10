from functools import wraps

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
        if not current_user.nivelDePermisos == 1:
            return {
                'mensaje': 'No tiene permiso de alumno'
            }
        return func(*args, **kwargs)

    return decorated_view
