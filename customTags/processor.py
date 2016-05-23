# -*- coding: utf-8 -*-
from models.hospital import Hospital
from models.doctor import Doctor
from models.success import Success
from models.news import News
from models.Class import Class
from models.contact import Contact
from tools.func import to_tmp,to_json,getArray,getArray2
from tools.db import objToHospital,getHospitalAttr

def model(request):
    successMenuList = Success.objects.all()
    successMenu = getArray(successMenuList,3)
    classMenuList = Class.objects.all()
    classMenu = getArray(classMenuList,3)
    hospitalList1 = objToHospital(Hospital.objects.filter(cid=1))
    hospitalList2 = objToHospital(Hospital.objects.filter(cid=2))
    hospitalList3 = objToHospital(Hospital.objects.filter(cid=3))
    hospitalMenu = getArray2([hospitalList1,hospitalList2,hospitalList3])
    return  {
        'menuList' : [
            {'name':'首页','href':'/index/','active':'index'},
            {'name':'成功案例','href':'/success/','active':'success'},
            {'name':'试管项目','href':'/project/','active':'project'},
            {'name':'试管费用','href':'/fee/','active':'fee'},
            {'name':'合作医院','href':'/hospital/','active':'hospital'},
            {'name':'知识课堂','href':'/knowledge/','active':'knowledge'},
            {'name':'关于我们','href':'/contact/','active':'contact'}
        ],
        'hospitalMenu' : hospitalMenu,
        'successMenu' : successMenu,
        'classMenu' : classMenu
    }