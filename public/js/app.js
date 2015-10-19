(function(){
  "use strict";

  var apiUrl = 'http://localhost:3000/api/';

  var origin = { lat : 21.3088619, lng : -157.8086674}; // mic

  var map = L.map('map').setView(origin, 17);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

  var originMarker = L.marker(origin).addTo(map);
  var destinationMarker = null;

  map.on('click', function(event){
    if(destinationMarker){
      // move it
      destinationMarker.setLatLng(event.latlng);
    }else{
      // create marker
      destinationMarker = L.marker(event.latlng).addTo(map);
    }

    // get price estimates from Uber API via our server
    getPriceEstimates(origin, event.latlng);

  });

  function getPriceEstimates(source, destination) {
    $.get( apiUrl + 'estimates/price', {
      source : JSON.stringify(source),
      destination : JSON.stringify(destination)
    })
    .done(function(data){
      var result = JSON.parse(data);
      console.log(result.prices);
    })
    .fail(function(err){
      console.error(err.status, err.responseText);
    });
  }

})();
