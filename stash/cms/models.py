from django.db import models
from django.http import JsonResponse

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField, StreamField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.core.utils import camelcase_to_underscore

import contexts

from . import blocks

class DocumentationPage(Page):

    content = StreamField(blocks.ContentBlock())

    content_panels = [
            FieldPanel('title'),
            StreamFieldPanel('content'),
            ]

    component = 'pages/documentation'

    def serve(self, request):
        component = {
                'name': self.component,
                'context': contexts.component(self.component).render(self, request),
                }

        return JsonResponse(component)


class BlogPage(Page):
    date = models.DateField("Post date")
    content = StreamField(blocks.ContentBlock())

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        StreamFieldPanel('content'),
    ]

    component = 'pages/blog'

    def serve(self, request):
        component = {
                'name': self.component,
                'context': contexts.component(self.component).render(self, request),
                }

        return JsonResponse(component)
