from django.core.management.base import BaseCommand
from voxels.generate import Tube

class Command(BaseCommand):
    def handle(self, *args, **options):
        t1 = Tube()

        t1.move(Tube.RIGHT, 2)
        t1.move(Tube.DOWN, 2)
        t1.move(Tube.RIGHT, 2)

        t2 = Tube()

        t2.move(Tube.LEFT, 2)
        t2.move(Tube.DOWN, 2)
        t2.move(Tube.LEFT, 2)

        print(t2.is_equal(t1))


