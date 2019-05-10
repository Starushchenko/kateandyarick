$(document).ready(function () {
	$(document).ready(function () {
		new WOW().init();

		$(document.body).imagesLoaded(function () {
			$(document.body).removeClass('loading');
		});

		setTimeout(
				function () {
					$('.intro__names-svg').addClass('intro__names-svg--js-ready')
				}, 300);

	});
});