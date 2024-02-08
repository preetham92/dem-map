var map = L.map('map').setView([12.882198889775518, 77.444965839386], 85);
var routeControl; //  routeControl variable

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Project by Team Code diggers</a> contributors'
}).addTo(map);

var places = [
    { name: 'a block', latlng: [12.881665490575516, 77.44455814361574] },
    { name: 'playground', latlng: [12.882324395304593, 77.44564175605775] },
    { name: 'cafeteria', latlng: [12.880964748724105, 77.44523406028749] },
    // Add more places 
];

map.on('click', function(e) {
    var name = prompt("Enter place name:");
    if (name) {
        var marker = L.marker(e.latlng, { draggable: true }).addTo(map);
        marker.bindPopup(name);
        places.push({ name: name, latlng: e.latlng });
    }
});

function searchPlace() {
    var searchValue = document.getElementById("searchInput").value;
    var foundPlace = places.find(function(place) {
        return place.name.toLowerCase() === searchValue.toLowerCase();
    });
    if (foundPlace) {
        var startPoint;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                startPoint = L.latLng(position.coords.latitude, position.coords.longitude);
                // to Remove existing route if present
                if (routeControl) {
                    map.removeControl(routeControl);
                }
                getRoute(startPoint, foundPlace.latlng);
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    } else {
        alert("Place not found!");
    }
}

function getRoute(startPoint, endPoint) {
    //to Create new route control and add it to the map
    routeControl = L.Routing.control({
        waypoints: [startPoint, endPoint],
        routeWhileDragging: true,
        lineOptions: {
            styles: [{ color: 'blue', opacity: 0.8, weight: 5 }]
        }
    }).addTo(map);
}
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Define custom orange icon for current location marker
        var orangeIcon = L.icon({
            iconUrl: 'data:image/jpeg;base64,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',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });

        // Create marker for current location with custom orange icon
        var currentLocationMarker = L.marker([latitude, longitude], { icon: orangeIcon }).addTo(map);
        currentLocationMarker.bindPopup("<b>You are here!</b>").openPopup();
    });
} else {
    alert("Geolocation is not supported by your browser.");
}
