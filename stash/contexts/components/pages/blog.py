def render(page, request):
    return {
            'title': page.title,
            'intro': page.intro,
            'body': page.body,
            }
