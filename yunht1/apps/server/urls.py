from django.conf.urls import patterns, include, url

urlpatterns = patterns('apps.server.views',
    url(r'^class$', 'cls'),
    url(r'^class2$', 'cls2'),
)
