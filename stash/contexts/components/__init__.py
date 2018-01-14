import importlib


def get(name):
    return importlib.import_module(
            '.components.' + name.replace('/', '.'),
            package='contexts',
            )
