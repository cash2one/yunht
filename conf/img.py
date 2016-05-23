# -*- coding: utf-8 -*-
from django.http import HttpResponse
import Image,StringIO
from settings import BASE_DIR
imgpath=BASE_DIR+'/static/img/upload/'

def img(req,url):
    t=url.split('/')
    w,h=t[0].split('X')
    im = Image.open(imgpath+t[1])
    im.thumbnail((int(w), int(h)))
    mstream = StringIO.StringIO()
    im.save(mstream, "png")
    mstream.closed
    return HttpResponse(mstream.getvalue(),'image/png')
#     return HttpResponse(im, mimetype="image/png")
