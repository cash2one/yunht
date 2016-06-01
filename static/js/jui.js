(function(){
	var Jui = (function(){
		var _obj = {},
			_cw = 1400,
			_bind = {
				menu : function(){ //菜单
				var menuActive = '',
					menuAll = '';
					$('.mbmenu>p>a').each(function(k,i){
						if($(i).hasClass('active')) menuActive = $(i).prop("outerHTML");
						else menuAll += $(i).prop("outerHTML");
					})
					$('.mbmenu>p').html(menuActive+menuAll);
					$('.mbmenu>p>a').click(function(){
						var o = $(this),
							prt = o.parent(),
							link = o.attr('link')
						;
						if(o.hasClass('active')){
							if(prt.attr('show')=='0') prt.attr('show','1');
							else prt.attr('show','0');
						}else location.href = link;
					})

				}
			}
			_html = document.getElementById('html');
		return {
			run : function(){
				console.log('Jui run!');
			},
			getSize : function(){
				_cw = document.body.clientWidth;
				if(_cw>=1002){
					_html.style.fontSize = _cw*100/1400+'px';
					$('.mbblock').hide();
					$('.pcblock').show();
				}
				else{
					_html.style.fontSize = _cw*100/640+'px';
					$('.mbblock').show();
					$('.pcblock').hide();
				}
			},
			jui : {
				alert : $('#jui-alert'),
				cover : $('#jui-cover')
			},
			tools: {
				alertMsg : function(msg){
					var dom_alertMsg = Dom.tools.alertMsg;
					_obj.jui.alert.show().html(dom_alertMsg.replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'20%'});
					_obj.msg.alertMsg = 2;
				},
				alertLeave : function(){
					_obj.jui.alert.animate({top:'-'+_obj.jui.alert[0].clientHeight+'px'},300,function(){
						$(this).empty().hide();
						_obj.jui.cover.hide();
					})
				},
				confirm : function(back){
					_obj.jui.cover.show();
					var dom_confirm = Dom.tools.confirm,
						back = back || {},
						msg = back.msg || '确定要删除该行信息吗?',
						suc = back.suc;
					_obj.jui.alert.show().html(dom_confirm.replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'0'}).find('button').click(function(){
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
						return clock;
					},
					str_add_date : function(dd,dadd){
						return _obj.tools.time.int_to_str(_obj.tools.time.str_to_int(dd) + dadd * 24 * 3600);
					},
					str_to_int : function(d){
						return parseInt((new Date(Date.parse(d.replace(/-/g, "/"))).getTime()+'').substr(0, 10));
					},
					int_to_str : function(d,arg) {
						var dt = new Date(parseInt(d) * 1000),
							toDouble = _obj.tools.data.toDouble,
							back = '';
						if(arg==1) back = dt.getHours()+':'+dt.getMinutes();
						else back = dt.getFullYear()+'-'+toDouble(dt.getMonth()+1)+'-'+toDouble(dt.getDate());
						return back;
					},
				},
			},
			msg : {
				num : 0,
				alertMsg : -1
			},
			task : function(f){
				var _obj = this;
				_obj.msg.num ++;
				f && f();
			},
			bind : function(args){ //为某个DOM节点绑定事件(MVVM模式)
				//展开收回-后台
				args.dom.find('[jui-click="open-close"]').each(function(k,i){ //给需要点击的组件加上如下样式：class="open-close" 目标选择器：jui-tar="table"
					var ts = $(i),
						s = ts.attr('jui-tar'),
						obj = ts.parent().find(s);
					ts.click(function(){
						if(obj.css('display')=='none') {
							obj.show();
							args.show && args.show(ts);
						}
						else {
							obj.hide();
							args.hide && args.hide(ts);
						}
					})
				})
				//关闭窗口-后台
				args.dom.find('[jui-click="close"]').each(function(k,i){
					var ts = $(i),
						pn = parseInt(ts.attr('close')) || 1,
						prt = ts;
					for(var i=0;i<pn;i++) prt = prt.parent();
					ts.click(function(){
						prt.animate({
							width:prt.attr('w'),height:prt.attr('h'),left:prt.attr('l'),top:prt.attr('t')
						},300,function(){
							prt.hide()
						})
					})
				})
				//展开隐藏展示
				args.dom.find('[jui-click="show-hide"]').each(function(k,i){
					var ts = $(i),
						s = ts.attr('jui-tar'),
						obj = $(s);
					ts.click(function(){
						if(obj.css('display')=='none') {
							obj.show();
						}
						else {
							obj.hide();
						}
					})
				})
				//增删active
				args.dom.find('[jui-click="active"]').each(function(k,i){
					var o = $(i),
						tar = o.attr('jui-tar'),
						block = o.attr('jui-block'),
						oy = parseInt(o.attr('jui-only'))
					;
					if(block){
						o.find(block).each(function(k1,i1){
							var o1 = $(i1),
								clk = o1.find(tar);
							clk.click(function(){
								if(o1.hasClass('active')) o1.removeClass('active');
								else o1.addClass('active');
								if(oy==1) o.parent().find('.active').removeClass('active');
							})
						})
					}else{
						o.find(tar).click(function(){
							var o1 = $(this);
							if(o1.hasClass('active')) {
								return;
							} 
							else{
								o.find(tar+'.active').removeClass('active');
								o1.addClass('active');
							}
						})
					}
				})
				//展开唯一显示,增删active
				args.dom.find('[jui-click="only-show"]').each(function(k,i){
					var o = $(i),
						tar = o.find(o.attr('jui-tar'))
					;
					tar.click(function(){
						if(o.hasClass('active')) {
							o.removeClass('active')
						}
						else{
							o.parent().find('.active').removeClass('active');
							o.addClass('active');
						}
					})
				})
				//返回顶部
				args.dom.find('[jui-click="toTop"]').click(function(){
					$('html,body').animate({scrollTop:'0px'});
				})
				//切换tab
				args.dom.find('[jui-click="change-active"]').each(function(k,i){
					var ts = $(i),
						s = ts.attr('jui-tar'),
						obj = ts.find(s);
					obj.click(function(){
						ts.find(s+'.active').removeClass('active');
						$(this).addClass('active');
					})
				})
				//切换tab切换div
				args.dom.find('[jui-click="change-box"]').each(function(k,i){
					var ts = $(i),
						s = ts.attr('jui-tar'),
						to = ts.attr('jui-to'),
						obj = ts.find(s);
					obj.click(function(){
						var o = $(this),
							i = o.attr('i');
						ts.find('.active').removeClass('active');
						o.addClass('active');
						$('.'+to+'.active').removeClass('active');
						$('.'+to+'[i="'+i+'"]').addClass('active');
					})
				})
				//动画hover1
				args.dom.find('[jui-animate="hover1"]').each(function(k,i){
					var ts1 = $(i),
						s = ts1.attr('jui-tar'),
						obj = ts1.find(s);
					obj.hover(function(){
						var ts = $(this),
							bw = 12,
							tw = ts[0].offsetWidth
						;
						ts.append('<b class="before"></b>').find('b.before').css({width:'1px',left:tw*0.5+'px'}).animate({width:bw+'px',left:(tw*0.5-bw+2)+'px'},200,function(){
							$(this).css({'transform':'rotate(-45deg)'});
						});
						ts.prepend('<b class="after"></b>').find('b.after').css({width:'1px',left:tw*0.5+'px'}).animate({width:bw+'px',left:(tw*0.5-2)+'px'},200,function(){
							$(this).css({'transform':'rotate(45deg)'});
						});
					},function(){
						var ts = $(this),
							tw = ts[0].offsetWidth
						;
						ts.find('b').css({'transform':'rotate(0deg)'}).animate({width:'1px',left:tw*0.5+'px'},200,function(){$(this).css({background:'#fff'}).remove()});
					})
				})
			},
			animate : {
				init : function(){
					/*$('body').css({top:'40%',left:'40%',width:'10%',height:'10%'}).animate({top:0,left:0,width:'100%',height:'100%'},200); //中间向四周扩大
					$('body').css({top:'-100%',left:'40%',width:'10%',height:'10%'}).animate({top:'45%'},300,function(){
						$('body').animate({top:0,left:0,width:'100%',height:'100%'});
						$('header').css({left:'-100%'}).animate({left:0},200,function(){
							$('section.category').animate({top:0});
						})
					})*/
				},
			},
			init : function(){ //初始化
				_obj = this;
				//_obj.run();
				_obj.bind({dom:$(document)});
				_obj.animate.init();
				String.prototype.replaceAll = function(s1,s2){ 
					return this.replace(new RegExp(s1,"gm"),s2); 
				}
				_bind.menu();
				_obj.getSize();
				$(window).resize(function(){_obj.getSize()}) //改变尺寸
			}
		}
	})();
	window.Jui = Jui;
})();