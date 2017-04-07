/*
	����ģ�͡���ͼ��������
	��Ϣname��headerDataComplete
*/
define(function(require, exports, module) {
	// ����header.css
	require('header/header.css');
	
	MVC
	// �����ͼ
	.addView('header', function(model,tempFormat) {
		// ��ȡԪ��
		var dom = $('#header');
		// ��ȡ����
		var data = model.get('header');

		// ����ģ���ַ���
		var temp = [
					'<div class="inner">',
						'<div class="logo-container">',
							'<img src="imgs/header/logo.png" alt="" />',
							'<ul>{#iconUl#}</ul>',
						'</div>',
						'<ul class="nav shadow">{#navUl#}</ul>',
					'</div>'].join('');
		var iconTemp = '<li><a href="{#href#}"><img src="imgs/header/{#img#}" alt="" /></a></li>';
		var navTemp = '<li class="{#cls#}"><a href="{#href#}">{#title#}</a>{#childList#}</li>';
		var childNavTemp = '<ul class="childList">{#childNavUl#}</ul>'

		var html = iconHtml = navHtml = childNavHtml = '';
		// ��ʽ��ͼ��
		data.icon.forEach(function(obj, index) {
			iconHtml += tempFormat(iconTemp, obj);
		});

		// ��ʽ��������
		data.nav.forEach(function(obj1, index1) {
				// ����Ե�������ʽ������
				childNavHtml = '';
				// �ж��Ƿ������б�
				if(obj1.list) {
					// �������б�
					obj1.list.forEach(function(obj2, index2) {
						// ��ʽ���ӵ�����
						childNavHtml += tempFormat(navTemp, {
							cls:'child-nav-item',
							href:obj2.href,
							title:obj2.title,
							childList:''
						});
					});
					// �ٴθ�ʽ���ӵ����������ul��ǩ
					childNavHtml = tempFormat(childNavTemp, {
						childNavUl:childNavHtml
					});
				}
				// ��ʽ��һ��������
				navHtml += tempFormat(navTemp, {
					cls:'nav-item',
					href:obj1.href,
					title:obj1.title,
					childList:childNavHtml
				});
			});

		//��ʽ��html
		html = tempFormat(temp, {
			iconUl:iconHtml,
			navUl:navHtml
		});

		// ��Ⱦ��ҳ����
		dom.html(html);
		// ����domԪ��
		return dom;
	})
	// ��ӿ�����
	.addCtrl('header', function(model, view, observer) {
		function init() {
			// ��Ⱦ��ͼ
			var dom = view.render('header');

			// ������룬�����б�
			dom.delegate('.nav-item', 'mouseenter', function (event) {
				$(this).find('ul').stop().slideDown(200);
			})
			// ����Ƴ����ع��б�
			.delegate('.nav-item', 'mouseleave', function (event) {
				$(this).find('ul').stop().slideUp(200);
			})
		}

		// �첽��������
		$.get('data/header.json', function (res)
			{
				if(res && res.errno === 0)
				{
					// �洢����
					model.set('header', res.data);
					// ������Ϣ
					observer.fire('headerDataComplete');
				}
			});

		// ������Ϣ
		observer.regist('headerDataComplete', function()
			{
				init();
			});
		
	});

});