function getInstThumbsByTag(tag, elemsCount, elemToPaste) {
	// Получаем JSON с информацией по хэштегу
	var imagesJSON = `https://www.instagram.com/explore/tags/${tag}/?__a=1`;
	$.getJSON(imagesJSON, {
		format: "json"
	})
	.done(function (data) {
		// Получаем детальный массив с фотографиями, обрезаем на нужное кол-во элементов
		var hashtagItems = data.graphql.hashtag.edge_hashtag_to_media.edges.slice(0, elemsCount);

		// Формируем шаблон для вставки. Ниже используется шорткод в качестве ссылки на пост, в качестве картинки - превью размером 640х640, подпись поста и количество лайков
		$.each(hashtagItems, function (i, item) {
			var imageTemplate =
					`<a class="instagram__item-link wow fadeIn" data-wow-delay="0.${i+1}s" data-wow-offset="50" href="https://www.instagram.com/p/${item.node.shortcode}/" target="_blank">
						<img class="instagram__image" src="${item.node.thumbnail_resources[4].src}" alt="${ (item.node.edge_media_to_caption.edges[0]) ? item.node.edge_media_to_caption.edges[0].node.text.slice(0, 150) : ''}..." title="${ (item.node.edge_media_to_caption.edges[0]) ? item.node.edge_media_to_caption.edges[0].node.text.slice(0, 150) : ''}...">
						<span class="instagram__likes-count">${item.node.edge_liked_by.count}</span>
						<p class="instagram__image-desc">${ (item.node.edge_media_to_caption.edges[0]) ? item.node.edge_media_to_caption.edges[0].node.text.slice(0, 340) + '...' : ''}</p>
					</a>`;
			elemToPaste.append(imageTemplate);
		});
	});
}

$(document).ready(function () {

	$(document).on('scroll', scrollInstagramHandle);
	function scrollInstagramHandle() {
		var instTop = $('.instagram').offset().top;
		var instBottom = $('.instagram').offset().top + $('.instagram').outerHeight();
		var screenBottom = $(window).scrollTop() + $(window).innerHeight();
		var screenTop = $(window).scrollTop();

		if ((instBottom > instTop) && (screenTop < screenBottom)) {
			getInstThumbsByTag('стобойтакблизко', 4, $('.instagram__stage'));
			$(document).off('scroll', scrollInstagramHandle)
		}
	}
});