# -- coding: utf8 --
from django.views.decorators.csrf import csrf_exempt
from models.contact import Contact
from tools.func import to_json

@csrf_exempt
def get(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    check = q.get('check')
    id = q.get('id')
    if id:
        rr = Contact.objects.filter(pk=id)
    else:
        rr = Contact.objects.filter(check=check)
    r = [{'id':m.pk,'name':m.name,'check':m.check,'sex':m.sex or '','email':m.email or '','phone':m.phone,'advice':m.advice or '','reply':m.reply or '','time':m.time} for m in rr]
    back['data'] = r
    return to_json(back)

@csrf_exempt
def check(req):
    back = {'status':'ok'}
    q = req.GET or req.POST
    id = q.get('id')
    check = q.get('check')
    Contact.objects.filter(pk=id).update(check=check)
    back['back'] = check
    return to_json(back)