from django.conf.urls import patterns, include, url
from settings import STATIC_ROOT

urlpatterns = patterns('conf.views',
    url(r'^$', 'index', name='index'),
    url(r'^index/$', 'index', name='index'),
    url(r'^success/$', 'success', name='success'),
    url(r'^success/(?P<id>\d+)$', 'success_detail', name='success_detail'),
    url(r'^news/$', 'news', name='news'),
    url(r'^news/(?P<id>\d+)$', 'news_detail', name='news_detail'),
    url(r'^project/$', 'project', name='project'),
    url(r'^project/(?P<kwd>\w+)$', 'project', name='project'),
    url(r'^fee/$', 'fee', name='fee'),
    url(r'^start/$', 'start', name='start'),
    url(r'^hospital/$', 'hospital', name='hospital'),
    url(r'^hospital/(?P<id>\d+)$', 'hospital_detail', name='hospital_detail'),
    url(r'^doctor/(?P<id>\d+)$', 'doctor_detail', name='doctor_detail'),
    url(r'^knowledge/$', 'knowledge', name='knowledge'),
    url(r'^knowledge/(?P<id>\d+)$', 'knowledge_detail', name='knowledge_detail'),
    url(r'^contact/$', 'contact', name='contact'),
    url(r'^contactData/$', 'contactData', name='contactData'),
    url(r'^about/$', 'about', name='about'),
    url(r'^admin/', include('admin.urls')),
)
urlpatterns += patterns('conf.img',
    url(r'^img/(.*?)$', 'img', name='img'),   
)
urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)