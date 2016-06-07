# -- coding: utf8 --
from django.views.decorators.csrf import csrf_exempt
from models.hospital import Hospital
from tools.func import getHcountryAttr,to_json

@csrf_exempt
def get(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    cid = q.get('cid')
    if id:
        rr = Hospital.objects.filter(pk=id)
    else:
        if cid:
            rr = Hospital.objects.filter(cid=cid)
        else:
            rr = Hospital.objects.all()
    r = [{'id':m.pk,'name':m.name,'pdate':m.pdate,'abs':m.abs,'rank':m.rank,'text':m.text,'pic':m.pic,'cid':m.cid,'cname':getHcountryAttr(m.cid)} for m in rr]
    back['data'] = r
    return to_json(back)

@csrf_exempt
def update(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    name = q.get('name')
    pdate = q.get('pdate')
    abs = q.get('abs')
    rank = q.get('rank')
    text = q.get('text')
    pic = q.get('pic')
    cid = q.get('cid')
    kwargs = {'name':name,'pdate':pdate,'abs':abs,'rank':rank,'text':text,'pic':pic,'cid':cid}
    if id:
        Hospital.objects.filter(pk=id).update(**kwargs)
        back['id'] = id
    else:
        h = Hospital(**kwargs)
        h.save()
        back['id'] = h.id
    return to_json(back)

@csrf_exempt
def remove(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    Hospital.objects.filter(pk=id).delete()
    back['id'] = id
    return to_json(back)