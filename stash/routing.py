from channels.routing import route
from channels.handler import ViewConsumer

channel_routing = [
    route("http.request", ViewConsumer()),
]
