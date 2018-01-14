import json
from cms.models import FooPage

def render(request):
    foopage = FooPage.objects.get(pk=request.GET['id'])

    return json.dumps({
        'title': foopage.title,
        'text': foopage.richtext,
        })



