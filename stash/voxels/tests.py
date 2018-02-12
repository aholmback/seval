import unittest
from generate import Tube, Voxel
import json

class TubeTest(unittest.TestCase):
    def test_init(self):
        t = Tube({})
        self.assertEqual(t.voxels, frozenset([ Voxel(0, 0, 0) ]))

    def test_voxel_hash(self):
        t = Tube([
            { Tube.DOWN: 2 },
            { Tube.RIGHT: 2 },
            { Tube.IN: 2 },
            ])

        self.assertEqual(hash(t), -9132196317547368732)

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

    def test_unique_shape_3(self):
        t1 = Tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            ])

        t2 = Tube([
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 1 },
            ])

        self.assertNotEqual(t1.voxels, t2.voxels)

    def test_unique_shape_4(self):
        t1 = Tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 2 },
            ])

        t2 = Tube([
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        self.assertEqual(t1.voxels, t2.voxels)

    def test_unique_shape_5(self):
        t1 = Tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        t2 = Tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        self.assertEqual(t1.voxels, t2.voxels)

    def test_json(self):
        t = Tube([
            { Tube.LEFT: 3 },
            { Tube.UP: 2 },
            { Tube.RIGHT: 3 },
            { Tube.DOWN: 2 },
            { Tube.LEFT: 2 },
            ])

        voxels = json.loads(json.dumps([list(v) for v in t.voxels]))

        self.assertEqual([list(v) for v in t.voxels], voxels)

if __name__ == '__main__':
    unittest.main()
