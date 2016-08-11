#coding:utf-8
from django.views.decorators.csrf import csrf_exempt
from common.tools.func import to_json,getStrTime
import os,time,urllib2,settings,random

@csrf_exempt
def home(req):
    q = req.GET or req.POST
    action = q.get('action')
    back = {'state':'error'}
    Config = settings.Config
    if action=='config':
        back = Config
    elif action=='uploadfile':
        back = fileload(req,Config['fileAllowFiles'],Config['filePathFormat'])
    elif action=='uploadvideo':
        back = fileload(req,Config['videoAllowFiles'],Config['videoPathFormat'])
    elif action in ['uploadimage','uploadscrawl','uploadimage','catchimage']:
        back = fileload(req,Config['imageAllowFiles'],Config['imagePathFormat'])
    return to_json(back)

@csrf_exempt
def fileload(request,AllowFiles,PathFormat):
    if request.FILES:
        files = request.FILES['upfile']
        source_pictitle = request.POST.get('pictitle','')
        #source_filename = request.POST.get('fileName','')
        filename = files.name
        filetype = '.'+filename.split('.')[-1]
        back = {'state' : 'SUCCESS'}
        timeDir = getStrTime(em='/')+'/'
        if filetype in AllowFiles:
            nowtime = int(time.time())
            tmp = random.randint(100000, 999999)
            fname = str(nowtime)+str(tmp)+filetype
            filepath = PathFormat+timeDir+fname
            if not os.path.isdir(PathFormat+timeDir):
                os.makedirs(PathFormat+timeDir)
            des_origin_f = open(filepath,'wb+')
            for chunk in files.chunks():
                des_origin_f.write(chunk)
            des_origin_f.close()
            back['state'] = 'SUCCESS'
            back['url'] = timeDir+fname
            back['title'] = source_pictitle
            back['original'] = filename
        else:
            back = {'state' : 'Fail','msg' : 'need right format'}
        return back
    else:
        return {'state':'error','msg':'need files'}