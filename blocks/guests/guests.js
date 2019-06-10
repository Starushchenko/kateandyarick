$(document).ready(function () {
	var guestsMap;
	var arrMarkers = [];
	var arrInfoWindows = [];

	var guestsCities = {
		"places": [
			{
				"title": "Севастополь",
				"lat": 44.605614,
				"lng": 33.514420
			},
			{
				"title": "Киев",
				"lat": 50.451238,
				"lng": 30.523088
			},
			{
				"title": "Москва",
				"lat": 55.754652,
				"lng": 37.623813
			},
			{
				"title": "Санкт-Петербург",
				"lat": 59.938897,
				"lng": 30.315244
			},
			{
				"title": "Енакиево",
				"lat": 48.265149,
				"lng": 38.214483
			},
			{
				"title": "Макеевка",
				"lat": 48.093475,
				"lng": 38.049421
			},
			{
				"title": "Донецк",
				"lat": 48.010721,
				"lng": 37.804830
			},
			{
				"title": "Анталья",
				"lat": 36.884557,
				"lng": 30.703797
			},
		]
	};

	var centerCoord = new google.maps.LatLng(51.598591, 33.476324);

	var guestsMapOptions = {
		zoom: 4,
		center: centerCoord,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		gestureHandling: 'greedy',
		scrollwheel: false,
		draggable: false,
		disableDefaultUI: true,
		scaleControl: true,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE
		},
	};
	guestsMap = new google.maps.Map(document.getElementById("guests-map"), guestsMapOptions);

	//Определяем область отображения меток на карте
	var latlngbounds = new google.maps.LatLngBounds();

	$.each(guestsCities.places, function (i, item) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(item.lat, item.lng),
			map: guestsMap,
			title: item.title,
			icon: "img/place-icon.png",
			index: i
		});

		//Добавляем координаты меток
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
});