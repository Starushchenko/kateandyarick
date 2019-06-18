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

	// Дополнительный класс для корневого элемента, если браузер - IE или Edge
	if (/MSIE 9/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) ||
			/rv:11.0/i.test(navigator.userAgent)) {

		document.documentElement.className += ' old-browser';

		$('.intro__anim-svg path, .wedding__date-day path, .wedding__date-year path').css({
			strokeDasharray: "0"
		})
	} else if (/Edge\/\d./i.test(navigator.userAgent)) {
		document.documentElement.className += ' edge-browser';
	}

	// Добавление класса к блоку wedding, когда он в области видимости
	var weddingSection = document.querySelector('.wedding');
	$(document).scroll(function () {
		if (isElementInViewport(weddingSection)) {
			weddingSection.classList.add('wedding--visible')
		}
	});

	// Переход по ссылке на члена команды по второму клику на мобильных
	if ($(document).width() <= 860) {
		$('a.grid__inner').one("click", function (event) {
			event.preventDefault();
		})
	}

	// Lazy-load загрузка виджета для комментариев ВК
	$(window).scroll(function () {
		if ($(window).scrollTop() + $(window).height() >= $('#vk_comments').offset().top) {
			if (!$('#vk_comments').attr('loaded')) {

				$('#vk_comments').attr('loaded', true);
				VK.Widgets.Comments("vk_comments", {limit: 15, width: "700", attach: "graffiti"});
			}
		}
	});
});

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