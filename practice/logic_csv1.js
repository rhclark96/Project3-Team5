let url = "data/nozipcode.csv";

// Initialize the map 
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5
});

// Adding a base layer (the background map image) to the map:
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
street.addTo(myMap);

// Perform a GET request to the query URL
d3.csv(url).then(data => {
  console.log(data);
  
//   // Define arrays to hold the markers.
//   let locationMarkers = [];
let markers = L.markerClusterGroup();
for (let i = 0; i < data.length; i++) {
  let location = data[i];
  let marker = L.marker([location.Latitude, location.Longitude])
    .bindPopup(`<h3>${location['Location Name']}</h3><hr><p>${location['Phone Number']}</h3><hr><p>${location['Street Address']}<p>${location['City']}</p>`);
  markers.addLayer(marker);
}
// Add our marker cluster layer to the map.
myMap.addLayer(markers);

});