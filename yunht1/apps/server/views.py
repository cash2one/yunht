# -*- coding: utf-8 -*-
from tools.func import to_tmp,to_json

pubTitle='云荷廷健康管理'
def cls(req):
    #seoTitle = '美国试管婴儿_泰国试管婴儿_' + pubTitle
    seoTitle = '美国代孕竟然是这样的？美国试管婴儿有什么好？点击为您揭秘！'
    active = 'server/home'
    return to_tmp(active,req,locals())

def cls2(req):
    seoTitle = '美国代孕竟然是这样的？美国试管婴儿有什么好？点击为您揭秘！'
    active = 'server/home2'
    return to_tmp(active,req,locals())