import math
from .utils import Vector

class Tube:

    RIGHT = 'right'
    LEFT = 'left'
    UP = 'up'
    DOWN = 'down'
    IN = 'in'
    OUT = 'out'

    DIRECTIONS = {
            RIGHT: (1, 0, 0),
            LEFT: (-1, 0, 0),
            UP: (0, -1, 0),
            DOWN: (0, 1, 0),
            IN: (0, 0, 1),
            OUT: (0, 0, -1),
            }

    def __init__(self):
        self._voxels = [ Vector([0, 0, 0]) ]

    def build(self, direction, steps):
        direction = self.DIRECTIONS.get(direction, direction)

        for i in range(0, steps):
            self._voxels.append(Vector(direction) + self._voxels[-1])

    def vectors(self):
        normalized_vectors = None
        right_angle = math.pi / 2
        
        for r in range(24):
            rz = r * right_angle
            rx = r // 8 * right_angle
            ry = (r + 4) // 8 * right_angle

            # Rotate, round, transpose so top-left-in is in origin, remove redundant vectors and sort.
            vectors = [v.rotated(rx, ry, rz).integer() for v in self._voxels]
            to_origin = vectors[0].minimum(*vectors)
            vectors = sorted(set([vector - to_origin for vector in vectors]))

            # Find lowest possible rotation
            normalized_vectors = min(vectors, normalized_vectors or vectors)

        return normalized_vectors
