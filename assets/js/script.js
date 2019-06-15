"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {});
$(document).ready(function () {
  var guestsMap;
  var arrMarkers = [];
  var arrInfoWindows = [];
  var guestsCities = {
    "places": [{
      "title": "Севастополь",
      "lat": 44.605614,
      "lng": 33.514420
    }, {
      "title": "Киев",
      "lat": 50.451238,
      "lng": 30.523088
    }, {
      "title": "Москва",
      "lat": 55.754652,
      "lng": 37.623813
    }, {
      "title": "Санкт-Петербург",
      "lat": 59.938897,
      "lng": 30.315244
    }, {
      "title": "Енакиево",
      "lat": 48.265149,
      "lng": 38.214483
    }, {
      "title": "Макеевка",
      "lat": 48.093475,
      "lng": 38.049421
    }, {
      "title": "Донецк",
      "lat": 48.010721,
      "lng": 37.804830
    }, {
      "title": "Анталья",
      "lat": 36.884557,
      "lng": 30.703797
    }]
  };
  var centerCoord = new google.maps.LatLng(51.598591, 33.476324);
  var guestsMapOptions = {
    zoom: 4,
    center: centerCoord,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'greedy',
    scrollwheel: false,
    disableDefaultUI: true,
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE
    }
  };
  guestsMap = new google.maps.Map(document.getElementById("guests-map"), guestsMapOptions); //Определяем область отображения меток на карте

  var latlngbounds = new google.maps.LatLngBounds();
  $.each(guestsCities.places, function (i, item) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(item.lat, item.lng),
      map: guestsMap,
      title: item.title,
      icon: "img/place-icon.png",
      index: i
    }); //Добавляем координаты меток

    latlngbounds.extend(new google.maps.LatLng(item.lat, item.lng));
    arrMarkers[i] = marker;
    var infowindow = new google.maps.InfoWindow({
      content: "<h3 class='story-map__label-title'>" + item.title + "</h3>"
    });
    arrInfoWindows[i] = infowindow;
    google.maps.event.addListener(marker, 'click', function () {
      for (var x = 0; x < arrInfoWindows.length; x++) {
        arrInfoWindows[x].close();
        infowindow.open(guestsMap, marker);
      }
    });
  });
}); //
// these easing functions are based on the code of glsl-easing module.
// https://github.com/glslify/glsl-easings
//

var ease = {
  exponentialIn: function exponentialIn(t) {
    return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: function exponentialOut(t) {
    return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: function exponentialInOut(t) {
    return t == 0.0 || t == 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
  },
  sineOut: function sineOut(t) {
    var HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: function circularInOut(t) {
    return t < 0.5 ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t)) : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: function cubicIn(t) {
    return t * t * t;
  },
  cubicOut: function cubicOut(t) {
    var f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: function quadraticOut(t) {
    return -t * (t - 2.0);
  },
  quarticOut: function quarticOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  }
};
/**
 * navigation.js
 * ! NAMESPACES HAS BEEN CHANGED
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */

var ShapeOverlays =
/*#__PURE__*/
function () {
  function ShapeOverlays(elm) {
    _classCallCheck(this, ShapeOverlays);

    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 2;
    this.duration = 600;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 200;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
  }

  _createClass(ShapeOverlays, [{
    key: "toggle",
    value: function toggle() {
      this.isAnimating = true;

      for (var i = 0; i < this.numPoints; i++) {
        this.delayPointsArray[i] = 0;
      }

      if (this.isOpened === false) {
        this.open();
      } else {
        this.close();
      }
    }
  }, {
    key: "open",
    value: function open() {
      this.isOpened = true;
      this.elm.classList.add('shape-overlays--opened');
      this.timeStart = Date.now();
      this.renderLoop();
    }
  }, {
    key: "close",
    value: function close() {
      this.isOpened = false;
      this.elm.classList.remove('shape-overlays--opened');
      this.timeStart = Date.now();
      this.renderLoop();
    }
  }, {
    key: "updatePath",
    value: function updatePath(time) {
      var points = [];

      for (var i = 0; i < this.numPoints; i++) {
        var thisEase = this.isOpened ? i == 1 ? ease.cubicOut : ease.cubicInOut : i == 1 ? ease.cubicInOut : ease.cubicOut;
        points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100;
      }

      var str = '';
      str += this.isOpened ? "M 0 0 V ".concat(points[0], " ") : "M 0 ".concat(points[0], " ");

      for (var i = 0; i < this.numPoints - 1; i++) {
        var p = (i + 1) / (this.numPoints - 1) * 100;
        var cp = p - 1 / (this.numPoints - 1) * 100 / 2;
        str += "C ".concat(cp, " ").concat(points[i], " ").concat(cp, " ").concat(points[i + 1], " ").concat(p, " ").concat(points[i + 1], " ");
      }

      str += this.isOpened ? "V 0 H 0" : "V 100 H 0";
      return str;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isOpened) {
        for (var i = 0; i < this.path.length; i++) {
          this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
        }
      } else {
        for (var i = 0; i < this.path.length; i++) {
          this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
        }
      }
    }
  }, {
    key: "renderLoop",
    value: function renderLoop() {
      var _this = this;

      this.render();

      if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
        requestAnimationFrame(function () {
          _this.renderLoop();
        });
      } else {
        this.isAnimating = false;
      }
    }
  }]);

  return ShapeOverlays;
}();

(function () {
  var elmHamburger = document.querySelector('.hamburger');
  var gNavItems = document.querySelectorAll('.global-menu__item');
  var elmOverlay = document.querySelector('.shape-overlays');
  var overlay = new ShapeOverlays(elmOverlay);
  elmHamburger.addEventListener('click', function () {
    if (overlay.isAnimating) {
      return false;
    }

    overlay.toggle();

    if (overlay.isOpened === true) {
      elmHamburger.classList.add('is-opened-navi');

      for (var i = 0; i < gNavItems.length; i++) {
        gNavItems[i].classList.add('global-menu__item--opened');
      }
    } else {
      elmHamburger.classList.remove('is-opened-navi');

      for (var i = 0; i < gNavItems.length; i++) {
        gNavItems[i].classList.remove('global-menu__item--opened');
      }
    }
  });

  for (var i = 0; i < gNavItems.length; i++) {
    gNavItems[i].addEventListener('click', function () {
      overlay.close();
      elmHamburger.classList.remove('is-opened-navi');
      $(".global-menu__item--opened").removeClass('global-menu__item--opened');
    });
  }
})();

$(document).ready(function () {
  // Определяем переменные для карты
  var map;
  var arrMarkers = [];
  var arrInfoWindows = [];
  var storyMap = {
    "places": [{
      "title": "Alma Park Resort, Песчаное",
      "description": "<p class='story-map__label-description'>Свадебная церемония и банкет - 09.09.2019</p>",
      "category": "wedding",
      "image": "alma.jpg",
      "lat": 44.859077,
      "lng": 33.606132
    }, {
      "title": "Отдел ЗАГС Гагаринского района, Севастополь",
      "description": "<p class='story-map__label-description'>Официальное бракосочетание - 06.09.2019</p>",
      "category": "wedding",
      "image": "garik.jpg",
      "lat": 44.593835,
      "lng": 33.451392
    }, {
      "title": "Белая Скала, Белогорский район",
      "description": "<p class='story-map__label-description'>Здесь на высоте 850 метров в корзине воздушного шара Ярик сделал Кате предложение руки и сердца</p>",
      "category": "important",
      "image": "belaya-skala.jpg",
      "lat": 45.093281,
      "lng": 34.621554
    }, {
      "title": "Севастопольский Академический Театр Танца имени Вадима Елизарова",
      "description": "<p class='story-map__label-description'>Место знакомства и Альма-матер в искусстве для Ярика и Кати. Здесь всегда атмосфера творчества, приключений и грации</p>",
      "category": "important",
      "image": "teatr-tanca.jpg",
      "lat": 44.615609,
      "lng": 33.521819
    }, {
      "title": "Общежитие №3 СИБД НБУ, ныне ЧВВМУ им П.С. Нахимова",
      "description": "<p class='story-map__label-description'>Место теплейших посиделок до поздна, костюмированных вечеринок и настольных игр. Самое беззаботное время для Ярика и Кати</p>",
      "category": "favorite",
      "image": "bankovskaya.jpg",
      "lat": 44.602716,
      "lng": 33.462867
    }, {
      "title": "Пляж Парк Победы",
      "description": "<p class='story-map__label-description'>Самый близкий и удобный пляж на районе. Здесь можно застать Катю и Ярика на поджарке знойными летними утрами</p>",
      "category": "favorite",
      "image": "park-pobedi.jpg",
      "lat": 44.608967,
      "lng": 33.456127
    }, {
      "title": "Центр связи Черноморского флота ВС РФ",
      "description": "<p class='story-map__label-description'>Здесь прошел год \"близкого\" расставания Ярика и Кати, период для проверки чувств на прочность. Здесь проходил дозор Ярика на страже границ и редкие приятные встречи на КПП с Катей</p>",
      "category": "favorite",
      "image": "armiya.jpg",
      "lat": 44.610855,
      "lng": 33.526964
    }, {
      "title": "Магазин цветов на остановке ул. Юмашева",
      "description": "<p class='story-map__label-description'>Здесь продаются самые красивые эустомы и хризантемы, которые больше всего любит Катя</p>",
      "category": "favorite",
      "image": "yumasheva.jpg",
      "lat": 44.590573,
      "lng": 33.460512
    }, {
      "title": "Торговый центр \"Муссон\"",
      "description": "<p class='story-map__label-description'>Тут у Кати с Яриком всегда аэрохоккей, пинг-понг и хороший кинотеатр с Grand-залом. Ну и иногда покупки 😊</p>",
      "category": "favorite",
      "image": "musson.jpg",
      "lat": 44.588555,
      "lng": 33.489273
    }, {
      "title": "Торговый центр \"Меганом\", Симферополь",
      "description": "<p class='story-map__label-description'>Самый лучший в Крыму и любимый торговый центр, самый крутой для совместного шопинга Кати и Ярика</p>",
      "category": "favorite",
      "image": "meganom.jpg",
      "lat": 44.971485,
      "lng": 34.077981
    }, {
      "title": "Международный аэропорт Симферополь",
      "description": "<p class='story-map__label-description'>Потому что здесь начинаются самые интересные приключения</p>",
      "category": "favorite",
      "image": "aeroport-simfer.jpg",
      "lat": 45.019281,
      "lng": 33.997552
    }, {
      "title": "Суши SushiBox",
      "description": "<p class='story-map__label-description'>Небольшая забегаловка, в которой делают самые вкусные роллы в Крыму (по версии Ярика)</p>",
      "category": "favorite",
      "image": "sushi-box.jpg",
      "lat": 44.592136,
      "lng": 33.456590
    }, {
      "title": "Яшмовый пляж, мыс Фиолент",
      "description": "<p class='story-map__label-description'>Лучшее место, чтобы поплавать с маской в Севастополе. Ярик и Катя любят этот пляж</p>",
      "category": "favorite",
      "image": "fiolent.jpg",
      "lat": 44.502773,
      "lng": 33.509932
    }, {
      "title": "Кафе \"Е=ДА2\"",
      "description": "<p class='story-map__label-description'>Здесь как нигде делают сырную пиццу на тонком тесте, Катя точно знает</p>",
      "category": "favorite",
      "image": "e-da2.jpg",
      "lat": 44.586533,
      "lng": 33.448334
    }, {
      "title": "Кинотеатр \"Сатурн\" IMAX, Ялта",
      "description": "<p class='story-map__label-description'>Получается редко, но Катя и Ярик любят здесь 3D-кинопремьеры в IMAX и хороший звук, а еще нельзя недооценивать здесь недорогой попкорн! 😊</p>",
      "category": "favorite",
      "image": "yalta-imax.jpg",
      "lat": 44.498902,
      "lng": 34.167996
    }, {
      "title": "Вареничная \"Победа\", ныне кафе \"ProTesto\"",
      "description": "<p class='story-map__label-description'>Здесь, а так же напротив (в кафе \"Борщок\") частые перекусы после работы и посиделки с театралами в самом начале отношений Ярика и Кати</p>",
      "category": "favorite",
      "image": "pobeda.jpg",
      "lat": 44.612707,
      "lng": 33.520462
    }, {
      "title": "Спортивный зал Safari Sport",
      "description": "<p class='story-map__label-description'>Потому что Катя и Ярик решили стать сильными и худенькими, взяв абонемент сразу на год. Они стараются, хоть и любят покушать 😊</p>",
      "category": "favorite",
      "image": "safari-sport.jpg",
      "lat": 44.588237,
      "lng": 33.461587
    }, {
      "title": "Кофейня на Одесской",
      "description": "<p class='story-map__label-description'>Кофейня произвела особенное впечатление на Катю после уютнейшего зимнего вечера вдвоем в декабре 2014-го, в свете огоньков под стук холодного дождика за окном, не без капучино конечно</p>",
      "category": "favorite",
      "image": "na-odesskoi.jpg",
      "lat": 44.611934,
      "lng": 33.516953
    }, {
      "title": "Кофе на вынос \"Coffeteria\" в \"Детском мире\"",
      "description": "<p class='story-map__label-description'>Может это и не лучшая кофейня в Севастополе, но здесь суперкласнный любимый у Ярика и Кати капучино, не это ли главное ?</p>",
      "category": "favorite",
      "image": "coffeteria.jpg",
      "lat": 44.611945,
      "lng": 33.520493
    }, {
      "title": "Пляж \"Васили\", Балаклава",
      "description": "<p class='story-map__label-description'>В отдаленном уголке \"Василей\" пожалуй одно из самых уединенных и красивых местечек у моря. Здесь в одну из жарких ночей, выйдя из палатки Ярик впервые лицезрел цветущий планктон и не мог поверить глазам, так это было прекрасно. Когда нет никакого света, кроме отражения звезд в воде и ярких искр от крошечных микроорганизмов в темных полночных водах</p>",
      "category": "favorite",
      "image": "vasili.jpg",
      "lat": 44.491763,
      "lng": 33.575305
    }, {
      "title": "Торговый центр Metro",
      "description": "<p class='story-map__label-description'>Торговый центр неразрывно связан с нашей традиционной, можно сказать церемониальной подготовкой к празднованию Нового года 😁 Здесь бывают самые красивые игрушки, гирлянды и дождики, и Катя здесь может провести целый день, выбирая всякие штуки. А еще отсюда к нам приехал огромный плюшевый Жора, его купил Дед Мороз 🎅</p>",
      "category": "favorite",
      "image": "metro-bear.jpg",
      "lat": 44.569501,
      "lng": 33.458835
    }, {
      "title": "Кафе \"Грасс\"",
      "description": "<p class='story-map__label-description'>В этом месте у Кати и Ярика было много хороших встреч с друзьями. Пожалуй, тут лучший вид на Южную бухту Севастополя, а от ассортимента пирожных разбегаются глаза</p>",
      "category": "favorite",
      "image": "grass.jpg",
      "lat": 44.599870,
      "lng": 33.524204
    }, {
      "title": "Площадь Нахимова",
      "description": "<p class='story-map__label-description'>Это место становится особенным в новогодние праздники. Катя обожает илюминацию и множество огоньков и гирлянд, которые здесь бывают перед Новым годом. Здесь бывает волшебно погулять вместе</p>",
      "category": "favorite",
      "image": "nahimova.jpg",
      "lat": 44.616783,
      "lng": 33.525487
    }, {
      "title": "Пляж Любимовка",
      "description": "<p class='story-map__label-description'>По крайней мере раз за лето Катя и Ярик выезжают сюда с ночевкой в палатке. Только шум моря, звездное небо и вид тлеющих угольков на песчаном пляже</p>",
      "category": "favorite",
      "image": "lubimovka.jpg",
      "lat": 44.673075,
      "lng": 33.546720
    }, {
      "title": "Парк Львов \"Тайган\", Белогорск",
      "description": "<p class='story-map__label-description'>Потому что это место произвело большое впечатление на Катю и Ярика. Очаровательный зоопарк, в котором можно потеряться на целый день. Прекрасная атмосфера, большая территория и огромный дружелюбный жираф!</p>",
      "category": "travel",
      "image": "taigan.jpg",
      "lat": 45.036229,
      "lng": 34.563551
    }, {
      "title": "г. Москва",
      "description": "<p class='story-map__label-description'>И это не только Старый и Новый Арбат. Это Третьяковка и Охотный ряд, Парк Музеон и Измайловский крмель, ВДНХ и Храм Христа Спасителя, Патриаршие пруды и еще много-много всего. Самые большие и веселые каникулы в столице для Ярика с Катей в мае 2015-го, которые между делом очень сильно повлияли на жизненный выбор Ярика</p>",
      "category": "travel",
      "image": "patriarshi.jpg",
      "lat": 55.751542,
      "lng": 37.597169
    }, {
      "title": "Гостиница \"Кремень\", Кременчуг",
      "description": "<p class='story-map__label-description'>Одно из немногих мест, отложившихся в памяти Ярика и Кати со времен гастролей театра танца по Украине в хорошем смысле слова. Далеко не самая комфортная гостиница в лучших традициях совдепа, но это было интересным приключением. Стены \"Кремня\" видели, пожалуй лучшие партии настольной \"Мафии\" среди севастопольских артистов 😊</p>",
      "category": "travel",
      "image": "kremen.jpg",
      "lat": 49.063667,
      "lng": 33.402750
    }, {
      "title": "Концертный зал \"Листопад\", Полтава",
      "description": "<p class='story-map__label-description'>Место на карте Украины, оставившее осенью 2013-го в памяти Кати и Ярика неприятные эмоции. Концерт, который должен был проходить здесь, скоротечно сорвался, и коллективу пришлось оперативно убираться из Полтавы. Всё потому что полтическая акция, выведшая толпу на улицы в тот день, не предполагала за собой никакой любви и уважения к населению Севастополя и Крыма. Бесславный день, который стал отправной точкой в разочаровании современной Украиной 😔</p>",
      "category": "travel",
      "image": "listopad.jpg",
      "lat": 49.595716,
      "lng": 34.540050
    }, {
      "title": "Генуэзская крепость, Судак",
      "description": "<p class='story-map__label-description'>Просто хорошие, запоминающиеся выходные в Судаке с прогулкой по древним руинам. Может, всё потому что Ярик и Катя почувствовали себя героями любимой \"Игры престолов\" в мрачных стенах средневековой крепости ? 😊</p>",
      "category": "travel",
      "image": "sudak.jpg",
      "lat": 44.842044,
      "lng": 34.957803
    }, {
      "title": "Ресторан грузинской кухни \"Метехи\"",
      "description": "<p class='story-map__label-description'>Кажется, это место, где Ярик и Катя пробовали лучшие в жизни хинкали и хачапури</p>",
      "category": "travel",
      "image": "metehi.jpg",
      "lat": 55.650808,
      "lng": 37.559827
    }, {
      "title": "Олимпийский парк, Сочи",
      "description": "<p class='story-map__label-description'>Это произошло в рабочей поездке по югу России, когда заселиться в гостиницу Сочи пришлось в 6 утра. Так как на Сочи отводился один день пребывания, единственной возможностью увидеть Олимпийский парк и успеть к вечернему коцерту было реализуемо только поспав 2 часа. Конечно, Ярик и Катя именно так и поступили, иначе они бы не были сами собой 😊</p>",
      "category": "travel",
      "image": "olimp-park.jpg",
      "lat": 43.409481,
      "lng": 39.971392
    }, {
      "title": "Крепость Мангуп-Кале",
      "description": "<p class='story-map__label-description'>Знакомство Ярика и Кати с этим местом напрямую связано уже со свадебной подготовкой и предсвадебной фотосессией в частности. Но между делом, вершина Мангуп просто поразила остатками цивилизации, которая расположились, кажется, в самом труднодоступном, но суперкрасивом месте на полуострове. А поднятие на вершину на полноприводном УАЗе - еще то приключение!</p>",
      "category": "travel",
      "image": "mangup.jpg",
      "lat": 44.594674,
      "lng": 33.807546
    }, {
      "title": "Кафе-музей \"Йоськин Кот\", Евпатория",
      "description": "<p class='story-map__label-description'>Так сложилось, что Катя с большим трепетом любит место Малый Иерусалим в Евпатории, и \"Йоськин кот\" - конечно, его неотъемлемая часть. Ярик впервые в жизни попробовал здесь израильскую кухню (хумус, привет), и это вкусно!</p>",
      "category": "travel",
      "image": "yoskin-kot.jpg",
      "lat": 45.198355,
      "lng": 33.376340
    }, {
      "title": "Кофейня \"Кезлев Къавеси\", Евпатория",
      "description": "<p class='story-map__label-description'>Многие говорят, что это самая лучшая кофейня в Крыму, и Катя может это подтвердить. Про сам кофе Ярик ничего сказать не может, шеф-напиток \"султан къавеси\" его впечатлил лишь своей кислостью, однако разнообразие выпечки и сама атмосфера внутри исторческой средневековой башни определенно заставят вернуться сюда при посещении Евпатории и попредставлять себя ханом Кезлева.</p>",
      "category": "travel",
      "image": "kezlev.jpg",
      "lat": 45.198621,
      "lng": 33.379839
    }, {
      "title": "Рыбный ресторан 吞云小莳日月光店, Huangpu Qu, Шанхай",
      "description": "<p class='story-map__label-description'>Пожалуй, это пока что лучший гастрономический сеанс, который до сих пор довелось испытать Ярику и Кате. Депозит в 220 юаней приоткрыл возможность попробовать в одном месте то, что найти на местных прилавках скорее всего невозможно. Разумеется, помимо классической европейской и американской кухни со всеми ее видами птицы, пиццы и гарниров, главное, ради чего здесь стоило быть - разновидности морской живности Охотского, Японского и Южно-Китайского морей. Камчатские крабы с клешней размером по локоть, мидии, рапаны и красная рыба - всего этого и в таком количестве Ярику и Кате никогда не приходилось не то что есть, но и видеть! Еще мы с удовольствием впервые попробовали мраморное мясо и фуа-гру. К сожалению, этот ресторан полностью реорганизовали и нам не удалось попасть туда снова уже на следующий год. Но о боги, это был самый вкусный рыбный день Ярика и Кати</p>",
      "category": "travel",
      "image": "shanghai-fish.jpg",
      "lat": 31.205983,
      "lng": 121.468206
    }, {
      "title": "Старая улица 上海老街, Шанхай",
      "description": "<p class='story-map__label-description'>Yuyuan - самая крутая улица для покупки сувениров. Здесь можно сделать суперские кадры на фоне крыш в китайской традиции и в общем-то провести прекрасную прогулку по пути на главную набережную. Ярик очень любит это место и как ни странно, знает его больше, чем какое-либо другое в Китае.</p>",
      "category": "travel",
      "image": "yuyuan.jpg",
      "lat": 31.225317,
      "lng": 121.496940
    }, {
      "title": "Набережная Вайтань, Шанхай",
      "description": "<p class='story-map__label-description'>Полторакилометровая историческая набережная, открывающая обзор на самый живописный пейзаж мегаполиса, которым Ярик никогда не перестанет восхищаться. Катя и Ярик гуляли здесь в ночные сумерки (но в миллионе огоньков их таковыми не назовешь) и днем. И это место прекрасно всегда, в первую очередь квинтэссенцией богатой традиции и интернационалистического ультрамодерна.</p>",
      "category": "travel",
      "image": "shanghai-huangpu.jpg",
      "lat": 31.236052,
      "lng": 121.491083
    }, {
      "title": "Сверхвысокий небоскрёб Kingkey 100, Шэньчжэнь",
      "description": "<p class='story-map__label-description'>С этим уникальным сверхстроением у Ярика и Кати связана очень интересная история 😏 Она пропитана мощнейшей скрытой мотивацией, доступной только русскому народу (\"халява\"), а еще сильным желанием Ярика показать Кате прекраснейший вид на Гонконг и Глубоководный (Шеньчженьский) залив, который уже успел увидеть ранее. Как итог - фотографии на вершине небоскреба высотой в 442 метра, знакомство с русскоязычными китайцами и эмоции, которые так важны авантюристам</p>",
      "category": "travel",
      "image": "kingkey.jpg",
      "lat": 22.542248,
      "lng": 114.106523
    }, {
      "title": "Рынок электроники Seg Electronics Market, Шэньчжэнь",
      "description": "<p class='story-map__label-description'>Ярику с его фанатизмом к элетронным гаджетам просто не могло не запасть в душу это потрясающее место. На шеньчженьском рынке электроники, самом большом в мире, можно купить буквально всё, что работает от электричества и даже больше! Количество прилавков и масштабы здания (небоскреб в 356 метров, 71 этаж) просто впечатляют, а жизнь китайцев в подобных местах завораживает: кроме работы они здесь едят, болтают, курят, смеются, торгуются, шьют, бегают, шепчутся и смотрят за детьми. Конечно, единственное, что Ярик с Катей там приобрели - бракованный powerbank, но разве это может испортить впечатления от этой громадины ? 😌</p>",
      "category": "travel",
      "image": "seg-electronics.jpg",
      "lat": 22.541530,
      "lng": 114.087130
    }, {
      "title": "Великая Китайская стена, район Хуайжоу",
      "description": "<p class='story-map__label-description'>Как сказал один современный философ, \"Ты не был на Китайской стене ? Ты не был в Китае\". Ярик с Катей были, и это стало лучшим завершением 2015-го года. Прикосновение с мировой архитектурной реликвии длиной в 8851 км - как чувство выполненного долга для авантюриста, что в поисках чего-то древнего и прекрасного. Но у Ярика и Кати еще много целей и неразгаданных мест!</p>",
      "category": "travel",
      "image": "great-wall.jpg",
      "lat": 40.432006,
      "lng": 116.570364
    }, {
      "title": "Небоскреб CCTV Headquarters, Пекин",
      "description": "<p class='story-map__label-description'>Здание Central Chinese TeleVision или в простонародии небоскреб \"Штаны\", являясь чем-то вроде китайской Останскинской башни, представляется китайцам как уникально спроектированный европейцами символ стремительного экономического развития Поднебесной (построенный к Олимпийским играм 2008 в Пекине). Ярику и Кате конечно было просто анбеливэбл увидеть его изнутри и с театром танца попасть в главный китайский телик (CCTV) в прайм-тайм новогодней ночи. Глядя на масштабы происходящего, порою можно даже почуствовать себя супершишками 😊</p>",
      "category": "travel",
      "image": "headquarters.jpg",
      "lat": 39.915456,
      "lng": 116.464199
    }, {
      "title": "Ya Show Market или Русская пятиэтажка, Пекин",
      "description": "<p class='story-map__label-description'>Абсолютно невероятное место для того, чтобы купить всё, что угодно в Пекине. Это царство бартера, в котором НЕ торговаться - просто противопоказано. Пожалуй, большая часть вещичек, которую Ярик и Катя привезли из Китая (от сувениров и одежды до чемодана и кошельков) были куплены здесь. Здесь были разыграны целые спектакли в погоне скинуть цену чуть ли не в 5-6 раз от начальной (и успешно!). Ya Show Market однозначно занимает особую позицию среди посещенных нами шопинг-мест</p>",
      "category": "travel",
      "image": "yashow.png",
      "lat": 39.933941,
      "lng": 116.453174
    }, {
      "title": "Гостиница Proud Way Hotel, Шэньчжэнь",
      "description": "<p class='story-map__label-description'>Конечно, мы успели увидеть достаточно много комфортных китайских гостиниц, но почему-то эта запала в память Кати и Ярика по-особенному. Может, потому что неподалеку на вечерней уличной кухне Ярик взял попробовать в номер самые вкусные в мире устрицы ? 😊 Тогда мы устроили невероятно уютный вечер на двоих.</p>",
      "category": "travel",
      "image": "shenghen.jpg",
      "lat": 22.546407,
      "lng": 114.109456
    }, {
      "title": "Пешеходная улица Chunxi Road, Ченду",
      "description": "<p class='story-map__label-description'>Обязательное место для посещения в Ченду, а для Ярика с Катей эдакий собирательный образ неисчислимого множества китайских рынков, базаров и торговых мест. Запомнить их все и отметить на карте практически невозможно, тем более, что почти каждый новый город - в малой степени внегласный скидочный марафон. Однако, отметим парочку, которые запомнились. Колоритный и ярко привлекающий Chunxi Road - один из них. </p>",
      "category": "travel",
      "image": "chunxi.jpg",
      "lat": 30.653398,
      "lng": 104.079939
    }, {
      "title": "Гранд-базар Carrefour, Урумчи",
      "description": "<p class='story-map__label-description'>Этот город для Ярика и Кати попадает в список самых необычных, потому что он... самый не китайский город в Китае! Пропитанный мусульманской (уйгурской) культурой, о своей принадлежности к Поднебесной город напоминает только разрезом глаз его жителей 😌 Супернеобычное место с вплетением постсоветской, казахской, мусульмано-восточной и китайской культуры очень заинтересовал Ярика. Гранд-базар с красивыми мечетями очень заинтересовал Катю 😁</p>",
      "category": "travel",
      "image": "urumchi.jpg",
      "lat": 43.779190,
      "lng": 87.618253
    }, {
      "title": "Пешеходная улица Nanjing Road, Шанхай",
      "description": "<p class='story-map__label-description'>Можно сказать, что это китайский Арбат: очень многолюдно, очень дорого и красиво. Здесь ощущается вся дороговизна современного развития Китая и пристуствие европейских инвестиций. Для Ярика Nanjing Road стал неотъемлемой частью впечатления, которое сформировалось после посещения Шанхая</p>",
      "category": "travel",
      "image": "nanjing.jpg",
      "lat": 31.236060,
      "lng": 121.479542
    }, {
      "title": "Отель Jomtien Thani, Паттайя",
      "description": "<p class='story-map__label-description'>Это место, которого оказалось более, чем достаточно для Кати и Ярика, чтобы передохнуть от экскурсий по Тайланду и пляжной жары. Здесь в номере были впервые попробован весь ассортимент тайских фруктов (манго, драконий фрукт, гуава, мангустин, личи, маракуйя, лонган, джекфрут) и морепродуктов. Здесь мы также впервые увидели домашнего геккончика тинтьок, который сперва поверг Катю в ужас, но затем мы выяснили, что это наш первый друг от насекомых 😊</p>",
      "category": "travel",
      "image": "jomtien.jpg",
      "lat": 12.896977,
      "lng": 100.870629
    }, {
      "title": "Побережье реки Квай, Тайланд",
      "description": "<p class='story-map__label-description'>Надо ли говорить, что здесь слегка присутствует ощущение, что ты герой фильма \"Анаконда\" ? 😁 Квай - одна из самых необычных и крутых эмоций в жизни, которую испытали Ярик и Катя. Казалось бы, тебя вывозят на плоту к устью и вместе с жилетами сплавляют по течению очень мутной зеленой реки посреди диковатых джунглей. Но ощущения не стоят слов, потому что трудно представить способ лучше в прямом смысле слова слиться с тайскими джунглями и вечерними звуками из их недр, под ногами - отсутствие дна и только пилинговые рыбки могут напомнить, что река - живая, а теплый стремительный поток несет твою бездвижную тушку и расслабляет мозг наулучшим образом</p>",
      "category": "travel",
      "image": "kvai.jpg",
      "lat": 14.944890,
      "lng": 99.194854
    }, {
      "title": "Храм изумрудного Будды и Королевский дворец, Бангкок",
      "description": "<p class='story-map__label-description'>Катя и Ярик посетили это место во время национальной скорби по почившему королю Тайланда Раме IX, поэтому это место можно было назвать паломническим. Тайский Кремль, Мавзолей и Оружейная палата 😊</p>",
      "category": "travel",
      "image": "bangkok-hram.jpg",
      "lat": 13.750153,
      "lng": 100.491322
    }, {
      "title": "Смотровая площадка небоскреба Baiyoke Sky, Бангкок",
      "description": "<p class='story-map__label-description'>Потому что тут одна из самых крутых смотровых площадок, на которой в солнечную погоду открывается прекрасный вид на весь Бангкок</p>",
      "category": "travel",
      "image": "baiyok.jpg",
      "lat": 13.754241,
      "lng": 100.540357
    }, {
      "title": "Национальный парк Кхауяй, Тайланд",
      "description": "<p class='story-map__label-description'>Рафтинг-райд по сиамским джунглям</p>",
      "category": "travel",
      "image": "khaoyai.jpg",
      "lat": 14.439187,
      "lng": 101.372479
    }, {
      "title": "Водопад Erawan, Тайланд",
      "description": "<p class='story-map__label-description'>Кате и Ярику еще не доводилось бывать в подобных местах. Главное воспоминание - цвет воды в источнике и просто огроменные пилинговые рыбища, которые больше смахивают на сомов 😅 Боящийся щекотки Ярик заценил 🙃</p>",
      "category": "travel",
      "image": "erawan.jpg",
      "lat": 14.368731,
      "lng": 99.143953
    }, {
      "title": "Слоновая ферма Taweechai, Тайланд",
      "description": "<p class='story-map__label-description'>Ярчайшее жизненное воспоминание и впервые увиденные индийские слоны. В этих животных очень много первобытного, и прикоснуться к ним во всех смыслах стало большим открытием. Ярик и Катя даже умудрились поплескаться со слоником в речке 🐘</p>",
      "category": "travel",
      "image": "sloni.jpg",
      "lat": 14.217066,
      "lng": 99.223751
    }, {
      "title": "Плавучий рынок Amphawa, Самут Сонгкрам",
      "description": "<p class='story-map__label-description'>Без шопинга никуда! И этот стал весьма необычным: с прилавками, доступными только в тесных мутных каналах из узкой азиатской лодки, смахивающей на каноэ. Купить по большей части можно было только сувениры, но Катя с собой прихватила один, на память.</p>",
      "category": "travel",
      "image": "amphawa.jpg",
      "lat": 13.425792,
      "lng": 99.955313
    }, {
      "title": "Радоновые источники Hin Dat, Канчанабури",
      "description": "<p class='story-map__label-description'>Провели неизвестную доселе терапию в горячем термальном источнике с очень необычным цветом воды (продукт распада радия) по дороге на реку Квай. Оказалось, что слаборадиоактивные радоновые источники есть даже в Крыму. </p>",
      "category": "travel",
      "image": "rodon.jpg",
      "lat": 14.624920,
      "lng": 98.725881
    }, {
      "title": "Старый город, Анталья",
      "description": "<p class='story-map__label-description'>Катя и Ярик никогда не были здесь вместе, но оба были по раздельности. Старый город Антальи есть на карте, потому что пожалуй косвенно он интересным образом сыграл свою роль на заре совместного семейного приключения Ярика и Кати. Для Кати координата неподалеку стала ключевой в изменении старых приоритетов (подробнее - при встрече). А турецкий рахат-лукум, купленный здесь для Ярика Катей стал единственным утешением, когда Ярику пришлось помахать рукой своему некоторому материальному прошлому, и в том числе как ни странно, украденному украинскиму паспорту. Ничего не случается случайно, правда ?</p>",
      "category": "travel",
      "image": "antalia.jpg",
      "lat": 36.883857,
      "lng": 30.705875
    }]
  };

  function mapInit() {
    // Центральная координата, вокруг которой будет построена карта
    var centerCoord = new google.maps.LatLng(44.598591, 33.476324);
    /* Если необходимо стилизовать карту (например, стили snazzymaps)
     var styledMapType = new google.maps.StyledMapType([{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}],
     {name: 'Styled Map'});*/

    var mapOptions = {
      zoom: 13,
      center: centerCoord,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'greedy',
      disableDefaultUI: true,
      scaleControl: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      }
      /* для стилизации карты
       mapTypeControlOptions: {
       mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
       'styled_map']
       }*/

    };
    map = new google.maps.Map(document.getElementById("storyMap"), mapOptions);
    /* применение стилизации карты
     map.mapTypes.set('styled_map', styledMapType);
     map.setMapTypeId('styled_map');
     */
    //Определяем область отображения меток на карте

    var latlngbounds = new google.maps.LatLngBounds();
    $.each(storyMap.places, function (i, item) {
      $(".story-map__content-" + item.category + " .story-map__places").append('<li class="story-map__place-item"><a data-href="' + i + '"><img class="story-map__place-thumb later-lazy" data-src="img/thumb-' + item.image + '">' + item.title + '</a></li>');
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.lat, item.lng),
        map: map,
        title: item.title,
        icon: "img/place-icon.png",
        index: i
      }); //Добавляем координаты меток

      latlngbounds.extend(new google.maps.LatLng(item.lat, item.lng));
      arrMarkers[i] = marker;
      var infowindow = new google.maps.InfoWindow({
        content: "<h3 class='story-map__label-title'>" + item.title + "</h3>" + item.description + "<img class='story-map__label-image' data-src='img/" + item.image + "' data-index='" + i + "'>"
      });
      arrInfoWindows[i] = infowindow;
      google.maps.event.addListener(marker, 'click', function () {
        for (var x = 0; x < arrInfoWindows.length; x++) {
          arrInfoWindows[x].close();
          infowindow.open(map, marker); // Lazy-загружаем изображение балуна

          $('.story-map__label-image').lazy();
        }

        $(".story-map__place--active").removeClass('story-map__place--active');
        $($("a[data-href=\"" + marker.index + "\"]")[0]).addClass('story-map__place--active');
      });
      $('.story-map__overlay').click(function () {
        $('.later-lazy').lazy();
        $('.story-map').removeClass('story-map--minimized');
        $('.story-map__content').scroll(function () {
          $('.later-lazy').lazy();
        });
        $('.story-map__close-trigger').click(function () {
          for (var x = 0; x < arrInfoWindows.length; x++) {
            arrInfoWindows[x].close();
          }

          $('.story-map').addClass('story-map--minimized');
        });
      });
    }); //Центрируем и масштабируем карту так, чтобы были видны все метки
    //map.setCenter(latlngbounds.getCenter(), map.fitBounds(latlngbounds));
  }

  $(function () {
    //Определяем карту (добавляем маркеры, балуны и список со ссылками)
    mapInit(); // "live" отслеживает событие клика по ссылке

    $(".story-map__places a").on("click", function (e) {
      e.preventDefault();
      var i = $(this).attr("data-href");
      $(".story-map__place--active").removeClass('story-map__place--active');
      $(".story-map__mobile-list-trigger").html('<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5538 0.0523258C19.4442 -0.014174 19.3076 -0.017097 19.1947 0.0424604L13.1538 3.24066L7.11328 0.0424604C7.10853 0.0399027 7.10305 0.0391719 7.0983 0.0369796C7.08076 0.0285758 7.06286 0.0223643 7.04459 0.0168836C7.03436 0.0139605 7.02449 0.0106721 7.01426 0.00847978C6.99416 0.00446056 6.9737 0.00299904 6.95288 0.00226828C6.94374 0.00190289 6.93461 0.000806736 6.92511 0.00117212C6.90538 0.00226827 6.88601 0.00592209 6.86665 0.0103067C6.85568 0.012499 6.84472 0.0139605 6.83413 0.017249C6.83157 0.0179798 6.82901 0.0179797 6.82682 0.0187105L0.249922 2.21101C0.10048 2.2607 0 2.40028 0 2.55776V18.2692C0 18.3865 0.056269 18.4969 0.151999 18.5659C0.214845 18.6109 0.289749 18.6346 0.365383 18.6346C0.404114 18.6346 0.44321 18.6284 0.480844 18.6156L6.9284 16.4664L13.0146 18.9726C13.0197 18.9748 13.0255 18.9741 13.0307 18.9759C13.0709 18.9901 13.1118 19 13.1538 19C13.1867 19 13.2192 18.9945 13.251 18.9858C13.2612 18.9828 13.2707 18.9781 13.2809 18.9744C13.2956 18.9689 13.3109 18.9649 13.3248 18.9576L19.5363 15.6692C19.6558 15.606 19.7307 15.4814 19.7307 15.3462V0.365459C19.7307 0.23721 19.6635 0.11846 19.5538 0.0523258ZM0.730766 2.8212L6.5769 0.872611V10.735C6.41978 10.7635 6.26486 10.7957 6.11505 10.8351C5.91994 10.887 5.80375 11.0869 5.85563 11.282C5.89911 11.4457 6.04673 11.5539 6.20859 11.5539C6.23928 11.5539 6.27107 11.5498 6.30249 11.5418C6.39019 11.5184 6.48592 11.5067 6.5769 11.4877V15.8139L0.730766 17.7621V2.8212ZM7.30766 11.3854C7.42495 11.3763 7.53859 11.3613 7.6588 11.3587C7.86049 11.3544 8.02053 11.1874 8.01651 10.9857C8.01212 10.7866 7.84953 10.628 7.65112 10.628C7.64857 10.628 7.64564 10.628 7.64309 10.628C7.52982 10.6305 7.41837 10.6367 7.30766 10.6444V0.972361L12.7884 3.87387V11.6178C12.5275 11.6065 12.2623 11.5758 11.9842 11.5221C11.7854 11.483 11.5943 11.613 11.556 11.8111C11.5176 12.0091 11.6473 12.201 11.8454 12.2393C12.1691 12.3022 12.4833 12.3329 12.7888 12.3449V18.0891L7.30766 15.8321V11.3854ZM18.9999 15.1258L13.5192 18.0274V12.3055C13.6551 12.2437 13.7457 12.1049 13.7337 11.9474C13.7231 11.8107 13.6354 11.7011 13.5192 11.6474V3.87387L18.9999 0.972361V15.1258Z" fill="#24262D"/><path d="M4.0193 2.92316C3.01194 2.92316 2.19238 3.74271 2.19238 4.75007C2.19238 5.63247 2.82121 6.37018 3.65392 6.54008V7.30775C3.65392 7.50981 3.81761 7.67314 4.0193 7.67314C4.22099 7.67314 4.38468 7.50981 4.38468 7.30775V6.54008C5.21739 6.37018 5.84621 5.63247 5.84621 4.75007C5.84621 3.74271 5.02666 2.92316 4.0193 2.92316ZM4.0193 5.84622C3.41495 5.84622 2.92315 5.35442 2.92315 4.75007C2.92315 4.14573 3.41495 3.65392 4.0193 3.65392C4.62364 3.65392 5.11545 4.14573 5.11545 4.75007C5.11545 5.35442 4.62364 5.84622 4.0193 5.84622Z"fill="#24262D"/><path d="M16.4679 9.74593C16.5117 9.7631 16.5566 9.77077 16.6009 9.77077C16.747 9.77077 16.8848 9.68272 16.9414 9.53839C17.1131 9.10029 17.2509 8.60557 17.3517 8.06809C17.389 7.87005 17.2582 7.67932 17.0598 7.64169C16.8603 7.6088 16.6706 7.73559 16.6334 7.93399C16.5413 8.42653 16.416 8.87668 16.2611 9.27239C16.1876 9.45983 16.2801 9.67212 16.4679 9.74593Z"fill="#24262D"/><path d="M4.67867 11.4519C4.23765 11.7285 3.84011 12.0749 3.49665 12.4823C3.36658 12.6365 3.38631 12.867 3.5405 12.9971C3.60919 13.0548 3.69286 13.083 3.77581 13.083C3.87994 13.083 3.98298 13.0388 4.05532 12.9533C4.34982 12.604 4.68999 12.3069 5.0667 12.0712C5.2377 11.9638 5.28922 11.7384 5.18217 11.5674C5.07511 11.3964 4.8493 11.3445 4.67867 11.4519Z"fill="#24262D"/><path d="M3.15215 13.6201C2.96872 13.5361 2.75169 13.6153 2.66728 13.7988C2.2924 14.6121 2.19959 15.2687 2.19557 15.2965C2.16817 15.4963 2.30775 15.6801 2.50761 15.7075C2.52442 15.7101 2.54159 15.7112 2.55803 15.7112C2.73744 15.7112 2.89382 15.5789 2.91976 15.3966C2.92049 15.3907 3.00417 14.8131 3.33082 14.1053C3.41522 13.9215 3.3352 13.7049 3.15215 13.6201Z"fill="#24262D"/> <path d="M14.77 11.9587C14.8259 11.9587 14.8829 11.9459 14.9359 11.9189C15.4079 11.6774 15.8241 11.3346 16.1723 10.9009C16.2988 10.7434 16.2735 10.5132 16.1161 10.3872C15.9589 10.2619 15.7288 10.2863 15.6023 10.4435C15.3188 10.7968 14.9826 11.0741 14.603 11.2681C14.4232 11.3602 14.352 11.5802 14.4441 11.7599C14.5091 11.886 14.6374 11.9587 14.77 11.9587Z"fill="#24262D"/><path d="M10.6583 11.1194C10.4972 11.0518 10.4029 11.005 10.3967 11.0018C10.373 10.9897 10.3477 10.9798 10.3218 10.9733C9.92609 10.8717 9.53623 10.7913 9.16244 10.7343C8.96331 10.7029 8.77659 10.8406 8.7459 11.0401C8.71558 11.2396 8.85259 11.4263 9.05209 11.4567C9.39044 11.5085 9.74376 11.5809 10.1033 11.6722C10.1523 11.6956 10.2458 11.7398 10.3766 11.7943C10.4226 11.8136 10.4705 11.8224 10.5173 11.8224C10.6601 11.8224 10.7961 11.7384 10.8545 11.5981C10.9324 11.411 10.8447 11.1969 10.6583 11.1194Z"fill="#24262D"/><path d="M17.145 6.91716C17.153 6.91752 17.1607 6.91789 17.1687 6.91789C17.3598 6.91789 17.5206 6.76954 17.533 6.57552C17.5557 6.22439 17.567 5.8528 17.567 5.47207C17.567 5.34528 17.5659 5.21666 17.5634 5.08549C17.5597 4.88343 17.3843 4.72997 17.1914 4.72668C16.9897 4.73034 16.8289 4.89695 16.8326 5.09864C16.8348 5.22543 16.8362 5.35003 16.8362 5.47207C16.8362 5.83745 16.8253 6.19297 16.8037 6.52912C16.7909 6.73045 16.9437 6.904 17.145 6.91716Z"fill="#24262D"/><path d="M3.03024 10.1238C3.10149 10.195 3.19503 10.2308 3.28857 10.2308C3.38211 10.2308 3.47565 10.195 3.5469 10.1238L4.01934 9.65131L4.49178 10.1238C4.56303 10.195 4.65656 10.2308 4.7501 10.2308C4.84364 10.2308 4.93718 10.195 5.00843 10.1238C5.15129 9.98089 5.15129 9.74997 5.00843 9.6071L4.53599 9.13466L5.00843 8.66222C5.15129 8.51936 5.15129 8.28844 5.00843 8.14557C4.86556 8.00271 4.63464 8.00271 4.49178 8.14557L4.01934 8.61801L3.5469 8.14557C3.40403 8.00271 3.17311 8.00271 3.03024 8.14557C2.88738 8.28844 2.88738 8.51936 3.03024 8.66222L3.50268 9.13466L3.03024 9.6071C2.88738 9.7496 2.88738 9.98089 3.03024 10.1238Z"fill="#24262D"/> </svg> Открыть список');
      $(".story-map").removeClass("story-map--content-active");
      $(this).addClass('story-map__place--active'); // Эта строка кода, закрывает все открытые балуны, для открытия выбранного

      for (var x = 0; x < arrInfoWindows.length; x++) {
        arrInfoWindows[x].close();
      }

      arrInfoWindows[i].open(map, arrMarkers[i]); // Lazy-загружаем изображение балуна

      $('.story-map__label-image').lazy();
    });
  });
  $(".story-map__mobile-list-trigger").click(function () {
    $(".story-map").toggleClass("story-map--content-active");

    if ($(".story-map").hasClass("story-map--content-active")) {
      $(this).html('<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5538 0.0523258C19.4442 -0.014174 19.3076 -0.017097 19.1947 0.0424604L13.1538 3.24066L7.11328 0.0424604C7.10853 0.0399027 7.10305 0.0391719 7.0983 0.0369796C7.08076 0.0285758 7.06286 0.0223643 7.04459 0.0168836C7.03436 0.0139605 7.02449 0.0106721 7.01426 0.00847978C6.99416 0.00446056 6.9737 0.00299904 6.95288 0.00226828C6.94374 0.00190289 6.93461 0.000806736 6.92511 0.00117212C6.90538 0.00226827 6.88601 0.00592209 6.86665 0.0103067C6.85568 0.012499 6.84472 0.0139605 6.83413 0.017249C6.83157 0.0179798 6.82901 0.0179797 6.82682 0.0187105L0.249922 2.21101C0.10048 2.2607 0 2.40028 0 2.55776V18.2692C0 18.3865 0.056269 18.4969 0.151999 18.5659C0.214845 18.6109 0.289749 18.6346 0.365383 18.6346C0.404114 18.6346 0.44321 18.6284 0.480844 18.6156L6.9284 16.4664L13.0146 18.9726C13.0197 18.9748 13.0255 18.9741 13.0307 18.9759C13.0709 18.9901 13.1118 19 13.1538 19C13.1867 19 13.2192 18.9945 13.251 18.9858C13.2612 18.9828 13.2707 18.9781 13.2809 18.9744C13.2956 18.9689 13.3109 18.9649 13.3248 18.9576L19.5363 15.6692C19.6558 15.606 19.7307 15.4814 19.7307 15.3462V0.365459C19.7307 0.23721 19.6635 0.11846 19.5538 0.0523258ZM0.730766 2.8212L6.5769 0.872611V10.735C6.41978 10.7635 6.26486 10.7957 6.11505 10.8351C5.91994 10.887 5.80375 11.0869 5.85563 11.282C5.89911 11.4457 6.04673 11.5539 6.20859 11.5539C6.23928 11.5539 6.27107 11.5498 6.30249 11.5418C6.39019 11.5184 6.48592 11.5067 6.5769 11.4877V15.8139L0.730766 17.7621V2.8212ZM7.30766 11.3854C7.42495 11.3763 7.53859 11.3613 7.6588 11.3587C7.86049 11.3544 8.02053 11.1874 8.01651 10.9857C8.01212 10.7866 7.84953 10.628 7.65112 10.628C7.64857 10.628 7.64564 10.628 7.64309 10.628C7.52982 10.6305 7.41837 10.6367 7.30766 10.6444V0.972361L12.7884 3.87387V11.6178C12.5275 11.6065 12.2623 11.5758 11.9842 11.5221C11.7854 11.483 11.5943 11.613 11.556 11.8111C11.5176 12.0091 11.6473 12.201 11.8454 12.2393C12.1691 12.3022 12.4833 12.3329 12.7888 12.3449V18.0891L7.30766 15.8321V11.3854ZM18.9999 15.1258L13.5192 18.0274V12.3055C13.6551 12.2437 13.7457 12.1049 13.7337 11.9474C13.7231 11.8107 13.6354 11.7011 13.5192 11.6474V3.87387L18.9999 0.972361V15.1258Z" fill="#24262D"/><path d="M4.0193 2.92316C3.01194 2.92316 2.19238 3.74271 2.19238 4.75007C2.19238 5.63247 2.82121 6.37018 3.65392 6.54008V7.30775C3.65392 7.50981 3.81761 7.67314 4.0193 7.67314C4.22099 7.67314 4.38468 7.50981 4.38468 7.30775V6.54008C5.21739 6.37018 5.84621 5.63247 5.84621 4.75007C5.84621 3.74271 5.02666 2.92316 4.0193 2.92316ZM4.0193 5.84622C3.41495 5.84622 2.92315 5.35442 2.92315 4.75007C2.92315 4.14573 3.41495 3.65392 4.0193 3.65392C4.62364 3.65392 5.11545 4.14573 5.11545 4.75007C5.11545 5.35442 4.62364 5.84622 4.0193 5.84622Z"fill="#24262D"/><path d="M16.4679 9.74593C16.5117 9.7631 16.5566 9.77077 16.6009 9.77077C16.747 9.77077 16.8848 9.68272 16.9414 9.53839C17.1131 9.10029 17.2509 8.60557 17.3517 8.06809C17.389 7.87005 17.2582 7.67932 17.0598 7.64169C16.8603 7.6088 16.6706 7.73559 16.6334 7.93399C16.5413 8.42653 16.416 8.87668 16.2611 9.27239C16.1876 9.45983 16.2801 9.67212 16.4679 9.74593Z"fill="#24262D"/><path d="M4.67867 11.4519C4.23765 11.7285 3.84011 12.0749 3.49665 12.4823C3.36658 12.6365 3.38631 12.867 3.5405 12.9971C3.60919 13.0548 3.69286 13.083 3.77581 13.083C3.87994 13.083 3.98298 13.0388 4.05532 12.9533C4.34982 12.604 4.68999 12.3069 5.0667 12.0712C5.2377 11.9638 5.28922 11.7384 5.18217 11.5674C5.07511 11.3964 4.8493 11.3445 4.67867 11.4519Z"fill="#24262D"/><path d="M3.15215 13.6201C2.96872 13.5361 2.75169 13.6153 2.66728 13.7988C2.2924 14.6121 2.19959 15.2687 2.19557 15.2965C2.16817 15.4963 2.30775 15.6801 2.50761 15.7075C2.52442 15.7101 2.54159 15.7112 2.55803 15.7112C2.73744 15.7112 2.89382 15.5789 2.91976 15.3966C2.92049 15.3907 3.00417 14.8131 3.33082 14.1053C3.41522 13.9215 3.3352 13.7049 3.15215 13.6201Z"fill="#24262D"/> <path d="M14.77 11.9587C14.8259 11.9587 14.8829 11.9459 14.9359 11.9189C15.4079 11.6774 15.8241 11.3346 16.1723 10.9009C16.2988 10.7434 16.2735 10.5132 16.1161 10.3872C15.9589 10.2619 15.7288 10.2863 15.6023 10.4435C15.3188 10.7968 14.9826 11.0741 14.603 11.2681C14.4232 11.3602 14.352 11.5802 14.4441 11.7599C14.5091 11.886 14.6374 11.9587 14.77 11.9587Z"fill="#24262D"/><path d="M10.6583 11.1194C10.4972 11.0518 10.4029 11.005 10.3967 11.0018C10.373 10.9897 10.3477 10.9798 10.3218 10.9733C9.92609 10.8717 9.53623 10.7913 9.16244 10.7343C8.96331 10.7029 8.77659 10.8406 8.7459 11.0401C8.71558 11.2396 8.85259 11.4263 9.05209 11.4567C9.39044 11.5085 9.74376 11.5809 10.1033 11.6722C10.1523 11.6956 10.2458 11.7398 10.3766 11.7943C10.4226 11.8136 10.4705 11.8224 10.5173 11.8224C10.6601 11.8224 10.7961 11.7384 10.8545 11.5981C10.9324 11.411 10.8447 11.1969 10.6583 11.1194Z"fill="#24262D"/><path d="M17.145 6.91716C17.153 6.91752 17.1607 6.91789 17.1687 6.91789C17.3598 6.91789 17.5206 6.76954 17.533 6.57552C17.5557 6.22439 17.567 5.8528 17.567 5.47207C17.567 5.34528 17.5659 5.21666 17.5634 5.08549C17.5597 4.88343 17.3843 4.72997 17.1914 4.72668C16.9897 4.73034 16.8289 4.89695 16.8326 5.09864C16.8348 5.22543 16.8362 5.35003 16.8362 5.47207C16.8362 5.83745 16.8253 6.19297 16.8037 6.52912C16.7909 6.73045 16.9437 6.904 17.145 6.91716Z"fill="#24262D"/><path d="M3.03024 10.1238C3.10149 10.195 3.19503 10.2308 3.28857 10.2308C3.38211 10.2308 3.47565 10.195 3.5469 10.1238L4.01934 9.65131L4.49178 10.1238C4.56303 10.195 4.65656 10.2308 4.7501 10.2308C4.84364 10.2308 4.93718 10.195 5.00843 10.1238C5.15129 9.98089 5.15129 9.74997 5.00843 9.6071L4.53599 9.13466L5.00843 8.66222C5.15129 8.51936 5.15129 8.28844 5.00843 8.14557C4.86556 8.00271 4.63464 8.00271 4.49178 8.14557L4.01934 8.61801L3.5469 8.14557C3.40403 8.00271 3.17311 8.00271 3.03024 8.14557C2.88738 8.28844 2.88738 8.51936 3.03024 8.66222L3.50268 9.13466L3.03024 9.6071C2.88738 9.7496 2.88738 9.98089 3.03024 10.1238Z"fill="#24262D"/> </svg> Закрыть список');
    } else {
      $(this).html('<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5538 0.0523258C19.4442 -0.014174 19.3076 -0.017097 19.1947 0.0424604L13.1538 3.24066L7.11328 0.0424604C7.10853 0.0399027 7.10305 0.0391719 7.0983 0.0369796C7.08076 0.0285758 7.06286 0.0223643 7.04459 0.0168836C7.03436 0.0139605 7.02449 0.0106721 7.01426 0.00847978C6.99416 0.00446056 6.9737 0.00299904 6.95288 0.00226828C6.94374 0.00190289 6.93461 0.000806736 6.92511 0.00117212C6.90538 0.00226827 6.88601 0.00592209 6.86665 0.0103067C6.85568 0.012499 6.84472 0.0139605 6.83413 0.017249C6.83157 0.0179798 6.82901 0.0179797 6.82682 0.0187105L0.249922 2.21101C0.10048 2.2607 0 2.40028 0 2.55776V18.2692C0 18.3865 0.056269 18.4969 0.151999 18.5659C0.214845 18.6109 0.289749 18.6346 0.365383 18.6346C0.404114 18.6346 0.44321 18.6284 0.480844 18.6156L6.9284 16.4664L13.0146 18.9726C13.0197 18.9748 13.0255 18.9741 13.0307 18.9759C13.0709 18.9901 13.1118 19 13.1538 19C13.1867 19 13.2192 18.9945 13.251 18.9858C13.2612 18.9828 13.2707 18.9781 13.2809 18.9744C13.2956 18.9689 13.3109 18.9649 13.3248 18.9576L19.5363 15.6692C19.6558 15.606 19.7307 15.4814 19.7307 15.3462V0.365459C19.7307 0.23721 19.6635 0.11846 19.5538 0.0523258ZM0.730766 2.8212L6.5769 0.872611V10.735C6.41978 10.7635 6.26486 10.7957 6.11505 10.8351C5.91994 10.887 5.80375 11.0869 5.85563 11.282C5.89911 11.4457 6.04673 11.5539 6.20859 11.5539C6.23928 11.5539 6.27107 11.5498 6.30249 11.5418C6.39019 11.5184 6.48592 11.5067 6.5769 11.4877V15.8139L0.730766 17.7621V2.8212ZM7.30766 11.3854C7.42495 11.3763 7.53859 11.3613 7.6588 11.3587C7.86049 11.3544 8.02053 11.1874 8.01651 10.9857C8.01212 10.7866 7.84953 10.628 7.65112 10.628C7.64857 10.628 7.64564 10.628 7.64309 10.628C7.52982 10.6305 7.41837 10.6367 7.30766 10.6444V0.972361L12.7884 3.87387V11.6178C12.5275 11.6065 12.2623 11.5758 11.9842 11.5221C11.7854 11.483 11.5943 11.613 11.556 11.8111C11.5176 12.0091 11.6473 12.201 11.8454 12.2393C12.1691 12.3022 12.4833 12.3329 12.7888 12.3449V18.0891L7.30766 15.8321V11.3854ZM18.9999 15.1258L13.5192 18.0274V12.3055C13.6551 12.2437 13.7457 12.1049 13.7337 11.9474C13.7231 11.8107 13.6354 11.7011 13.5192 11.6474V3.87387L18.9999 0.972361V15.1258Z" fill="#24262D"/><path d="M4.0193 2.92316C3.01194 2.92316 2.19238 3.74271 2.19238 4.75007C2.19238 5.63247 2.82121 6.37018 3.65392 6.54008V7.30775C3.65392 7.50981 3.81761 7.67314 4.0193 7.67314C4.22099 7.67314 4.38468 7.50981 4.38468 7.30775V6.54008C5.21739 6.37018 5.84621 5.63247 5.84621 4.75007C5.84621 3.74271 5.02666 2.92316 4.0193 2.92316ZM4.0193 5.84622C3.41495 5.84622 2.92315 5.35442 2.92315 4.75007C2.92315 4.14573 3.41495 3.65392 4.0193 3.65392C4.62364 3.65392 5.11545 4.14573 5.11545 4.75007C5.11545 5.35442 4.62364 5.84622 4.0193 5.84622Z"fill="#24262D"/><path d="M16.4679 9.74593C16.5117 9.7631 16.5566 9.77077 16.6009 9.77077C16.747 9.77077 16.8848 9.68272 16.9414 9.53839C17.1131 9.10029 17.2509 8.60557 17.3517 8.06809C17.389 7.87005 17.2582 7.67932 17.0598 7.64169C16.8603 7.6088 16.6706 7.73559 16.6334 7.93399C16.5413 8.42653 16.416 8.87668 16.2611 9.27239C16.1876 9.45983 16.2801 9.67212 16.4679 9.74593Z"fill="#24262D"/><path d="M4.67867 11.4519C4.23765 11.7285 3.84011 12.0749 3.49665 12.4823C3.36658 12.6365 3.38631 12.867 3.5405 12.9971C3.60919 13.0548 3.69286 13.083 3.77581 13.083C3.87994 13.083 3.98298 13.0388 4.05532 12.9533C4.34982 12.604 4.68999 12.3069 5.0667 12.0712C5.2377 11.9638 5.28922 11.7384 5.18217 11.5674C5.07511 11.3964 4.8493 11.3445 4.67867 11.4519Z"fill="#24262D"/><path d="M3.15215 13.6201C2.96872 13.5361 2.75169 13.6153 2.66728 13.7988C2.2924 14.6121 2.19959 15.2687 2.19557 15.2965C2.16817 15.4963 2.30775 15.6801 2.50761 15.7075C2.52442 15.7101 2.54159 15.7112 2.55803 15.7112C2.73744 15.7112 2.89382 15.5789 2.91976 15.3966C2.92049 15.3907 3.00417 14.8131 3.33082 14.1053C3.41522 13.9215 3.3352 13.7049 3.15215 13.6201Z"fill="#24262D"/> <path d="M14.77 11.9587C14.8259 11.9587 14.8829 11.9459 14.9359 11.9189C15.4079 11.6774 15.8241 11.3346 16.1723 10.9009C16.2988 10.7434 16.2735 10.5132 16.1161 10.3872C15.9589 10.2619 15.7288 10.2863 15.6023 10.4435C15.3188 10.7968 14.9826 11.0741 14.603 11.2681C14.4232 11.3602 14.352 11.5802 14.4441 11.7599C14.5091 11.886 14.6374 11.9587 14.77 11.9587Z"fill="#24262D"/><path d="M10.6583 11.1194C10.4972 11.0518 10.4029 11.005 10.3967 11.0018C10.373 10.9897 10.3477 10.9798 10.3218 10.9733C9.92609 10.8717 9.53623 10.7913 9.16244 10.7343C8.96331 10.7029 8.77659 10.8406 8.7459 11.0401C8.71558 11.2396 8.85259 11.4263 9.05209 11.4567C9.39044 11.5085 9.74376 11.5809 10.1033 11.6722C10.1523 11.6956 10.2458 11.7398 10.3766 11.7943C10.4226 11.8136 10.4705 11.8224 10.5173 11.8224C10.6601 11.8224 10.7961 11.7384 10.8545 11.5981C10.9324 11.411 10.8447 11.1969 10.6583 11.1194Z"fill="#24262D"/><path d="M17.145 6.91716C17.153 6.91752 17.1607 6.91789 17.1687 6.91789C17.3598 6.91789 17.5206 6.76954 17.533 6.57552C17.5557 6.22439 17.567 5.8528 17.567 5.47207C17.567 5.34528 17.5659 5.21666 17.5634 5.08549C17.5597 4.88343 17.3843 4.72997 17.1914 4.72668C16.9897 4.73034 16.8289 4.89695 16.8326 5.09864C16.8348 5.22543 16.8362 5.35003 16.8362 5.47207C16.8362 5.83745 16.8253 6.19297 16.8037 6.52912C16.7909 6.73045 16.9437 6.904 17.145 6.91716Z"fill="#24262D"/><path d="M3.03024 10.1238C3.10149 10.195 3.19503 10.2308 3.28857 10.2308C3.38211 10.2308 3.47565 10.195 3.5469 10.1238L4.01934 9.65131L4.49178 10.1238C4.56303 10.195 4.65656 10.2308 4.7501 10.2308C4.84364 10.2308 4.93718 10.195 5.00843 10.1238C5.15129 9.98089 5.15129 9.74997 5.00843 9.6071L4.53599 9.13466L5.00843 8.66222C5.15129 8.51936 5.15129 8.28844 5.00843 8.14557C4.86556 8.00271 4.63464 8.00271 4.49178 8.14557L4.01934 8.61801L3.5469 8.14557C3.40403 8.00271 3.17311 8.00271 3.03024 8.14557C2.88738 8.28844 2.88738 8.51936 3.03024 8.66222L3.50268 9.13466L3.03024 9.6071C2.88738 9.7496 2.88738 9.98089 3.03024 10.1238Z"fill="#24262D"/> </svg> Открыть список');
    }
  });
});