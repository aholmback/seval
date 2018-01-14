from django.shortcuts import render
from django.http import HttpResponse
from cms.models import FooPage
from . import components

def context(request, component):
    try:
        return HttpResponse(
                components.get(component).render(request=request),
                content_type='application/json',
                )
    except Exception as e:
        return HttpResponse(e, status=400)
