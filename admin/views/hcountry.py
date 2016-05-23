# -- coding: utf8 --
from django.views.decorators.csrf import csrf_exempt
from models.hcountry import Hcountry
from tools.func import to_json

@csrf_exempt
def get(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    if id:
        rr = Hcountry.objects.filter(pk=id)
    else:
        rr = Hcountry.objects.all()
    r = [{'id':m.pk,'name':m.name,'rank':m.rank} for m in rr]
    back['data'] = r
    return to_json(back)

@csrf_exempt
def update(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    name = q.get('name')
    rank = q.get('rank')
    kwargs = {'name':name,'rank':rank}
    if id:
        Hcountry.objects.filter(pk=id).update(**kwargs)
        back['id'] = id
    else:
        h = Hcountry(**kwargs)
        h.save()
        back['id'] = h.id
    return to_json(back)

@csrf_exempt
def remove(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    Hcountry.objects.filter(pk=id).delete()
    back['id'] = id
    return to_json(back)