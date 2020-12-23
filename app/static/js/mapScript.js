console.log('Inicio')
var map;
var currentLatLng = "unavailable";
var mapError =  document.getElementById('mapError');

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 32.2102498,
          lng: -110.9311839,
        },
        zoom: 12
      });
    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(currentLocation, showError);
    } else {

    }

}

function currentLocation(position){
    var lat =  position.coords.latitude;
    var lng = position.coords.longitude;
    currentLatLng = {lat:lat, lng:lng};
    console.log(currentLatLng);
    console.log('agarrando locacion');
    map.setCenter(new google.maps.LatLng(lat, lng));
    }

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        mapError.innerHTML = `<div class="alert alert-warning" role="alert">
                                User denied the request for Geolocation
                            </div>`
        break;
        case error.POSITION_UNAVAILABLE:
        mapError.innerHTML = `<div class="alert alert-warning" role="alert">
                               Location information is unavailable.
                            </div>`
        break;
        case error.TIMEOUT:
        mapError.innerHTML = `<div class="alert alert-warning" role="alert">
                                The request to get user location timed out.
                            </div>`
        break;
        case error.UNKNOWN_ERROR:
        mapError.innerHTML = `<div class="alert alert-warning" role="alert">
                                "An unknown error occurred."
                            </div>`
        break;
    }
    }