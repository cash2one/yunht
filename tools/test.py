'''b=1
c=1
field='b,c'

arg=[eval(m) for m in field.split(',')]
args='%s,'*len(arg)
upargs=','.join([m+'=%s' for m in field.split(',')])
print args[:-1]
jsd={'a':1,'b':2,'c':3}

field=','.join([m[0] for m in jsd.items()])
argument=[str(m[1]) for m in jsd.items()]
la=len(argument)
args=('%s,'*la)[:-1]
print field,args
'''

a=[1,2,3,4]
b=[1,3,6,5,6,7]
def arrdef(a,b):return [m for m in b if m not in a],[m for m in a if m not in b] #判断两个数组的区别,b相对于a增加了，删除了哪些数据

print arrdef(a,b)

        