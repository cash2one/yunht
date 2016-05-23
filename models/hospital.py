# -- coding: utf8 --
from django.db import models

class Hospital(models.Model):
    name = models.CharField(verbose_name=u'名称')
    pdate = models.DateTimeField(verbose_name=u'发布时间')
    abs = models.CharField(verbose_name=u'摘要')
    rank = models.IntegerField(verbose_name=u'排序')
    text = models.CharField(verbose_name=u'内容')
    pic = models.CharField(verbose_name=u'图片')
    cid = models.IntegerField(verbose_name=u'试管医院国家')
    class Meta:
        db_table = 'hospital'