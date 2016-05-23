# -- coding: utf8 --
from django.db import models

class Hcountry(models.Model):
    name = models.CharField(verbose_name=u'名称')
    rank = models.IntegerField(verbose_name=u'排序')
    class Meta:
        db_table = 'hcountry'