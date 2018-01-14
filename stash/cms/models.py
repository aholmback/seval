from django.db import models
from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class FooPage(Page):

    richtext = RichTextField()

    image = models.ForeignKey(
            'wagtailimages.Image',
            on_delete=models.PROTECT,
            )

    content_panels = [
            FieldPanel('title'),
            FieldPanel('richtext'),
            ImageChooserPanel('image'),
            ]
