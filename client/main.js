// client/main.js

//import { Markers } from '/imports/api/Markers'

Meteor.startup(function() {  
  GoogleMaps.load({
		v: '3', 
		key: 'AIzaSyBrO32B-1VJxhG6tK1u-bk0aAYXI30Fop4'
	});
});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
		for (var i = 0; i < places.length; i++) {
			var place = places[i];
			var marker = new google.maps.Marker({
				map: map.instance,
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: {lat: place[1], lng: place[2]},
				title: place[0],
				icon: place[5],
				size: new google.maps.Size(20,20),
				zIndex: place[3],
				url: place[4]
			});
			google.maps.event.addListener(marker, 'click', function() {
				window.open(this.url, "_blank", "");
			});
		}

  });
});

Template.map.helpers({
  mapOptions: function() { 
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(latAverage, lngAverage),
        zoom: 15,
      }
    }
  }
});

var places = [
	['Pi building', 40.670415, -73.985834, 1, 'http://interferencearchive.org/', 'http://interferencearchive.org/wp-content/uploads/IA_webicon07.jpg'],
	['Dirty Precious', 40.676364, -73.986749, 2, 'http://www.yelp.com/biz/dirty-precious-brooklyn',''],
	['Food Coop', 40.674863, -73.976810, 3, 'http://www.yelp.com/biz/park-slope-food-coop-brooklyn',''],
	['Ramen Zamurai', 40.676037, -73.974405, 4, 'http://www.yelp.com/biz/ramen-zamurai-park-slope-brooklyn',''],
	['Saigon on 5th', 40.670802, -73.984663, 5, 'http://www.yelp.com/biz/saigon-on-5th-brooklyn-5','']
];

var latsum = 0;
var lngsum = 0;
for (var i = 0; i < places.length; i++) {
	var place = places[i];
	latsum += place[1];
	lngsum += place[2];
}

var latAverage = latsum/places.length;
var lngAverage = lngsum/places.length;
