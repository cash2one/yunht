var Config = (function(){
	var _obj = {},
		_jo = {
			menu: $('#menu-tree'),
		},
		_menu = [
			{
				key : 'cnt',
				name : '内容管理',
				items : [
					{key:'success', name:'成功案例',htm:'success.html', ajax:{
						get : '/admin/success/get',
						update : '/admin/success/update',
						del : '/admin/success/remove'
					}},
					{key:'hcountry', name:'医院国家',htm:'hcountry.html', ajax:{
						get : '/admin/hcountry/get',
						update : '/admin/hcountry/update',
						del : '/admin/hcountry/remove'
					}},
					{key:'hospitals', name:'医院列表',htm:'hospital.html', ajax:{
						get : '/admin/hospital/get',
						update : '/admin/hospital/update',
						del : '/admin/hospital/remove'
					}},
					{key:'doctors', name:'医生列表',htm:'doctor.html', ajax:{
						get : '/admin/doctor/get',
						update : '/admin/doctor/update',
						del : '/admin/doctor/remove'
					}},
					{key:'news', name:'新闻',htm:'news.html', ajax:{
						get : '/admin/news/get',
						update : '/admin/news/update',
						del : '/admin/news/remove'
					}},
					{key:'class', name:'患者课堂',htm:'class.html', ajax:{
						get : '/admin/class/get',
						update : '/admin/class/update',
						del : '/admin/class/remove'
					}},
				]
			},
			{
				key: 'meg',
				name: '信息管理',
				items: [
					{key: 'contact', name:'联系我们', htm: 'contact.html', ajax:{
						get : '/admin/contact/get',
						check : '/admin/contact/check'
					}},
				]
			}
		],
		_menuk = function(){
			var r = {};
			$.each(_menu,function(m,n){
				$.each(n.items,function(k,j){
					r[j.key] = j;
				})
			})
			return r;
		}()
	;
	_jo.menu.html(function(){
		var htm = '';
		$.each(_menu,function(m,n){
			htm += '<p class="active">';
				htm += '<span>'+n.name+' ('+n.items.length+')</span>';
				$.each(n.items,function(k,j){
					htm += '<a key="'+j.key+'">'+j.name+'</a>';
				})
			htm += '</p>';
		});
		return htm;
	})
	return {
		menu :  _menu,
		menuk :  _menuk,
		host : 'http://192.168.1.251:6800/'
	};
})(); 