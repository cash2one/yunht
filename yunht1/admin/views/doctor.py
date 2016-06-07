# -- coding: utf8 --
from django.views.decorators.csrf import csrf_exempt
from models.doctor import Doctor
from tools.func import getHospitalAttr,to_json

@csrf_exempt
def get(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    hid = q.get('hid')
    id = q.get('id')
    if id:
        rr = Doctor.objects.filter(pk=id)
    else:
        if hid:
            rr = Doctor.objects.filter(hid=hid)
        else:
            rr = Doctor.objects.all()
    r = [{'id':m.pk,'name':m.name,'pdate':m.pdate,'abs':m.abs,'rank':m.rank,'text':m.text,'pic':m.pic,'hid':m.hid,'hname':getHospitalAttr(m.hid)} for m in rr]
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
    hid = q.get('hid')
    kwargs = {'hid':hid,'name':name,'pdate':pdate,'abs':abs,'rank':rank,'text':text,'pic':pic}
    if id:
        Doctor.objects.filter(pk=id).update(**kwargs)
        back['id'] = id
    else:
        h = Doctor(**kwargs)
        h.save()
        back['id'] = h.id
    return to_json(back)

@csrf_exempt
def remove(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    Doctor.objects.filter(pk=id).delete()
    back['id'] = id
    return to_json(back)