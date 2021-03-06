from django.shortcuts import render
from django.http import HttpResponse
from . import components

def context(request, component):
    return HttpResponse(
            components.get(component).render(request=request),
            content_type='application/json',
            )
