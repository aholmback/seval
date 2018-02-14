import unittest
import json
import math
from generate import Tube
from utils import Vector

class TubeTest(unittest.TestCase):
    def get_tube(self, config):
        t = Tube()

        for d in config:
            k = list(d)[0]
            t.build(k, d[k])

        return t

    def test_init(self):
        t = self.get_tube({})
        self.assertEqual(t.vectors(), [ Vector([0, 0, 0]) ])

    def test_vector_rotate(self):
        v = Vector([0, 1, 2])
        v = v.rotated(math.pi, 0, math.pi/2).integer()

        self.assertEqual(v, (1, 0, -2))

    def test_get_vectors(self):
        t = self.get_tube([
            { Tube.IN: 1 },
            { Tube.RIGHT: 1 },
            { Tube.OUT: 1 },
            ])

        result = [
                (0, 0, 0),
                (0, 0, 1),
                (0, 1, 0),
                (0, 1, 1),
                ]
        vectors = t.vectors()

        self.assertEqual(vectors, result)

    def test_coordinates(self):
        t = self.get_tube([
            { Tube.IN: 1 },
            { Tube.RIGHT: 1 },
            { Tube.OUT: 1 },
            { Tube.DOWN: 1 },
            { Tube.IN: 1 },
            { Tube.LEFT: 1 },
            { Tube.OUT: 1 },
            ])

        result = [
                (0, 0, 0),
                (0, 0, 1),
                (0, 1, 0),
                (0, 1, 1),
                (1, 0, 0),
                (1, 0, 1),
                (1, 1, 0),
                (1, 1, 1),
                ]

        self.assertEqual(t.vectors(), result)

    def test_transpose(self):
        t1 = self.get_tube([
            { Tube.LEFT: 2 },
            ])

        t2 = self.get_tube([
            { Tube.RIGHT: 2 },
            ])

        self.assertEqual(t1.vectors(), t2.vectors())

    def test_eliminate_redundant_voxels(self):
        t1 = self.get_tube([
            { Tube.LEFT: 2 },
            { Tube.RIGHT: 2 },
            ])

        t2 = self.get_tube([
            { Tube.LEFT: 2 },
            ])

        self.assertEqual(t1.vectors(), t2.vectors())

    def test_unique_shape_1(self):
        t1 = self.get_tube([
            { Tube.LEFT: 2 },
            { Tube.UP: 2 },
            ])

        t2 = self.get_tube([
            { Tube.RIGHT: 2 },
            { Tube.DOWN: 2 },
            ])

        self.assertEqual(t1.vectors(), t2.vectors())

    def test_unique_shape_2(self):
        t1 = self.get_tube([
            { Tube.LEFT: 1 },
            { Tube.UP: 1 },
            ])

        t2 = self.get_tube([
            { Tube.RIGHT: 1 },
            { Tube.UP: 1 },
            ])

        self.assertEqual(t1.vectors(), t2.vectors())

    def test_unique_shape_3(self):
        t1 = self.get_tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            ])

        t2 = self.get_tube([
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 1 },
            ])

        self.assertNotEqual(t1.vectors(), t2.vectors())

    def test_unique_shape_4(self):
        t1 = self.get_tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 2 },
            ])

        t2 = self.get_tube([
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        self.assertEqual(t1.vectors(), t2.vectors())

    def test_unique_shape_5(self):
        t1 = self.get_tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        t2 = self.get_tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        self.assertEqual(t1.vectors(), t2.vectors())

    def test_json(self):
        t = self.get_tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        voxels = json.loads(json.dumps([list(v) for v in t.vectors()]))

        self.assertEqual([list(v) for v in t.vectors()], voxels)

if __name__ == '__main__':
    unittest.main()
