require.config({
    paths: {
        jquery: 'jquery-2.2.2.min',
		cookie: 'jquery.cookie',
		jui: 'jui-0.0.1',
		config: 'config-0.0.1',
		dom: 'dom-0.0.1'
    }
})
require(['jquery','jui','config','dom','cookie'], function($,Jui,Config,Dom) {
	var log = function(){
			if(console){for(var arg in arguments) console.log(arguments[arg])}
			else {for(var arg in arguments) alert(str(arguments[args]))}
		}, //打印
		str=function(k){return JSON && JSON.stringify(k)},
		json=function(k){return eval('('+k+')')},
		_cache = {
			getLocalTime : function(){ //页面右上角获取时间
				$('#localTime').text(Jui.tools.time.getStrTime({
					con:['-','-',' ',':',':',' ']
				}));
			},
			update : function(){
				var id = $('.window table').attr('did'),
					name = $('.window input[name="name"]').val(),
					pdate = $('.window input[name="pdate"]').val(),
					abs = $('.window textarea[name="abs"]').val(),
					rank = $('.window textarea[name="rank"]').val() || 0,
					text = _cache.ue.getContent(),
					pic = $('.window img[name="pic"]').attr('src'),
					hid = $('select[name="hospital"]').val(),
					j = {id,id,name:name,pdate:pdate,abs:abs,rank:rank,text:text,pic:pic,hid:hid}
				;
				$.get(_cache.pages[_cache.did].ajax.update,j,function(msg){
					if(msg.status=='ok'){
						_cache.getData();
						Jui.tools.ok();
						$('.window').hide();
					}
				});
			},
			empty : function(){
				$('.window input[name="pdate"]').val(Jui.tools.time.getStrTime({con:['-','-',' ','','','']}));
				$('.window table').attr('did','');
				$('.window input[name="name"]').val('');
				$('.window textarea[name="abs"]').val('');
				$('.window textarea[name="rank"]').val(0);
				_cache.ue.setContent('');
				$('.window img[name="pic"]').attr('src','');
				if(_cache.did=='doctors') $('.window td.hospital').show();
				else $('.window td.hospital').hide();
			},
			getHtm : function(data,suc){
				var htm = '',
					i = 0,
					tmp = Dom[_cache.did]
				;
				if(data.length==0){
					htm = '<td style="text-align:left;text-indent:2em">没有数据</td>';
				}else{
					for(var k=0;k<data.length;k++) {
						var j = data[k];
						htm += suc(tmp,j);
						if(i==0){
							i = 1;
							htm = htm.replace('#gray','');
						}
						else {
							i = 0;
							htm = htm.replace('#gray','class="gray"');
						}
					}
				}
				$('#'+_cache.did+' .tit span').text(data.length);
				$('#'+_cache.did+' tbody').html(htm);
			},
			pages : {
				'index' : {name:'主页', htm: ''},
				'success' : {name:'成功案例', htm: 'success.html',ajax:{
					get : '/admin/getSuccess',
					update : '/admin/updateSuccess',
					del : '/admin/delSuccess'
				}},
				'hospitals' : {name:'医院列表', htm: 'hospitals.html',ajax:{
					get : '/admin/getHospitals',
					update : '/admin/updateHospitals',
					del : '/admin/delHospitals'
				}},
				'doctors' : {name:'医生列表', htm: 'doctors.html',ajax:{
					get : '/admin/getDoctors',
					update : '/admin/updateDoctors',
					del : '/admin/delDoctors'
				}},
				'contact' : {name:'联系我们', htm: 'contact.html',ajax:{
					get : '/admin/getContact',
					update : '/admin/updateDoctors'
				}},
			},
			did : 'index',
			cntObj : '',
			tabList : ['index'],
			getDetail : function(){
				//请求模板数据
				var arg = {};
				if(_cache.did=='contact') arg.check = function(){
					if($('.isCheck').attr('s')=='0') return '1';
					return '0'
				}();
				$.get(_cache.pages[_cache.did].ajax.get,arg,function(d){
					//log(d);
					if(d.status=='ok'){
						var data = d.data;
						if(_cache.did=='hospitals' || _cache.did == 'success'){
							var htm = '',
								i = 0,
								tmp = Dom[_cache.did]
							;
							if(data.length==0){
								htm = '<td style="text-align:left;text-indent:2em">没有数据</td>';
							}else{
								for(var k=0;k<data.length;k++) {
									var s = data[k];
									htm += tmp.replace('#name',s.name).replace('#id',s.id).replace('#pic',s.pic);
									if(i==0){
										i = 1;
										htm = htm.replace('#gray','');
									}
									else {
										i = 0;
										htm = htm.replace('#gray','class="gray"');
									}
								}
							}
							$('#'+_cache.did+' .tit span').text(data.length);
							$('#'+_cache.did+' tbody').html(htm);
						}else if(_cache.did=='doctors'){
							var htm = '',
								i = 0,
								tmp = Dom[_cache.did]
							;
							if(data.length==0){
								htm = '<td style="text-align:left;text-indent:2em">没有数据</td>';
							}else{
								for(var k=0;k<data.length;k++) {
									var s = data[k];
									htm += tmp.replace('#name',s.name).replace('#id',s.id).replace('#pic',s.pic).replace('#hid',s.hid).replace('#hname',s.hname);
									if(i==0){
										i = 1;
										htm = htm.replace('#gray','');
									}
									else {
										i = 0;
										htm = htm.replace('#gray','class="gray"');
									}
								}
							}
							$('#'+_cache.did+' .tit span').text(data.length);
							$('#'+_cache.did+' tbody').html(htm);
						}else if(_cache.did=='contact') _cache.getHtm(data,function(tmp,j){
							var dom =  tmp.replace('#id',j.id).replace('#name',j.name).replace('#sex',j.sex).replace('#email',j.email).replace('#phone',j.phone).replace('#advice',j.advice).replace('#reply',j.reply).replace('#time',j.time);
							if(j.check==1) dom = dom.replace('#check','<i class="fa fa-check-circle"></i>');
							else dom = dom.replace('#check','<i class="fa fa-check-circle-o"></i>');
							return dom;
							
						});
						Jui.bind({
							dom : $('#'+_cache.did+' tbody'),
							show : function(o){
								o.find('>i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
							},
							hide : function(o){
								o.find('>i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
							}
						})
						//设置按钮
						$('dl.boxs dt .tit a.button').click(function(e){
							e.stopPropagation(); //阻止事件冒泡
							var ts = $(this),
								stdiv = ts.parent().parent().find('.stdiv')
							;
							if(stdiv.css('display')=='none') stdiv.show();
							else stdiv.hide();
						})
						//多选框
						$('dl.boxs dt input[type="checkbox"]').click(function(){
							var ts = $(this),
								state = true,
								pt = ts.parent()[0].nodeName.toLowerCase();
							if(pt=='th'){
								ts.parent().parent().parent().parent().parent().find('.tbody tr').each(function(k,i){
									$(i).find('td:eq(0) input[type="checkbox"]')[0].checked = ts[0].checked;
								})
							}
						})
						//修改删除
						$('dl.boxs dt a.edit').click(function(e){
							_cache.empty();
							var did = $(this).parent().parent().attr('did');
							Jui.animate.window(e,function(){
								$.get(_cache.pages[_cache.did].ajax.get,{id:did},function(msg){
									if(msg.status=='ok'){
										$('.window table').attr('did',did);
										var j = msg.data[0];
										//log(msg);
										$('.window input[name="name"]').val(j.name);
										$('.window input[name="pdate"]').val(j.pdate.substring(0,10));
										$('.window textarea[name="abs"]').val(j.abs);
										$('.window textarea[name="rank"]').val(j.rank);
										_cache.ue.setContent(j.text);
										$('.window img[name="pic"]').attr('src',j.pic);
									}
								})
							})
						})
						$('dl.boxs dt a.remove').click(function(e){
							var tr = $(this).parent().parent(),
								did = tr.attr('did')
							;
							Jui.tools.confirm({
								suc : function(){
									//log(_cache.pages[_cache.did].ajax.del,did);
									$.get(_cache.pages[_cache.did].ajax.del,{id:did},function(b){
										if(b.status=='ok'){
											_cache.getData();
										}
									})
								}
							})
						})
						if(_cache.did=='contact'){
							$('dl.boxs dt a.check').click(function(e){
								var o = $(this),
									i = o.find('i'),
									did = o.parent().parent().attr('did')
									check = 0;
								if(i.hasClass('fa-check-circle-o')){
									i.removeClass('fa-check-circle-o').addClass('fa-check-circle');
									check = 1;
								}
								else {
									i.removeClass('fa-check-circle').addClass('fa-check-circle-o');
								}
								$.get('/admin/checkContact/',{id:did,check:check},function(b){
									if(b.status=='ok'){
										log(msg);
									}
								})
							})
						}
						//设置批量操作
						$('dl.boxs dt .stdiv a').click(function(){
							
						})
					}
				})
			},
			getData : function(){
				var did = _cache.did,
					cntObj = $('#content-'+did),
					htms = _cache.pages[did].htm
				;
				_cache.cntObj = cntObj;
				Jui.animate.content($('section.content'));
				$('section.content>div').hide();
				cntObj.show();
				cntObj.html(Dom.stats.loading);
				//请求tab模板
				if(htms) $.get('htm/'+htms,{},function(s){
					cntObj.html(s);
					//顶部操作绑定
					$('.menus a.add').click(function(){
						$('.window').show();
						_cache.empty();
					})
					Jui.bind({
						dom : _cache.cntObj,
						show : function(o){
							o.find('>i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
						},
						hide : function(o){
							o.find('>i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
						}
					})
					_cache.getDetail();
				})
			},
			getTab : function(){
				var did = _cache.did;
				$('.menu-tab p.active').removeClass('active');
				$('.menu-tab').html(function(){
					var htm = '';
					for(var t of _cache.tabList) {
						htm += '<p i="'+(_cache.tabList.indexOf(t))+'" did="'+t+'"><span>'+_cache.pages[t].name+'</span>';
						if(t!='index') htm += '<a title="删除" class="close">×</a>';
						htm += '</p>';
					}
					return htm;
				}).find('p[did="'+did+'"]').addClass('active');
				$('.menu-tab p').click(function(){
					var o = $(this),
						did = o.attr('did');
						_cache.did = did;
					if(o.hasClass('active')){
						return;
					}else{
						$('.menu-tab p.active').removeClass('active');
						o.addClass('active');
						$('section.content>div').hide();
						$('#content-'+did).show();
					}
				})
				$('.menu-tab p a.close').click(function(){
					var o = $(this),
						did = o.parent().attr('did')
					;
					_cache.cntObj.remove();
					_cache.tabList = Jui.tools.data.arrayRemove(_cache.tabList,did);
					_cache.did = _cache.tabList[_cache.tabList.length-1];
					$('section.content>div').hide();
					_cache.cntObj.show();
					_cache.getTab();
				})
			},
			init : function(){
				if(!$.cookie('animate')) $.cookie('animate',0);
				Jui.init({
					animate : {
						open : $.cookie('animate'), //是否开启动画
						init : function(){ //初始加载完成后的回调函数
							//编辑器
							_cache.ue = UE.getEditor('editor');
						}
					},
					callback : { //回调函数
						switch1 : function(s){
							//log(s);
							_cache.getDetail();
						},
						switchTop : function(val){
							$.cookie('animate',val);
							Jui.animate.open = val;
						}
					}
				})
				$('body').show();
				_cache.getLocalTime();
				setInterval(function(){
					Jui.task(function(){
						_cache.getLocalTime();
						if(Jui.msg.alertMsg>-1) Jui.msg.alertMsg--;
						if(Jui.msg.alertMsg==0) Jui.tools.alertLeave();
					});
				},1000);
				$('.menu-tree a').click(function(){
					var o = $(this),
						did = o.attr('did');
					if(_cache.tabList.indexOf(did)==-1) { //新打开tab
						_cache.tabList.push(did);
						$('section.content').append('<div id="content-'+did+'"></div>');
						_cache.did = did;
						_cache.getTab();
						_cache.getData();
						if(_cache.did=='doctors') {
							$.get('/admin/getHospitals',function(msg){
								if(msg.status=='ok'){
									$('select[name="hospital"]').html(function(){
										var htm = '';
										$.each(msg.data,function(k,i){
											//log(i);
											htm += '<option value="'+i.id+'">'+i.name+'</option>';
										})
										return htm;
									})
								}
							})
						}
					}else{
						$('.menu-tab p.active').removeClass('active');
						$('.menu-tab p[did="'+did+'"]').addClass('active');
						$('section.content>div').hide();
						$('#content-'+did).show();
					}
				})
				//爬虫配置确定取消动画
				$('.jui-form .submit input').click(function(){
					Jui.animate.form.hide();
				})
				//动画
				$('#animate').attr('s',$.cookie('animate'));
				//修改添加
				$('.jui-edit .tit a.checks').click(function(){
					_cache.update();
				});
				//尺寸
				getSize = (function(){document.getElementById('html').style.fontSize = document.body.clientWidth*100/1920+'px'})();
				//绑定选择文件
				/*$('input[type="file"]').change(function(){
					var o = $(this);
					$('img[name="pic"]').attr('src',Jui.tools.img_to_obj(o[0]));
				})*/
				//log($.cookie('uname'));
				if(!$.cookie('uname')){
					Jui.tools.login(function(){
						var uname = $('.msg.login input[name="username"]').val(),
							passwd = $('.msg.login input[name="password"]').val();
						if(uname=='yht'&&passwd=='yht'){
							$.cookie('uname','yht');
							$('#uname').text($.cookie('uname'));
							Jui.tools.alertLeave();
							Jui.jui.cover.hide();
						}else{
							$('.msg.login p.error').text('账号或密码错误!');
						}
					})
				}else{
					$('#uname').text($.cookie('uname'));
				}
			}
		}
	;
	_cache.init();
	window._cache = _cache;
})