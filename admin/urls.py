from django.conf.urls import patterns, include, url

urlpatterns = patterns('admin.views.main',
    url(r'^$', 'home'),
    url(r'^fileload$', 'fileload'),
    url(r'^fileload2$', 'fileload2'),
)
urlpatterns += patterns('admin.views.success',
    url(r'^success/get$', 'get'),
    url(r'^success/update$', 'update'),
    url(r'^success/remove$', 'remove'),
)
urlpatterns += patterns('admin.views.hospital',
    url(r'^hospital/get$', 'get'),
    url(r'^hospital/update$', 'update'),
    url(r'^hospital/remove$', 'remove'),
)
urlpatterns += patterns('admin.views.hcountry',
    url(r'^hcountry/get$', 'get'),
    url(r'^hcountry/update$', 'update'),
    url(r'^hcountry/remove$', 'remove'),
)
urlpatterns += patterns('admin.views.doctor',
    url(r'^doctor/get$', 'get'),
    url(r'^doctor/update$', 'update'),
    url(r'^doctor/remove$', 'remove'),
)
urlpatterns += patterns('admin.views.contact',
    url(r'^contact/get$', 'get'),
    url(r'^contact/check$', 'check'),
)
urlpatterns += patterns('admin.views.news',
    url(r'^news/get$', 'get'),
    url(r'^news/update$', 'update'),
    url(r'^news/remove$', 'remove'),
)
urlpatterns += patterns('admin.views.class',
    url(r'^class/get$', 'get'),
    url(r'^class/update$', 'update'),
    url(r'^class/remove$', 'remove'),
)