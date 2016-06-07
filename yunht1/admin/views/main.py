# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from conf.settings import BASE_DIR
import os,random,time,shutil,re

def home(req):
    return HttpResponseRedirect('/static/jui-admin/index.html')
    #return render_to_response('admin/home.html',{'seoTitle':seoTitle})

@csrf_exempt
def fileload(request):
    if request.FILES:
        files=request.FILES['file']
        base='/static/img/cache/'
        newpath=BASE_DIR+base
        filename=files.name
        suportFormat = ['BMP', 'GIF', 'JPG','JPGE', 'PNG','JPEG']
        officeFormat = ['CSV','DOC','DOCX', 'DOCM', 'DOTX','DOTM','XLS','XLSX','XLSM','XLTX','XLTM','XLSB','XLAM','PDF','TXT','ET']
        filetype=filename.split('.')[-1]
        filetype=filetype.upper()
        if filetype in suportFormat:
            imagetype=1
        elif filetype in officeFormat:
            officetype=1
        else:
            return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个正确的office文件格式。</body>')
        nowtime=int(time.time())
        tmp = random.randint(100, 999)
        fname=str(tmp)+str(nowtime)+'.'+filetype.lower()
        imgpath=newpath+fname
        if not os.path.isdir(newpath):
            os.makedirs(newpath)
        des_origin_f = open(imgpath,"wb+")
        for chunk in files.chunks():
            des_origin_f.write(chunk)
        des_origin_f.close()
        picurl=base+fname
        return HttpResponse('<body style="margin:0;width:200px;height:20px">sucess.<script>parent.parent.document.getElementById("pic_logo").src="'+picurl+'";</script></body>')
    return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个文件。</body>')
@csrf_exempt
def fileload2(request):
    if request.FILES:
        files=request.FILES['file']
        base='/static/img/cache/'
        newpath=BASE_DIR+base
        filename=files.name
        suportFormat = ['BMP', 'GIF', 'JPG','JPGE', 'PNG','JPEG']
        officeFormat = ['CSV','DOC','DOCX', 'DOCM', 'DOTX','DOTM','XLS','XLSX','XLSM','XLTX','XLTM','XLSB','XLAM','PDF','TXT','ET']
        filetype=filename.split('.')[-1]
        filetype=filetype.upper()
        if filetype in suportFormat:
            imagetype=1
        elif filetype in officeFormat:
            officetype=1
        else:
            return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个正确的office文件格式。</body>')
        nowtime=int(time.time())
        tmp = random.randint(100, 999)
        fname=str(tmp)+str(nowtime)+'.'+filetype.lower()
        imgpath=newpath+fname
        if not os.path.isdir(newpath):
            os.makedirs(newpath)
        des_origin_f = open(imgpath,"wb+")
        for chunk in files.chunks():
            des_origin_f.write(chunk)
        des_origin_f.close()
        picurl=base+fname
        return HttpResponse("<body style='margin:0;width:200px;height:20px'><img src='"+picurl+"' /><script>parent.parent.Main.getUE().execCommand('insertHtml', '<img src="+picurl+" />')</script></body>")
    return HttpResponse('<body style="margin:0;width:200px;height:30px">请选择一个文件。</body>')

def login(req):
    seoTitle='后台登录'
    uname=req.GET.get('uname')
    pwd=req.GET.get('pwd')
    if uname=='tml' and pwd=='tml':
        req.session['uname']=uname
        return HttpResponseRedirect('/static/jadmin/index.html')
    return render_to_response('admin/index.html',{'seoTitle':seoTitle})

def islogin(req):
    if req.session.get('uname'):return HttpResponse(1)
    return HttpResponse(0)

def logout(req):
    req.session.delete()
    return HttpResponseRedirect('/admin/')
