var Jui = (function(){
	var _obj = {},
		_init = {}
	;
	return {
		html : function(dom,htm){
			dom.html(htm);
			_obj.bind(dom);
		},
		SP : (function(){  //翻页插件
			var _obj = {},
				_init = {},
				_dom = '<li p="1">首页</li><li p="#pre">上一页</li>#pages<li p="#next">下一页</li><li p="#allp">尾页</li>'
			;
			return {
				getList : function(){
					var pages = '';
					for(var i = 0;i<_init.allp;i++){
						pages += '<li class="pg-num" p="'+(i+1)+'">'+(i+1)+'</li>';
					}
					_init.dom.html(function(){
						var pre = _init.page - 1,
							next = _init.page + 1;
						if(pre<1) pre = 1;
						if(next>_init.allp) next = _init.allp;
						return _dom.replace('#pages',pages).replace('#allp',_init.allp).replace('#pre',pre).replace('#next',next);
					}).find('li.pg-num[p="'+_init.page+'"]').addClass('active');
					_init.dom.find('li').click(function(){
						_init.page = $(this).attr('p');
						_obj.getList();
						_init.suc((_init.page-1)*_init.every,_init.every);
					});
				},
				status : 0,
				init : function(arg){
					_obj = this;
					_init = arg;
					_obj.status = 1;
					_init.page = 1;
					_init.allp = parseInt((_init.count-1)/_init.every)+1;
					console.log(_init);
					_obj.getList();
				}
			}
		})(),
		jui : {
			alert : $('#jui-alert'),
			cover : $('#jui-cover'),
			form : $('#jui-form')
		},
		func : function(){
			window.log = function(){
				if(console){for(var arg in arguments) console.log(arguments[arg])}
				else {for(var arg in arguments) alert(str(arguments[args]))}
			};
			window.str=function(k){return JSON && JSON.stringify(k)};
			window.json=function(k){return eval('('+k+')')};
			String.prototype.replaceAll = function(s1,s2){ 
				return this.replace(new RegExp(s1,'gm'),s2); 
			}
		},
		tools: {
			alert : function(tp,msg){
				var msg = msg || _obj.tools.alertDefault[tp].msg;
				_obj.jui.alert.show().html(Dom.alert[tp].replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:_obj.tools.alertDefault[tp].top}).find('button').click(function(){
					if(_obj.tools.alertDefault[tp].callback) _obj.tools.alertDefault[tp].callback();
					else _obj.tools.alertLeave();
				})
				_obj.msg.alertMsg = _obj.tools.alertDefault[tp].leave;
			},
			alertDefault : {
				'msg' : {'msg':'弹出消息',leave:3,top:'10%'},
				'ok' : {'msg':'成功信息！',leave:3,top:'10%'},
				'warn' : {'msg':'警告信息！',leave:3,top:'10%'},
				'confirm' : {'msg':'确定要删除该行信息吗?',leave:-1,top:'0'},
			},
			alertLeave : function(){
				_obj.jui.alert.animate({top:'-'+_obj.jui.alert[0].clientHeight+'px'},300,function(){
					$(this).empty().hide();
					_obj.jui.cover.hide();
				})
			},
			login : function(suc){
				_obj.jui.cover.show();
				_obj.jui.alert.show().html(Dom.alert.login).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'10%'},function(){
					$('.msg.login input[name="username"]').focus();
				}).find('button').click(function(){
					suc && suc();
				})
			},
			confirm : function(msg,suc){
				_obj.jui.cover.show();
				if(msg=='') msg = '确定要删除该信息吗?';
				_obj.jui.alert.show().html(Dom.alert.confirm.replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'0'}).find('button').click(function(){
					var txt = $(this).attr('rel');
					_obj.tools.alertLeave();
					if(txt=='callback') suc && suc();
				})
			},
			data : {
				toDouble : function(n){ //单数转双数(1转01)
					n = n + '';
					if(n.length==1) n = '0' + n;
					return n;
				},
				arrayRemove : function(list,s){
					var lb=[],
						x = list.indexOf(s)
					;
					for(var i in list){
						if(i!=x) lb.push(list[i]) 
					}
					return lb;
				},
			},
			img_to_obj : function(obj){
				var url = '';
				if (navigator.userAgent.indexOf("MSIE")>=1){  //IE
					url = obj.value;
				}
				else if(navigator.userAgent.indexOf("Chrome")>0||navigator.userAgent.indexOf("Firefox")>0){ // Chrome ||Firefox
					var files = obj.files;
					for(i=0;i<files.length;i++){
						url = window.URL.createObjectURL(files.item(i));
					}
				}
				return url;
			},
			time : {
				getStrTime : function(d){ //获取时间字符串。返回值，例：2000-01-01 00:00:00。接收参数，例：{con:['-','-',' ',':',':',' '],now: new Date()}
					var toDouble = _obj.tools.data.toDouble,
						d = d || {},
						con = d.con || ['-','-',' ',':',':',' '],
						now = d.now || new Date(),
						year = now.getFullYear(),
						month = toDouble(now.getMonth()+1),
						day = toDouble(now.getDate()),
						hours = toDouble(now.getHours()),
						minutes = toDouble(now.getMinutes()),
						seconds = toDouble(now.getSeconds()),
						clock = ''
					;
					if(con[0]!='') clock += year + con[0];
					if(con[1]!='') clock += month + con[1];
					if(con[2]!='') clock += day + con[2];
					if(con[3]!='') clock += hours + con[3];
					if(con[4]!='') clock += minutes + con[4];
					if(con[5]!='') clock += seconds + con[5];
					return clock.trim();
				},
			},
		},
		msg : {
			num : 0,
			alertMsg : -1,
			switch : [1,0], //开关参数
		},
		task : function(f){
			var _obj = this;
			_obj.msg.num ++;
			f && f();
		},
		bind : function(domj){ //为某个DOM节点绑定事件(MVVM模式)
			//增加或删除active
			domj.find('[jui-click="active"]').each(function(k,i){
				var o = $(i),
					obj,
					tar = o.attr('jui-tar'), //点击元素
					to = o.attr('jui-to'), //直接目标元素
					son = o.attr('jui-son'), //子类目标元素
					pr = parseInt(o.attr('jui-prt')) || 0, //父类目标元素
					r = o.attr('jui-repeat'), //是否唯一
					k = o.attr('jui-callback') //回调函数
				; 
				if(tar) obj = o.find(tar);
				else obj = o;
				obj.click(function(){
					var ob = $(this),
						prs = ob; //目标元素
					if(to){
						prs = $(to);
					}
					else if(son){
						prs = o.find(son);
					}
					else if(pr>0){
						for(var i=0;i<pr;i++) prs = prs.parent();
					}
					if(r=='1') o.find(tar+'.active').removeClass('active');
					if(prs.hasClass('active')) prs.removeClass('active');
					else prs.addClass('active');
					_init.callback[k] && _init.callback[k](ob);
				})
			})
			//多选框
			domj.find('.jui-table input[type="checkbox"]').click(function(){
				var ts = $(this),
					state = true,
					pt = ts.parent()[0].nodeName.toLowerCase();
				if(pt=='th'){
					ts.parent().parent().parent().parent().parent().find('.tbody tr').each(function(k,i){
						$(i).find('td:eq(0) input[type="checkbox"]')[0].checked = ts[0].checked;
					})
				}
			})
			//开关
			domj.find('[jui-click="jui-switch"]').each(function(k,i){
				var o = $(i);
				o.click(function(){
					var v = _obj.msg.switch[parseInt(o.attr('s'))],
						k = o.attr('jui-callback');
					o.attr('s',v);
					_init.callback[k] && _init.callback[k](v);
				})
			})
			//只能输入数字类型
			domj.find('input[jui-input="onlyInt"]').each(function(k,i){
				var o = $(i);
				o.keyup(function(){o.val(o.val().replace(/\D/g,''))});
			})
		},
		init : function(init){ //初始化
			_obj = this;
			_obj.func();//原生绑定
			_init = init || {};
			_obj.bind($(document));
			//body点击，隐藏某些区域
			$('body').click(function(e){
				var tar = e.target
					,className = tar.className
				;
				if(typeof(className)=='string'){
					if(className.split('jui-nohide').length<2){
						$('.jui-hides').hide();
					}
				}
			})
			//定时任务
			setInterval(function(){
				Jui.task(function(){
					_init.task && _init.task();
					if(Jui.msg.alertMsg>-1) Jui.msg.alertMsg--;
					if(Jui.msg.alertMsg==0) Jui.tools.alertLeave();
				});
			},1000);
		}
	}
})();