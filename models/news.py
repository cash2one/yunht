# -- coding: utf8 --
from django.db import models

class News(models.Model):
    name = models.CharField(max_length=255,verbose_name=u'名称')
    pdate = models.DateTimeField(verbose_name=u'发布时间')
    abs = models.CharField(verbose_name=u'摘要')
    rank = models.IntegerField(verbose_name=u'排序')
    text = models.CharField(verbose_name=u'内容')
    pic = models.CharField(verbose_name=u'图片')
    class Meta:
        db_table = 'news'