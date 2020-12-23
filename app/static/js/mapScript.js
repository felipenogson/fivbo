console.log('Inicio')
var map;
var markers = [];
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

        mapError.innerHTML = `<div class="alert alert-warning" role="alert">
                            Geolocation is not supported by this browser.
                            </div>`
    }

    var locationAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('locationAutocomplete'), 
        { types: ['establishment']}
    )

    if(markers.length != 0){
        markTransactions();
        showTransactions();
    }

}

function currentLocation(position){
    var lat =  position.coords.latitude;
    var lng = position.coords.longitude;
    currentLatLng = {lat:lat, lng:lng};
    console.log(currentLatLng);
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

function markTransaction(transaction){
        var position = transaction.position;
        var title = transaction.text

        var marker = new google.maps.Marker({
            position: position,
            title: title,
        });
        markers.push(marker);
}
function markTransactions(){
    for (var i = 0; i < transactions.length; i++){
        markTransaction(transactions[i]);
    }
}

function showTransactions(){
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++){
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
