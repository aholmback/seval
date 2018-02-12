import random
from itertools import permutations

class Voxel:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
        self.vector = tuple(self)

    def rotate(self, x, y, z):
        return Voxel(self[x], self[y], self[z])

    def __hash__(self):
        return hash(self.vector)

    def __eq__(self, other):
        return self.vector == other.vector

    def __getitem__(self, key):
        return [self.x, self.y, self.z][key]

    def __add__(self, other):
        return Voxel(*[a + b for a, b in zip(self, other)])

    def __sub__(self, other):
        return Voxel(*[a - b for a, b in zip(self, other)])
    
    def __matmul__(self, m):
        return Voxel(*[sum(m[j][i] * e for i, e in enumerate(self.vector)) for j in range(3)])

    def __iter__(self):
        return iter([self.x, self.y, self.z])

    def __str__(self):
        return str(self.vector)

    def __repr__(self):
        return repr(self.vector)


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
        self.size = Voxel(1, 1, 1)
        self._voxels = [ Voxel(0, 0, 0) ]
        self.voxels = frozenset(self._voxels)

        self._configure(config)
        self._normalize()

        # Update size
        for v in self._voxels:
            self.size = Voxel(
                    max(self.size[0], v[0] + 1),
                    max(self.size[1], v[1] + 1),
                    max(self.size[2], v[2] + 1))


    def _configure(self, config):
        for d in config:
            k = list(d)[0]
            self._move(k, d[k])

    def _move(self, direction, steps):
        if direction in self.DIRECTIONS:
            vector = self.DIRECTIONS[direction]

        for i in range(0, steps):
            self._voxels.append(Voxel(*[a + b for a, b in zip(vector, self._voxels[-1])]))

        self.voxels = frozenset(self._voxels)

    def _transform(self, matrix):
        for i, v in enumerate(self._voxels):
            self._voxels[i] @= matrix

        self._transpose(self._to_origin())

    def _to_origin(self):
        to_origin = self._voxels[0]
        for voxel in self._voxels:
            to_origin = Voxel(*[min(a, b) for a, b in zip(to_origin, voxel)])

        return to_origin

    def _transpose(self, by):
        for i, voxel in enumerate(self._voxels):
            self._voxels[i] -= by

        self.voxels = frozenset(self._voxels)

    def _normalize(self):
        # x-axis π/2
        rx = [ [1, 0, 0], [0, 0, -1], [0, 1, 0] ]

        # y-axis π/2
        ry = [ [0, 0, 1], [0, 1, 0], [-1, 0, 0] ]

        # z-axis π/2
        rz = [ [0, -1, 0], [1, 0, 0], [0, 0, 1] ]

        _hash = hash(self)
        _voxels = self.voxels.copy()

        for r in range(24):
            self._transform(rz)
            if r % 4 == 0:
                if r % 8 == 0:
                    self._transform(rx)
                else:
                    self._transform(ry)

            if _hash > hash(self):
                _hash = hash(self)
                _voxels = self.voxels.copy()

        self.voxels = _voxels

    def __hash__(self):
        return hash(self.voxels)
