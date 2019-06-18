$(document).ready(function () {
	$('.gallery__stage').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		dots: false,
		arrows: true
	});
});