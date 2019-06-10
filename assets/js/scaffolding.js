$(document).ready(function () {
	// Инициализация библиотеки для плавной анимации элементов при появлении
	new WOW().init();

	// Скрытие прелоадера после загрузки изображений
	$(document.body).imagesLoaded(function () {
		$(document.body).removeClass('loading');
	});

	setTimeout(function () {
		$('.intro').addClass('intro--darked');
		$('.intro__anim-svg').addClass('intro__anim-svg--js-ready');
	}, 1700);

	setTimeout(function () {
		$('.intro').addClass('intro--rendered');
	}, 5000);

	// Инициализация lazy-load для картинок
	$(function () {
		$.each($('.lazy'), function (i, item) {
			if (isElementInViewport(item)) {
				$('.lazy').lazy();
			}
		})
	});

	$(document.body).scroll(function () {
		$('.lazy').lazy();
	});

	// Скрипт плавной прокрутки до якорей
	$(function () {
		$("a[href^='#']").click(function () {
			var _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top + "px"});
			return false;
		});
	});

	// Инициализация вращения плиток js-tilt на ховере
	$('.js-tilt').tilt();
});

// document.documentMode - свойство, доступное только на IE. Выключаем анимацию svg в IE
if (document.documentMode) {
	$('.intro__anim-svg path[id]').css({
		strokeDasharray: 0
	})
}

// Проверка, попал ли элемент во вьюпорт
function isElementInViewport(el) {
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;

	while (el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}

	return (
			top < (window.pageYOffset + window.innerHeight - 120) &&
			left < (window.pageXOffset + window.innerWidth) &&
			(top + height) > window.pageYOffset &&
			(left + width) > window.pageXOffset
	);
}