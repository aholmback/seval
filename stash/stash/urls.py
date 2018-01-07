from django.contrib import admin
from django.conf.urls import url

def hello(request):
    from django.http import JsonResponse
    return JsonResponse({'message': "Hello world!"})

urlpatterns = [
    url('hello/', hello),
    url('admin/', admin.site.urls),
]

