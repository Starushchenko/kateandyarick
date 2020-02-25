$(document).ready(function () {
	// Инициализация библиотеки для плавной анимации элементов при появлении
	new WOW().init();

	// Скрытие прелоадера после загрузки изображений
	$(document.body).imagesLoaded(function () {
		$(document.body).removeClass('loading');
	});

	// Иницализация Fancybox без дополнительных кнопок
	$('[data-fancybox]').fancybox({
		buttons: ["close"]
	});

	setTimeout(function () {
		$('.intro').addClass('intro--darked');
		$('.intro__anim-svg').addClass('intro__anim-svg--js-ready');
	}, 1700);

	setTimeout(function () {
		$('.intro').addClass('intro--rendered');
	}, 5000);

	// Инициализация lazy-load для картинок
	$('.lazy').lazy({
		effect: "fadeIn",
		effectTime: 2000,
		threshold: 0
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
				VK.Widgets.Comments("vk_comments", {limit: 15, attach: "graffiti"});
			}
		}
	});

	// Открытие цветов палитры на мобильных
	if ($(document).width() <= 768) {
		$('.wedding__color').on("click", function () {
			$('.wedding__colors-list').toggleClass('wedding__colors-list--full');
			$(this).toggleClass('wedding__color--full');
			$('.hamburger').toggleClass('is-opened-navi');
		})
	}

	//
	$('.hamburger, .global-menu__item').on('click', function () {
		$('.navigation').toggleClass('active');
	});

	// Открытие/скрытие мероприятий свадьбы
	$('.js_show-schedule').on('click', function () {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$('.wedding__schedule-dropdown').slideDown(300);
			$(window).scrollTop($(window).scrollTop()+1);
		} else {
			$(this).removeClass('active');
			$('.wedding__schedule-dropdown').slideUp(300);
		}
	});

	// Галерея фотографий в разделе "Фото и видео"
	var galleryPhotos = [
		{
			"src": "/img/wedding-gallery-1.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-1.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-2.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-2.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-3.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-3.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-4.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-4.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-5.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-5.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-6.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-6.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-7.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-7.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-8.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-8.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-9.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-9.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-10.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-10.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-11.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-11.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-12.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-12.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-13.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-13.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-14.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-14.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-15.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-15.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-16.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-16.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-17.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-17.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-18.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-18.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-19.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-19.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-20.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-20.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-21.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-21.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-22.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-22.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-23.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-23.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-24.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-24.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-25.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-25.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-26.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-26.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-27.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-27.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-28.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-28.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-29.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-29.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-30.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-30.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-31.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-31.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-32.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-32.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-33.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-33.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-34.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-34.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-35.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-35.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-36.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-36.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-37.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-37.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-38.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-38.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-39.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-39.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-40.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-40.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-41.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-41.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-42.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-42.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-43.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-43.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-44.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-44.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-45.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-45.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-46.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-46.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-47.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-47.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-48.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-48.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-49.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-49.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-50.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-50.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-51.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-51.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-52.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-52.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-53.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-53.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-54.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-54.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-55.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-55.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-56.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-56.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-57.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-57.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-58.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-58.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-59.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-59.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-60.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-60.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-61.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-61.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-62.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-62.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-63.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-63.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-64.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-64.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-65.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-65.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-66.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-66.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-67.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-67.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-68.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-68.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-69.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-69.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-70.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-70.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-71.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-71.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-72.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-72.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-73.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-73.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-74.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-74.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-75.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-75.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-76.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-76.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-77.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-77.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-78.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-78.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-79.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-79.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-80.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-80.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-81.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-81.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-82.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-82.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-83.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-83.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-84.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-84.jpg"
			}
		},
		{
			"src": "/img/wedding-gallery-85.jpg",
			"opts": {
				"thumb": "/img/wedding-gallery-thumb-85.jpg"
			}
		}
	]
	$(".js_photogallery-trigger").on('click', function() {
		$.fancybox.open(galleryPhotos, {
			loop : true,
			thumbs : {
				autoStart : true
			},
			mobile: {
				thumbs : {
					autoStart : false
				},
			}
		});
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
