<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Waypoints in directions</title>
    <script src="https://cdn.firebase.com/js/client/2.2.7/firebase.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <div id="fb-root"></div>

    <script>
    	// Script should be ideally placed here according to Facebook.

        window.fbAsyncInit = function() { 
            FB.init({
                appId: '790322157756426',
                xfbml: true,
                version: 'v2.5'
            });
            FB.XFBML.parse(); // Reparse facebook elements once script is available.

        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>

    <h1>Map Your Crawl</h1>

    <h3>Add destinations</h3>
    <div class="barInput noprint">
        <input id="barName" placeholder="destination name">
        <input id="barAddress" placeholder="destination address">
        <button id="addBar" onclick="addDestination();"> Add Destination
        </button>
    </div>
    <br/>

    <div class="road-map-selector noprint">
        
        <b>Start:</b> <!-- Selection of origin route point -->
        <select id="start">
        </select>
        <p></p>
        
        <b>Waypoints:</b> <!-- Selection of Waypoints -->
        <br>
        <i>(Ctrl-Click for multiple selection)</i>
        <br>
        <select multiple id="waypoints">
        </select>
        <p></p>
        
        <b>End:</b> <!-- Selection of End route point -->
        <select id="end" name="end">
        </select>
        <p></p>

        <input type="submit" id="submit" value="Compute Route"> <br> <br>
        <input type="button" onClick="window.print()" value="Print Route"/>
        <br> <br>
		
    </div>

    <div id="map" class="print"></div>
    <div id="right-panel"> </div>
    <br>

    <!-- Direction Panel -->
    <div class="barList print" id="directions-panel">

    </div>  <br>   

    <!-- List of Pubs panel -->
    <div class="barList noprint">
        <h2>Your list of pubs:</h2>
        <p id="location"> </p>


    </div>
    <script src="map.js" > </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRaGjgu-bMvw-bHtKYGkNASaONZtC6DAo&signed_in=true&callback=initMap" async defer></script>
   
    <script src="fire.js"></script>
    <script>
        $(document).ready(function() {
            var imageUrl = "http://www.kempinski.com/assets/kempinski-hotel-bristol-berlin/RestaurantsBars/Bilder/_resampled/SetWidth1700-Kempinski-Hotel-Bristol-Berlin-Gastronomie-Bristol-Bar.jpg"
            $('body').css('background-image', 'url("' + imageUrl + '")');
        });
    </script>
    <br>

</body>

</html>