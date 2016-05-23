class JPage(object):
	def __init__ (self,limit,nowpage,before_range_num,after_range_num,count):
		self._nowpage           = nowpage
		self._limit           = limit
		self._after_range_num   = after_range_num
		self._before_range_num  = before_range_num
		self._page_range        = []
		self._count = count
		self._nextpage          = 0
		self._prvpage           = 0
	def page_count(self):
		self._allcount=(self._count-1)/self._limit+1
		return self._allcount
	def page_range(self):
		page_rangep=[]
		i=1
		while (i<=self._allcount):
			pages={'number':'','nowpage':''}
			pages['number']=i
			if (i==self._nowpage):
				pages['nowpage']='1'
			else:
				pages['nowpage']=None
				
			page_rangep.append(pages)
			i+=1
		if self._nowpage >= self._after_range_num:
			return page_rangep[self._nowpage-self._after_range_num:self._nowpage + self._before_range_num]
		else:
			return page_rangep[0:int(self._nowpage) + self._before_range_num]
	def nextpage(self):
		self._nextpage=self._nowpage+1
		return self._nowpage+1
	def prvpage(self):
		self._prvpage=self._nowpage-1
		return self._nowpage-1