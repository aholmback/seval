def get_url(page, request):
    source_key = 'HTTP_X_MOUNT_SOURCE'
    target_key = 'HTTP_X_MOUNT_TARGET'

    return request.META.get(source_key, '') + page.get_url()[len(request.META.get(target_key, '')):]
