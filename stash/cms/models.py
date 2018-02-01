from django.db import models
from django.http import JsonResponse

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.utils import camelcase_to_underscore

import contexts

class DocumentationPage(Page):

    richtext = RichTextField()

    content_panels = [
            FieldPanel('title'),
            FieldPanel('richtext'),
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
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('intro'),
        FieldPanel('body', classname="full"),
    ]

    component = 'pages/blog'

    def serve(self, request):
        component = {
                'name': self.component,
                'context': contexts.component(self.component).render(self, request),
                }

        return JsonResponse(component)
