from django.conf.urls import patterns, include, url

urlpatterns = patterns('apps.server.views',
    url(r'^class$', 'cls'),
)
