var Main = (function(){
	var _obj = {},
		_key = '',
		_box = '',
		_tabList = ['index'],
		_ue = UE.getEditor('editor');
	return {
		getUE : function(){
			return _ue;
		},
		update : function(){
			var id = $('.jui-edit table').attr('did'),
				name = $('.jui-edit input[name="name"]').val().trim(),
				pdate = $('.jui-edit input[name="pdate"]').val().trim() || Jui.tools.time.getStrTime({con:['-','-',' ','','','']}),
				abs = $('.jui-edit textarea[name="abs"]').val().trim(),
				rank = $('.jui-edit textarea[name="rank"]').val() || 0,
				text = _ue.getContent(),
				pic = $('.jui-edit img[name="pic"]').attr('src'),
				hid = $('select[name="hospital"]').val(),
				cid = $('select[name="hcountry"]').val(),
				j = {id,id,name:name,pdate:pdate,abs:abs,rank:rank,text:text,pic:pic,hid:hid,cid:cid}
			;
			log(j);
			$.post(Config.menuk[_key].ajax.update,j,function(msg){
				if(msg.status=='ok'){
					_obj.getDetail();
					Jui.tools.alert('ok');
					$('.jui-edit').toggleClass('active');
				}
			});
		},
		update2 : function(){
			var id = $('.jui-edit-simple table').attr('did'),
				name = $('.jui-edit-simple input[name="name"]').val().trim(),
				rank = $('.jui-edit-simple textarea[name="rank"]').val() || 0,
				j = {id,id,name:name,rank:rank}
			;
			log(j);
			$.post(Config.menuk[_key].ajax.update,j,function(msg){
				if(msg.status=='ok'){
					_obj.getDetail();
					Jui.tools.alert('ok');
					$('.jui-edit-simple').toggleClass('active');
				}
			});
		},
		empty : function(){
			$('.jui-edit input[name="pdate"]').val(Jui.tools.time.getStrTime({con:['-','-',' ','','','']}));
			$('.jui-edit table').attr('did','');
			$('.jui-edit input[name="name"]').val('');
			$('.jui-edit textarea[name="abs"]').val('');
			$('.jui-edit textarea[name="rank"]').val(0);
			_ue.setContent('');
			$('.jui-edit img[name="pic"]').attr('src','');
			if(_key=='doctors' || _key=='success') $('.jui-edit td.hospital').removeClass('hide');
			else $('.jui-edit td.hospital').addClass('hide');
			if(_key=='hospitals') $('.jui-edit td.hcountry').removeClass('hide');
			else $('.jui-edit td.hcountry').addClass('hide');
		},
		empty2 : function(){
			$('.jui-edit-simple input[name="name"]').val('');
			$('.jui-edit-simple input[name="rank"]').val(0);
		},
		getHtm : function(data,suc){
			var htm = '',
				i = 0,
				tmp = Dom[_key],
				tbody = $('#'+_key+' tbody')
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
			$('#'+_key+' .tit span').text(data.length);
			Jui.html(tbody,htm);
			//删除
			tbody.find('a.remove').click(function(e){
				var tr = $(this).parent().parent(),
					did = tr.attr('did')
				;
				Jui.tools.confirm('',function(){
					$.get(Config.menuk[_key].ajax.del,{id:did},function(b){
						if(b.status=='ok'){
							_obj.getDetail();
						}
					})
				})
			})
		},
		getDetail : function(){ //请求模板里面数据
			var arg = {};
			if(_key=='contact') arg.check = function(){
				if($('.isCheck').attr('s')=='0') return '1';
				return '0';
			}();
			$.ajax({
				url : Config.menuk[_key].ajax.get,
				data : arg,
				dataType : 'json',
				success : function(back){
					if(back.status=='ok'){
						log(back);
						if(_key == 'success' || _key == 'news' || _key == 'class'){
							_obj.getHtm(back.data,function(tmp,j){
								var dom =  tmp.replace('#name',j.name).replace('#id',j.id).replace('#pic',j.pic);
								return dom;
							});
						}
						else if(_key=='hcountry') {
							_obj.getHtm(back.data,function(tmp,j){
								var dom =  tmp.replace('#name',j.name).replace('#id',j.id).replace('#rank',j.rank);
								return dom;
							});
						}
						else if(_key=='hospitals'){
							_obj.getHtm(back.data,function(tmp,j){
								var dom =  tmp.replace('#name',j.name).replace('#id',j.id).replace('#pic',j.pic).replace('#cid',j.cid).replace('#cname',j.cname);
								return dom;
							});
						}
						else if(_key=='doctors') {
							_obj.getHtm(back.data,function(tmp,j){
								var dom =  tmp.replace('#name',j.name).replace('#id',j.id).replace('#pic',j.pic).replace('#hid',j.hid).replace('#hname',j.hname);
								return dom;
							});
						}
						else if(_key=='contact') {
							_obj.getHtm(back.data,function(tmp,j){
								var dom =  tmp.replace('#id',j.id).replace('#name',j.name).replace('#sex',j.sex).replace('#email',j.email).replace('#phone',j.phone).replace('#advice',j.advice).replace('#reply',j.reply).replace('#time',j.time);
								log(j);
								if(j.check==1) dom = dom.replace('#check',' active');
								else dom = dom.replace('#check','');
								return dom;
							});
						}
					}
				}
			})
			return _obj;
		},
		getTemp : function(){ //请求模板
			_box.html(Dom.stats.loading);
			$.ajax({
				url : 'htm/'+Config.menuk[_key].htm,
				dataType : 'html',
				success : function(back){
					Jui.html(_box,back);
					//设置按钮
					_box.find('.tit a.button').click(function(e){
						e.stopPropagation(); //阻止事件冒泡
						var ts = $(this),
							stdiv = ts.parent().parent().find('.stdiv')
						;
						if(stdiv.css('display')=='none') stdiv.show();
						else stdiv.hide();
					})
					_obj.getDetail();
				}
			})
			return _obj;
		},
		tabClick : function(tar){
			tar.click(function(){
				var o = $(this);
				_key = o.attr('key');
				_box = $('#content-'+_key);
				if(o.hasClass('active')){
					return;
				}else{
					$('.menu-tab p.active').removeClass('active');
					o.addClass('active');
					$('section.content>div').hide();
					_box.show();
				}
			})
			tar.find('a.close').click(function(){
				var o = $(this),
					prt = o.parent(),
					key = prt.attr('key')
				;
				$('#content-'+key).remove();
				_tabList = Jui.tools.data.arrayRemove(_tabList,key);
				if(prt.hasClass('active')){
					_key = _tabList[_tabList.length-1];
					$('.menu-tab p[key="'+_key+'"]').addClass('active');
					_box = $('#content-'+_key);
					_box.show();
				}
				prt.remove();
			})
		},
		getLocalTime : function(){ //页面右上角获取时间
			$('#localTime').text(Jui.tools.time.getStrTime({
				con:['-','-',' ',':',':',' ']
			}));
		},
		init : function(){
			_obj = this;
			_obj.tabClick($('.menu-tab p'));
			Jui.init({
				callback : {
					switch1 : function(){
						_obj.getDetail();
					},
					menu1 : function(o){
						_key = o.attr('key');
						var is_new = 0;
						if(_tabList.indexOf(_key)==-1){
							_tabList.push(_key);
							is_new = 1;
							$('section.content').append('<div id="content-'+_key+'"></div>');
							$('.menu-tab').append('<p key="'+_key+'"><span>'+Config.menuk[_key].name+'</span> <a title="删除" class="close">×</a></p>');
							$('.menu-tab p.active').removeClass('active');
							$('.menu-tab p[key="'+_key+'"]').addClass('active');
							_obj.tabClick($('.menu-tab p:last'));
							if(_key=='doctors' || _key=='success'){
								$.get(Config.menuk.hospitals.ajax.get,function(msg){
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
							}else if(_key=='hospitals'){
								$.get(Config.menuk.hcountry.ajax.get,function(msg){
									if(msg.status=='ok'){
										$('select[name="hcountry"]').html(function(){
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
							$('.menu-tab p[key="'+_key+'"]').addClass('active');
							$('section.content>div').hide();
							$('#content-'+_key).show();
						};
						_box = $('#content-'+_key);
						$('section.content>div').hide();
						_box.show();
						if(is_new==1) {
							_obj.getTemp();
						}
					},
					add1 : function(o){
						_obj.empty();
					},
					add2 : function(o){
						_obj.empty2();
					},
					edit1 : function(o){
						_obj.empty();
						var did = o.parent().parent().attr('did');
						$.get(Config.menuk[_key].ajax.get,{id:did},function(msg){
							if(msg.status=='ok'){
								$('.jui-edit table').attr('did',did);
								var j = msg.data[0];
								//log(msg);
								$('.jui-edit input[name="name"]').val(j.name);
								$('.jui-edit input[name="pdate"]').val(j.pdate.substring(0,10));
								$('.jui-edit textarea[name="abs"]').val(j.abs);
								$('.jui-edit textarea[name="rank"]').val(j.rank);
								_ue.setContent(j.text);
								$('.jui-edit img[name="pic"]').attr('src',j.pic);
							}
						})
					},
					check1 : function(o){
						var did = o.parent().parent().attr('did')
							check = '0';
						if(o.hasClass('active')){
							o.removeClass('active');
							check = '1';
						}
						else {
							o.addClass('active');
						}
						log({id:did,check:check});
						$.get('/admin/contact/check',{id:did,check:check},function(back){
							if(back.status=='ok'){
								_obj.getDetail();
							}
						})
					}
				},
				task : function(){
					_obj.getLocalTime();
				}
			})
			_obj.getLocalTime();
			//修改添加
			$('.jui-edit .tit a.checks').click(function(){
				_obj.update();
			});
			//修改添加
			$('.jui-edit-simple .tit a.checks').click(function(){
				_obj.update2();
			});
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
})();
Main.init();