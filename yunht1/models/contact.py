# -- coding: utf8 --
from django.db import models

class Contact(models.Model):
    name = models.CharField(verbose_name=u'名称')
    sex = models.CharField()
    email = models.CharField()
    phone = models.IntegerField()
    advice = models.CharField()
    reply = models.CharField()
    ip = models.CharField()
    check = models.IntegerField(default=0)
    time = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'contact'