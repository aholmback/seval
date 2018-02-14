import math

class Vector(tuple):
    def rotated(self, rx, ry, rz):
        return Vector(
                self @
                [ [1, 0, 0], [0, math.cos(rx), -math.sin(rx)], [0, math.sin(rx), math.cos(rx)] ] @
                [ [math.cos(ry), 0, math.sin(ry)], [0, 1, 0], [-math.sin(ry), 0, math.cos(ry)] ] @
                [ [math.cos(rz), -math.sin(rz), 0], [math.sin(rz), math.cos(rz), 0], [0, 0, 1] ]
                )

    def integer(self):
        return Vector(map(round, self))

    def minimum(*vectors):
        return Vector([min(*elements) for elements in zip(*vectors)])

    def __add__(self, other):
        return Vector([a + b for a, b in zip(self, other)])

    def __sub__(self, other):
        return Vector([a - b for a, b in zip(self, other)])
    
    def __matmul__(self, m):
        return Vector([sum(m[j][i] * e for i, e in enumerate(self)) for j in range(3)])
