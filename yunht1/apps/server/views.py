# -*- coding: utf-8 -*-
from tools.func import to_tmp,to_json

pubTitle='云荷廷健康管理'
def cls(req):
    seoTitle = '美国试管婴儿_泰国试管婴儿_' + pubTitle
    active = 'server/home'
    return to_tmp(active,req,locals())
