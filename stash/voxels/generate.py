from utils import Vector

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

    def __init__(self, config):
        self._voxels = [ Vector([0, 0, 0]) ]
        self.voxels = set(self._voxels)

        self._configure(config)
        self._normalize()

    def _configure(self, config):
        for d in config:
            k = list(d)[0]
            self._move(k, d[k])

    def _move(self, direction, steps):
        direction = self.DIRECTIONS.get(direction, direction)

        for i in range(0, steps):
            self._voxels.append(Vector(direction) + self._voxels[-1])

        self._transpose(self._to_origin())

    def _transform(self, matrix):
        for i, v in enumerate(self._voxels):
            self._voxels[i] @= matrix

        self._transpose(self._to_origin())

    def _to_origin(self):
        to_origin = self._voxels[0]
        for voxel in self._voxels:
            to_origin = Vector([min(a, b) for a, b in zip(to_origin, voxel)])

        return to_origin

    def _transpose(self, by):
        for i, voxel in enumerate(self._voxels):
            self._voxels[i] -= by

        self.voxels = set(self._voxels)

    def _normalize(self):
        # Rotate π/2
        rx, ry, rz = (
                [ [1, 0, 0], [0, 0, -1], [0, 1, 0] ],
                [ [0, 0, 1], [0, 1, 0], [-1, 0, 0] ],
                [ [0, -1, 0], [1, 0, 0], [0, 0, 1] ],
                )

        voxels = sorted(self.voxels)

        for r in range(24):
            self._transform(rz)

            if r % 8 == 0:
                self._transform(rx)
            if r % 8 == 4:
                self._transform(ry)

            voxels = min(voxels, sorted(self.voxels))

        self.voxels = set(voxels)
