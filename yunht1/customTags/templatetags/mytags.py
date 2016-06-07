# -*- coding: utf-8 -*-
from django import template
import time,re
register = template.Library()

@register.filter(name='cut')
def cut(value, arg):
    return value.replace(arg, '')

@register.filter(name='cutr')
def cutr(value, arg):
    return re.sub(arg,'',value)

@register.filter
def rimg(value):
    return value.replace('/static/img/upload/','/img/400X400/')

@register.filter
def lower(value):
    return value.lower()

@register.filter
def firstPath(value):
    maps = {"EngineerUser":"engineer", "SaleUser":"sale", "AdminUser":"admin","Operationer":"operation"}
    return maps.get(value, "")
    
@register.filter
def formatTime(t):
    if not t: return ""
    strT = time.strftime("%Y-%m-%d %H:%M", time.localtime(t))
    return strT

@register.filter
def formatShortTime(t):
    if not t: return ''
    strT = time.strftime("%Y-%m-%d")
    return strT

@register.filter
def subString(string,length):
    length=int(length)
    if length >= len(string):
        return string
    result = ''
    i = 0
    p = 0
    while True:
        ch = ord(string[i])
        #1111110x
        if ch >= 252:
            p = p + 6
        #111110xx
        elif ch >= 248:
            p = p + 5
        #11110xxx
        elif ch >= 240:
            p = p + 4
        #1110xxxx
        elif ch >= 224:
            p = p + 3
        #110xxxxx
        elif ch >= 192:
            p = p + 2
        else:
            p = p + 1
        if p >= length:
            break;
        else:
            i = p
    return string[0:i]