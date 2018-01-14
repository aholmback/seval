from django.contrib import admin
from django.conf.urls import url, include

from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls
from wagtail.wagtailcore import urls as wagtail_urls
from contexts import urls as context_urls

def hello(request):
    from django.http import JsonResponse
    return JsonResponse({'message': "Hello world!"})

urlpatterns = [
    url(r'^hello/', hello),
    url(r'^admin/', admin.site.urls),
    url(r'^cms/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),
    url(r'^pages/', include(wagtail_urls)),
    url(r'^contexts/', include(context_urls)),
]
