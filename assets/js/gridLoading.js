/**
 * Grid Loading Animations
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 *
 * Modified for its own purposes by Yaroslav Starushchenko
 */

;(function (window) {

	/**
	 * GridLoaderFx obj.
	 */
	function GridLoaderFx(el, options) {
		this.el = el;
		this.items = this.el.querySelectorAll('.grid__item > .grid__inner');
	}

	/**
	 * 4 эффекта с анимацией, по умолчанию - Shu.
	 */
	GridLoaderFx.prototype.effects = {
		'Bes': {
			revealer: true,
			revealerOrigin: '100% 50%',
			animeRevealerOpts: {
				duration: 800,
				delay: function (t, i) {
					return i * 75;
				},
				easing: 'easeInOutQuart',
				scaleX: [1, 0]
			},
			animeOpts: {
				duration: 800,
				easing: 'easeInOutQuart',
				delay: function (t, i) {
					return i * 75;
				},
				opacity: {
					value: [0, 1],
					easing: 'linear'
				},
				scale: [0.8, 1]
			}
		},
		'Seker': {
			revealer: true,
			revealerOrigin: '50% 100%',
			animeRevealerOpts: {
				duration: 500,
				delay: function (t, i) {
					return i * 50;
				},
				easing: [0.7, 0, 0.3, 1],
				translateY: [100, 0],
				scaleY: [1, 0]
			},
			animeOpts: {
				duration: 500,
				easing: [0.7, 0, 0.3, 1],
				delay: function (t, i) {
					return i * 50;
				},
				opacity: {
					value: [0, 1],
					duration: 400,
					easing: 'linear'
				},
				translateY: [100, 0],
				scale: [0.8, 1]
			}
		},
		'Nut': {
			revealer: true,
			revealerColor: '#1d1d1d',
			itemOverflowHidden: true,
			animeRevealerOpts: {
				easing: 'easeOutCubic',
				delay: function (t, i) {
					return i * 100;
				},
				translateX: [
					{value: ['101%', '0%'], duration: 400},
					{value: ['0%', '-101%'], duration: 400}
				]
			},
			animeOpts: {
				duration: 900,
				easing: 'easeOutCubic',
				delay: function (t, i) {
					return 400 + i * 100;
				},
				opacity: {
					value: 1,
					duration: 1,
					easing: 'linear'
				},
				scale: [0.8, 1]
			}
		},
		'Shu': {
			lineDrawing: true,
			animeLineDrawingOpts: {
				duration: 800,
				delay: function (t, i) {
					return i * 150;
				},
				easing: 'easeInOutSine',
				strokeDashoffset: [anime.setDashoffset, 0],
				opacity: [
					{value: [0, 1]},
					{value: [1, 0], duration: 200, easing: 'linear', delay: 500}
				]
			},
			animeOpts: {
				duration: 800,
				easing: [0.2, 1, 0.3, 1],
				delay: function (t, i) {
					return i * 150 + 800;
				},
				opacity: {
					value: [0, 1],
					easing: 'linear'
				},
				scale: [0.5, 1]
			}
		}
	};

	GridLoaderFx.prototype._render = function (effect) {
		// Сброс стилей для перерисовки.
		this._resetStyles();

		var self = this,
				effectSettings = this.effects[effect],
				animeOpts = effectSettings.animeOpts;

		if (effectSettings.perspective != undefined) {
			[].slice.call(this.items).forEach(function (item) {
				item.parentNode.style.WebkitPerspective = item.parentNode.style.perspective = effectSettings.perspective + 'px';
			});
		}

		if (effectSettings.origin != undefined) {
			[].slice.call(this.items).forEach(function (item) {
				item.style.WebkitTransformOrigin = item.style.transformOrigin = effectSettings.origin;
			});
		}

		if (effectSettings.lineDrawing != undefined) {
			[].slice.call(this.items).forEach(function (item) {
				// Create SVG.
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
						path = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
						itemW = item.offsetWidth,
						itemH = item.offsetHeight;

				svg.setAttribute('width', itemW + 'px');
				svg.setAttribute('height', itemH + 'px');
				svg.setAttribute('viewBox', '0 0 ' + itemW + ' ' + itemH);
				svg.setAttribute('class', 'grid__deco');
				path.setAttribute('d', 'M0,0 l' + itemW + ',0 0,' + itemH + ' -' + itemW + ',0 0,-' + itemH);
				path.setAttribute('stroke-dashoffset', anime.setDashoffset(path));
				svg.appendChild(path);
				item.parentNode.appendChild(svg);
			});

			var animeLineDrawingOpts = effectSettings.animeLineDrawingOpts;
			animeLineDrawingOpts.targets = this.el.querySelectorAll('.grid__deco > path');
			anime.remove(animeLineDrawingOpts.targets);
			anime(animeLineDrawingOpts);
		}

		if (effectSettings.revealer != undefined) {
			[].slice.call(this.items).forEach(function (item) {
				var revealer = document.createElement('div');
				revealer.className = 'grid__reveal';
				if (effectSettings.revealerOrigin != undefined) {
					revealer.style.transformOrigin = effectSettings.revealerOrigin;
				}
				if (effectSettings.revealerColor != undefined) {
					revealer.style.backgroundColor = effectSettings.revealerColor;
				}
				item.parentNode.appendChild(revealer);
			});

			var animeRevealerOpts = effectSettings.animeRevealerOpts;
			animeRevealerOpts.targets = this.el.querySelectorAll('.grid__reveal');
			animeRevealerOpts.begin = function (obj) {
				for (var i = 0, len = obj.animatables.length; i < len; ++i) {
					obj.animatables[i].target.style.opacity = 1;
				}
			};
			anime.remove(animeRevealerOpts.targets);
			anime(animeRevealerOpts);
		}

		if (effectSettings.itemOverflowHidden) {
			[].slice.call(this.items).forEach(function (item) {
				item.parentNode.style.overflow = 'hidden';
			});
		}

		animeOpts.targets = effectSettings.sortTargetsFn && typeof effectSettings.sortTargetsFn === 'function' ? [].slice.call(this.items).sort(effectSettings.sortTargetsFn) : this.items;
		anime.remove(animeOpts.targets);
		anime(animeOpts);
	};

	GridLoaderFx.prototype._resetStyles = function () {
		this.el.style.WebkitPerspective = this.el.style.perspective = 'none';
		[].slice.call(this.items).forEach(function (item) {
			var gItem = item.parentNode;
			item.style.opacity = 0;
			item.style.WebkitTransformOrigin = item.style.transformOrigin = '50% 50%';
			item.style.transform = 'none';

			var svg = item.parentNode.querySelector('svg.grid__deco');
			if (svg) {
				gItem.removeChild(svg);
			}

			var revealer = item.parentNode.querySelector('.grid__reveal');
			if (revealer) {
				gItem.removeChild(revealer);
			}

			gItem.style.overflow = '';
		});
	};

	window.GridLoaderFx = GridLoaderFx;

	var body = document.body,
			grids = [].slice.call(document.querySelectorAll('.grid')), masonry = []
	// Экземпляры GridLoaderFx
	loaders = [];



	function init() {
		// Инициализация masonry на каждом элементе грида
		grids.forEach(function (grid, i) {
			var m = new Masonry(grid, {
				itemSelector: '.grid__item',
				columnWidth: '.grid__sizer',
				percentPosition: false,
				transitionDuration: 0
			});
			masonry.push(m);
			// Инициализация GridLoaderFx
			loaders.push(new GridLoaderFx(grid));

			// Анимация, когда блок в области вьюпорта
			document.addEventListener("scroll", gridScrollListener);
			window.addEventListener("load", gridScrollListener);

			function gridScrollListener() {

				if (isElementInViewport(grid)) {
					// lazy-загрузка изображений
					$('.lazy').lazy();

					// Отрисовка грида
					loaders[i]._render('Shu');
					grid.classList.add('grid--showed');

					if (grid.classList.contains('grid--showed')) {
						document.removeEventListener("scroll", gridScrollListener);
					}
				}
			}

			// Показать текущий грид
			grids[i].classList.remove('grid--hidden');
		});
	}

	init();
})(window);