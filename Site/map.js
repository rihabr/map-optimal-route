
function initMap() {// initialize map
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13, // Appropriate zoom level
        center: {
            lat: 45.504664, // Coordinates of Montreal.
            lng: -73.576550
        }
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay); // When submit button is pressed, compute the route.
    });
}

if (!String.prototype.trim) { // Trim function to remove outside whitespaces. Code found on StackExchange.
    String.prototype.trim = function() { // Make sure it is available in every web browser
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) { // Code to calculate the route.
    var waypts = []; // Array containing waypoints.
    var origin = document.getElementById('start').value.trim();
    var destination = document.getElementById('end').value.trim();
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected && checkboxArray.options[i].value.trim() != origin && checkboxArray.options[i].value.trim() != destination) {
            // Checks what are the selected waypoints and remove duplicates.
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true
            });
        }
    }

    directionsService.route({
        origin: document.getElementById('start').value, 
        destination: document.getElementById('end').value,
        waypoints: waypts,
        optimizeWaypoints: true, // Choose the most efficient route.
        travelMode: google.maps.TravelMode.WALKING // Pub crawl at McGill is generally a walked activity.
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            //This is the textual information of the route.
            summaryPanel.innerHTML += '<h2>Your Route: </h2> <br>';
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Step: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' <strong> to </strong> ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br><br>';
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}