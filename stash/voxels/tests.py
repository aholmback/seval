import unittest
from generate import Tube, Voxel
import json

class TubeTest(unittest.TestCase):
    def test_init(self):
        t = Tube({})
        self.assertEqual(t.voxels, frozenset([ Voxel(0, 0, 0) ]))

    def test_voxel_index(self):
        result = [
                ((0, 0, 0), 0),
                ((0, 0, 1), 1),
                ((0, 1, 0), 2),
                ((0, 1, 1), 3),
                ((1, 0, 0), 4),
                ((1, 0, 1), 5),
                ((1, 1, 0), 6),
                ((1, 1, 1), 7),
                ]

        for vector, index in result:
            self.assertEqual(Voxel(*vector).index(Voxel(2, 2, 2)), index)

    def test_size(self):
        t = Tube([
            { Tube.DOWN: 2 },
            { Tube.RIGHT: 2 },
            { Tube.IN: 2 },
            ])

        self.assertEqual(t.size, Voxel(3, 3, 3))

    def test_sort_2(self):
        t = Tube([
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

        self.assertEqual(frozenset(t.voxels), frozenset([Voxel(*v) for v in result]))

    def test_transpose_1(self):
        t1 = Tube([
            { Tube.LEFT: 2 },
            ])

        t2 = Tube([
            { Tube.RIGHT: 2 },
            ])

        self.assertEqual(t1.voxels, t2.voxels)

    def test_eliminate_redundant_voxels(self):
        t1 = Tube([
            { Tube.LEFT: 2 },
            { Tube.RIGHT: 2 },
            ])

        t2 = Tube([
            { Tube.LEFT: 2 },
            ])

        self.assertEqual(t1.voxels, t2.voxels)

    def test_unique_shape_1(self):
        t1 = Tube([
            { Tube.LEFT: 2 },
            { Tube.UP: 2 },
            ])

        t2 = Tube([
            { Tube.RIGHT: 2 },
            { Tube.DOWN: 2 },
            ])

        self.assertEqual(t1.voxels, t2.voxels)

    def test_unique_shape_2(self):
        t1 = Tube([
            { Tube.LEFT: 1 },
            { Tube.UP: 1 },
            ])

        t2 = Tube([
            { Tube.RIGHT: 1 },
            { Tube.UP: 1 },
            ])

        self.assertEqual(t1.voxels, t2.voxels)

    def test_json(self):
        t = Tube({})
        json.dumps([list(v) for v in t.voxels])

if __name__ == '__main__':
    unittest.main()
