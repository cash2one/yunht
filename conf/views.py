# -*- coding: utf-8 -*-
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from tools.JPage import JPage
from models.hospital import Hospital
from models.doctor import Doctor
from models.success import Success
from models.news import News
from models.Class import Class
from models.contact import Contact
from tools.func import to_tmp,to_json,getArray,getArray2
from tools.db import objToHospital,getHospitalAttr
import re

pubTitle='云荷廷健康管理'
def home(req):
    seoTitle = '美国试管婴儿_泰国试管婴儿_' + pubTitle
    active = 'home'
    return to_tmp(active,req,locals())
def index(req):
    seoTitle = '美国试管婴儿_泰国试管婴儿_' + pubTitle
    active = 'index'
    newsList = News.objects.all()
    classList = Class.objects.all()[:3]
    return to_tmp(active,req,locals())
def success(req):
    seoTitle = '知识课堂_' + pubTitle
    active = 'success'
    resultList = Success.objects.all()
    return to_tmp(active,req,locals())
def success_detail(req,id):
    result = Success.objects.filter(pk=id)[0]
    seoTitle = result.name.encode('utf-8')+'_成功案例_' + pubTitle
    return to_tmp('success/detail',req,locals())
def news(req):
    seoTitle = '知识课堂_' + pubTitle
    active = 'news'
    resultList = News.objects.all()
    return to_tmp(active,req,locals())
def news_detail(req,id):
    result = News.objects.filter(pk=id)[0]
    seoTitle = result.name.encode('utf-8')+'_新闻_' + pubTitle
    return to_tmp('news/detail',req,locals())
def knowledge(req):
    seoTitle = '知识课堂_' + pubTitle
    resultList = Class.objects.all()
    active = 'knowledge'
    return to_tmp(active,req,locals())
def knowledge_detail(req,id):
    result = Class.objects.filter(pk=id)[0]
    seoTitle = result.name.encode('utf-8')+'_知识课堂_' + pubTitle
    return to_tmp('knowledge/detail',req,locals())
def project(req,kwd=''):
    seoTitle = '试管项目_' + pubTitle
    tmp =  'project'
    active = tmp
    if kwd:
        tmp += '/' + kwd
    return to_tmp(tmp,req,locals())
def fee(req):
    seoTitle = '试管费用_' + pubTitle
    active = 'fee'
    return to_tmp(active,req,locals())
def start(req):
    seoTitle = '关于我们_' + pubTitle
    active = 'fee'
    return to_tmp('start',req,locals())
def hospital(req):
    seoTitle = '试管医院_' + pubTitle
    active = 'hospital'
    resultList = Hospital.objects.all()
    return to_tmp(active,req,locals())
def hospital_detail(req,id):
    rr = Doctor.objects.filter(hid=id)
    hdetail = Hospital.objects.filter(pk=id)[0]
    seoTitle = hdetail.name.encode('utf-8')+'_试管医院_' + pubTitle
    resultList = [{'pk':m.pk,'name':m.name,'pdate':m.pdate,'abs':m.abs,'rank':m.rank,'text':re.sub('<img.*?>','',m.text),'pic':m.pic,'hid':m.hid,'hname':getHospitalAttr(m.hid)} for m in rr]
    return to_tmp('hospital/detail',req,locals())
def doctor_detail(req,id):
    result = Doctor.objects.filter(pk=id)[0]
    seoTitle = result.name.encode('utf-8')+'_试管医生_' + pubTitle
    return to_tmp('doctor/detail',req,locals())
def contact(req):
    seoTitle = '联系我们_' + pubTitle
    active = 'contact'
    return to_tmp(active,req,locals())
def about(req):
    seoTitle = '关于我们_' + pubTitle
    active = 'contact'
    return to_tmp('about',req,locals())

def contactData(req):
    back = {'status':'ok'}
    if req.META.has_key('HTTP_X_FORWARDED_FOR'):
        ip =  request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = req.META['REMOTE_ADDR']
    q = req.GET or req.POST
    if Contact.objects.filter(ip=ip,check=0):
        back['status'] = 'error'
        back['msg'] = '您已提交信息，不能重复提交，我们会尽快跟您联系'
    else:
        c = Contact(name=q.get('name') or None,sex=q.get('sex') or None,email=q.get('email') or None,phone=q.get('phone') or None,advice=q.get('advice') or None,reply=q.get('reply') or None,ip=ip)
        c.save()
        back['msg'] = '您已提交信息，我们会尽快跟您联系'
        back['id'] = c.id
    return to_json(back)

#用户操作
def regpage(req):
    return to_tmp('user/regpage.html',req,locals())

def loginpage(req):
    return to_tmp('user/loginpage.html',req,locals())

def reg(req):
    back = {'status':'ok'}
    return to_json(back)

def login(req):
    back = {'status':'ok'}
    seoTitle='后台登录'
    uname=req.GET.get('uname')
    pwd=req.GET.get('pwd')
    if uname=='tml' and pwd=='tml':
        req.session['uname']=uname
        back['uname'] = uname
    return to_json(back)

def islogin(req):
    if req.session.get('uname'):return HttpResponse(1)
    return HttpResponse(0)

def logout(req):
    back = {'status':'ok'}
    req.session.delete()
    return to_json(back)
