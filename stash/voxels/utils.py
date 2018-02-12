class Vector(tuple):
    def __add__(self, other):
        return Vector([a + b for a, b in zip(self, other)])

    def __sub__(self, other):
        return Vector([a - b for a, b in zip(self, other)])
    
    def __matmul__(self, m):
        return Vector([sum(m[j][i] * e for i, e in enumerate(self)) for j in range(3)])
