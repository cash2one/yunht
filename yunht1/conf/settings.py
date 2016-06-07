import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SECRET_KEY = '#)1_b=*kspc$y!diqkf-8dbc(e!dl_dpi06kx^1f-7gvc(oms('
DEBUG = True
TEMPLATE_DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS = (
    #'django.contrib.contenttypes',
    #'django.contrib.sessions',
    #'django.contrib.messages',
    'django.contrib.staticfiles',
	'customTags',
	'models',
	'admin',
    'tools',
)
MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    #'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    #'django.contrib.auth.middleware.AuthenticationMiddleware',
    #'django.contrib.messages.middleware.MessageMiddleware',
    #'django.middleware.clickjacking.XFrameOptionsMiddleware',
)
ROOT_URLCONF = 'conf.urls'
LANGUAGE_CODE = 'zh-cn' 
DEFAULT_CHARSET = 'UTF-8'
WSGI_APPLICATION = 'conf.wsgi.application'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_ROOT = ''
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates').replace('\\', '/'),
)
TEMPLATE_CONTEXT_PROCESSORS = (
    'customTags.processor.model',
)
DATABASES = {
    'default': {
         'ENGINE': 'django.db.backends.mysql',
         'NAME': 'yl',
         'USER': 'yht',
         'PASSWORD': 'yhtsyyl',
         'HOST': '121.41.47.8',
         "CHARSET":  "utf8",
    }
}
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True
USE_L10N = True
USE_TZ = True
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static').replace('\\', '/'),
)
#SESSION_ENGINE = 'django.contrib.sessions.backends.file'
#SESSION_FILE_PATH = '/var/www/session/'
#SESSION_COOKIE_AGE=3600*24
