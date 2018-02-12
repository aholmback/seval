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

    t = Tube(config)

    return HttpResponse(
            json.dumps({
                'data': {
                    'voxels': [list(v.vector) for v in t.voxels],
                    'hash': hash(t),
                    }}),
            content_type='application/json',
            )
