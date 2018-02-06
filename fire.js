// FIREBASE CODE
var firebaseRef = new Firebase('https://radiant-fire-4442.firebaseio.com/path');
var location_array = [];
var location_ids = [];
// add location

function addDestination() {
    //create row data object
    var destination = {
        "name": document.getElementById("barName").value,
        "address": document.getElementById("barAddress").value
    }

    firebaseRef.push(destination)

    document.getElementById("barName").value = ""
    document.getElementById("barAddress").value = ""
}

//READ LOCATION DATA

//whenever the data changes, put the data into an array called location_array and run display_locations on it 
firebaseRef.on("value", function(snapshot) {
    location_array = [];
    location_ids = [];
    console.log("got snapshot of all objects at this point in time");
    snapshot.forEach(function(firebaseRef) {
        location_array.push(firebaseRef.val());
        location_ids.push(firebaseRef.key());
    });
    display_locations(location_array);


});

function display_locations(location_array) {
    var options = "";
    $("#location").empty();
    for (var i = 0; i < location_array.length; i++) {
        var location = location_array[i];
        var result = '';
        var url = 'https://graph.facebook.com/search?type=page&access_token=790322157756426|6786b384b2e64ae8549d535d35ca0c83&q=' + location.name;

        var addajax = function(name, address, index, url) {
            $.ajax({
                method: "GET",
                url: url
            }).always(function(results) {
                if (results['data'] && results['data'].length > 0) {
                    result = results['data'][0]['id'];
                    var html = "";
                    html += "<p>" + "" + " <strong class=\"address\">" + name + ": </strong>";
                    html += address + "&nbsp; <button onclick='remove_location(" + index + ")'> delete </button></p>";

                    html += '<div class="fb-page" \
data-href="https://www.facebook.com/' + result + '" \
data-width="380" \
data-hide-cover="false" \
data-show-facepile="false" \
data-show-posts="false"></div>';
                    $("#location").append(html);
                    FB.XFBML.parse();

                }

            });

        }

        addajax(location.name, location.address, i, url);
        //FB.XFBML.parse();

    } // END OF FOR LOOP

    for (var i = 0; i < location_array.length; i++) {
        var location = location_array[i];
        var name = location.name;
        var address = location.address;

        options += "<option value=" + "'" + address + "'" + ">" + name + "</option>"
    }

    //document.getElementById("location").innerHTML = html;
    document.getElementById("start").innerHTML = options;
    document.getElementById("waypoints").innerHTML = options;
    document.getElementById("end").innerHTML = options;
    $("option").prop('selected', true); // select all waypoints by default
    $('select[name=end] option:eq(1)').attr('selected', 'selected'); //By default origin must be different from destination.

}

//DELETE DATA
function remove_location(index) {
    var key = location_ids[index];
    var location = new Firebase("https://radiant-fire-4442.firebaseio.com/path/" + key);
    location.remove()
}