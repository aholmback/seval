import importlib

def component(name):
    return importlib.import_module(
            '.components.' + name.replace('/', '.'),
            package='contexts',
            )
