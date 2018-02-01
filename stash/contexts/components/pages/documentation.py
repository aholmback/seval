def render(page, request):
    posts = []

    for post in page.get_children():
        post = post.specific
        url = post.get_url()

        url = request.META['HTTP_X_MOUNT_SOURCE'] + url[len(request.META['HTTP_X_MOUNT_TARGET']):]

        posts.append({
            'title': post.title,
            'body': post.body,
            'url': url,
            })

    return {
            'title': page.title,
            'richtext': page.richtext,
            'posts': posts,
            }
