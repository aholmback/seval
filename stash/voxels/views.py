from django.http import HttpResponse
import json
import random
from .generate import Tube

def white(request):
    voxels = []
    for x in range(0, 4):
        for y in range(0, 4):
            for z in range(0, 4):
                if random.randint(0, 1):
                    voxels.append([x, y, z])

    return HttpResponse(
            json.dumps(voxels),
            content_type='application/json',
            )

def tube(request):
    size = 12
    config = []

    while size > 0:
        steps = random.randint(1, 4)
        config.append(
                { random.choice(list(Tube.DIRECTIONS)): steps }
                )
        size -= steps

    t = Tube()

    for d in config:
        k = list(d)[0]
        t.build(k, d[k])

    return HttpResponse(
            json.dumps({
                'data': {
                    'vectors': t.vectors(),
                    }}),
            content_type='application/json',
            )
