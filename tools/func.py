# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.core.serializers.json import DjangoJSONEncoder
from django.template import RequestContext
from django.http import HttpResponse
from models.hospital import Hospital
from models.hcountry import Hcountry
import re,json
def to_tmp(tmp,req,args={}):
    return render_to_response(tmp+'.html',args,context_instance=RequestContext(req))
def to_json(data):
    return HttpResponse(json.dumps(data, cls=DjangoJSONEncoder), content_type='application/json')

def getHospitalAttr(id,k='name'):
    j = Hospital.objects.filter(pk=id)[0]
    return getattr(j,k)
def getHcountryAttr(id,k='name'):
    j = Hcountry.objects.filter(pk=id)[0]
    return getattr(j,k)
def getArray(r,l):
    '''
    a = ['a','b','c','c']
    b = ['d','e','f','f','f','f']
    c = ['g','h','i']
    ([a,b,c])
    >
    [['a', 'd', 'g'], ['b', 'e', 'h'], ['c', 'f', 'i'], ['c', 'f', ''], ['', 'f', ''], ['', 'f', '']]
    '''
    ln = len(r)
    f = 0
    e = ln/l
    b = []
    for i in range(0,e+2):
        s = r[f:f+l]
        if s:
            b.append(s)
        f += l
    return b
def getArray2(r):
    '''
    a = ['a','b','c','c']
    b = ['d','e','f','f','f','f']
    c = ['g','h','i']
    ([a,b,c])
    >
    [['a', 'd', 'g'], ['b', 'e', 'h'], ['c', 'f', 'i'], ['c', 'f', ''], ['', 'f', ''], ['', 'f', '']]
    '''
    l = 0
    for i in r:
        if l<len(i):
            l = len(i)
    nl = []
    for i in r:
        c = i
        for j in range(l-len(i)):
            c.append('')
        nl.append(c)
    b = []
    for k in range(l):
        d = []
        for n in nl:
            d.append(n[k])
        b.append(d)
    print b
    return b

def listToJson(cms,r):
    return [{cms[i]:m for i,m in enumerate(n)} for n in r] #数组列表变json列表

def date_to_str(d):
    return d.strftime('%Y-%m-%d')
#----去掉html标签，获得纯文本
def filter_tags(htmlstr):
    #先过滤CDATA
    re_cdata=re.compile('//<!\[CDATA\[[^>]*//\]\]>',re.I) #匹配CDATA
    re_script=re.compile('<\s*script[^>]*>[^<]*<\s*/\s*script\s*>',re.I)#Script
    re_style=re.compile('<\s*style[^>]*>[^<]*<\s*/\s*style\s*>',re.I)#style
    re_br=re.compile('<br\s*?/?>')#处理换行
    re_h=re.compile('</?\w+[^>]*>')#HTML标签
    re_comment=re.compile('<!--[^>]*-->')#HTML注释
    s=re_cdata.sub('',htmlstr)#去掉CDATA
    s=re_script.sub('',s) #去掉SCRIPT
    s=re_style.sub('',s)#去掉style
    s=re_br.sub('\n',s)#将br转换为换行
    s=re_h.sub('',s) #去掉HTML 标签
    s=re_comment.sub('',s)#去掉HTML注释
    #去掉多余的空行
    blank_line=re.compile('\n+')
    s=blank_line.sub('\n',s)
    s=replaceCharEntity(s)#替换实体
    return s
#使用正常的字符替换HTML中特殊的字符实体
def replaceCharEntity(htmlstr):
    CHAR_ENTITIES={'nbsp':' ','160':' ',
                'lt':'<','60':'<',
                'gt':'>','62':'>',
                'amp':'&','38':'&',
                'quot':'"','34':'"',}
    re_charEntity=re.compile(r'&#?(?P<name>\w+);')
    sz=re_charEntity.search(htmlstr)
    while sz:
        entity=sz.group()#entity全称，如&gt;
        key=sz.group('name')#去除&;后entity,如&gt;为gt
        try:
            htmlstr=re_charEntity.sub(CHAR_ENTITIES[key],htmlstr,1)
            sz=re_charEntity.search(htmlstr)
        except KeyError:
            #以空串代替
            htmlstr=re_charEntity.sub('',htmlstr,1)
            sz=re_charEntity.search(htmlstr)
    return htmlstr
def cleartable(txt):
    txt=re.sub('<table.*?>','<table>',txt)
    txt=re.sub('<tr.*?>','<tr>',txt)
    txt=re.sub('<td.*?>','<td>',txt)
    txt=re.sub('<p.*?>','',txt)
    txt=re.sub('</p>','',txt)
    txt=re.sub('<span.*?>','',txt)
    txt=re.sub('</span>','',txt)
    return txt