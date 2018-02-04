from contexts.components import utils

def render(page, request):
    posts = []
    page = page.specific

    for post in page.get_children():
        post = post.specific
        url = utils.get_url(post, request)


        posts.append({
            'title': post.title,
            'url': url,
            })

    return {
            'title': page.title,
            'richtext': str(page.content[0].value),
            'posts': posts,
            }
