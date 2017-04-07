/*
	footerģ��
	�ײ���Ϣģ��
	������Ϣ����:footerDataComplete
 */
define(function(require) {
	// ������ʽ�ļ�
	require('footer/footer.css');
	require('footer/copyright');

	MVC
	// �����ͼ
	.addView('footer', function(model, tempFormat) {
		// ��ȡԪ��
		var dom = $('#footer');
		// ��ȡ����
		var data = model.get('footer');

		// �����ʽ��ģ���ַ���
		var temp = [
			'<div class="hr2"></div>',
			'<div class="posts">',
				'<h3>{#title1#}</h3>',
				'<ul class="postsList">{#postsUl#}</ul>',
			'</div>',
			'<div class="flickr">',
				'<h3>{#title2#}</h3>',
				'<ul class="flickrList">{#flickrUl#}</ul>',
			'</div>',
			'<div class="about">',
				'<h3>{#title3#}</h3>',
				'<p>{#msg1#}</p>',
				'<br />',
				'<p>{#msg2#}</p>',
			'</div>',
			'<div class="git last">',
				'<h3>{#title4#}</h3>',
				'<input type="text" name="name" /> Name*',
				'<input type="text" name="email" /> Email*',
				'<textarea name="" id="" cols="30" rows="10"></textarea>',
				'<input type="submit" value="submit" />',
			'</div>'
		].join('');
		// postsģ���ַ���
		var postsTemp = [
			'<li class="posts-item {#cls#}">',
				'<span>',
					'<em class="day">{#day#}</em>',
					'<em class="month">{#month#}</em>',
				'</span>',
				'<a href="">{#content#}</a>',
			'</li>'
		].join('');
		// flickrģ���ַ���
		var flickrTemp = [
			'<li class="flickr-item">',
				'<a href="javascript:void();">',
					'<img src="imgs/footer/{#src#}" alt="" />',
				'</a>',
			'</li>'
		].join('');

		// ����html�ַ���
		var html = postsHtml = flickrHtml = '';
		// ��ʽ��postsģ���ַ���
		data.posts.list.forEach(function(obj, index) {
			postsHtml += tempFormat(postsTemp, {
				cls: index === 0 ? 'first' : '',
				day: obj.day,
				month: obj.month,
				content: obj.content
			});
		});
		// ��ʽ��filckrģ���ַ���
		data.img.list.forEach(function(value, index) {
			flickrHtml += tempFormat(flickrTemp, {
				src: value
			});
		});

		html = tempFormat(temp, {
			title1: data.posts.title,
			title2: data.img.title,
			title3: data.about.title,
			title4: data.touch.title,
			postsUl: postsHtml,
			flickrUl: flickrHtml,
			msg1: data.about.list[0],
			msg2: data.about.list[1]
		});

		// ��Ⱦҳ��
		dom.html(html);
		// ����dom
		return dom;
	})
	// ��ӿ�����
	.addCtrl('footer', function(model, view, observer) {
		// ��ʼ������
		var init = function() {
			// ��Ⱦ��ͼ
			view.render('footer');

			// ������Ϣ��֪ͨ��Ȩģ�������Ⱦ��
			observer.fire('render');
		}

		// �첽��������
		// ԭjson�ļ�-31�У����������ţ����»�ȡʧ��
		$.get('data/footer.json',function(res) {
			if(res && res.errno === 0) {
				// ��ģ�ʹ洢����
				model.set('footer', res.data);
				// ������Ϣ
				observer.fire('footerDataComplete');
			}
		});

		// ������Ϣ
		observer.regist('footerDataComplete', function() {
			init();
		});

	});
});