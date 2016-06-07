# -*- coding: utf-8 -*-
from models.hospital import Hospital
from models.hcountry import Hcountry

def getHospitalAttr(id,k='name'):
    j = Hospital.objects.filter(pk=id)[0]
    return getattr(j,k)
def getHcountryAttr(id,k='name'):
    j = Hcountry.objects.filter(pk=id)[0]
    return getattr(j,k)
def objToHospital(o):
    return [{'pk':m.pk,'name':m.name,'pdate':m.pdate,'abs':m.abs,'rank':m.rank,'text':m.text,'pic':m.pic,'cid':m.cid,'cname':getHcountryAttr(m.cid)} for m in o]