import random
from itertools import permutations

class Voxel:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
        self.vector = tuple(self)

    def index(self, base):
        return self[0] * base[1] * base[2] + self[1] * base[2] + self[2]

    def rotate(self, x, y, z):
        return Voxel(self[x], self[y], self[z])

    def __hash__(self):
        return hash(self.vector)

    def __eq__(self, other):
        return self.vector == other.vector

    def __getitem__(self, key):
        return [self.x, self.y, self.z][key]

    def __list__(self):
        return list(self)

    def __add__(self, other):
        return Voxel(*[a + b for a, b in zip(self, other)])

    def __sub__(self, other):
        return Voxel(*[a - b for a, b in zip(self, other)])

    def __iter__(self):
        return iter([self.x, self.y, self.z])

    def __dict__(self):
        return self.vector.__dict__

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
        self.voxels = [ Voxel(0, 0, 0) ]

        self._configure(config)

        # Vector for top-left-out corner to origin
        to_origin = self.voxels[0]
        for voxel in self.voxels:
            to_origin = Voxel(*[min(a, b) for a, b in zip(to_origin, voxel)])

        # Move by vector ↖
        for i, voxel in enumerate(self.voxels):
            self.voxels[i] -= to_origin

        # Rotate to lowest hash
        self._rotate()

        # Remove redundant voxels and make collection unordered and hashable
        self.voxels = frozenset(self.voxels)

        # Update size
        for v in self.voxels:
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
            self.voxels.append(Voxel(*[a + b for a, b in zip(vector, self.voxels[-1])]))

    def _rotate(self):
        rotations = [(hash(frozenset([v.rotate(*p) for v in self.voxels])), p) for p in permutations(range(3))]
        rotations.sort(key=lambda r: r[0])

        _hash, rotation = rotations[0]

        self.voxels = [v.rotate(*rotation) for v in self.voxels]
        self.size = self.size.rotate(*rotation)

