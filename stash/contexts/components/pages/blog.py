def render(page, request):
    return {
            'title': page.title,
            'content': str(page.content[0].value),
            }
