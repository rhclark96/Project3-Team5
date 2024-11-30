let url = "../Data_Cleaning/novactypestock.csv";

// Initialize all the LayerGroups that we'll use.
let layers = {
  INSURANCE: new L.LayerGroup(),
  WALKIN: new L.LayerGroup(),
};

// Initialize the map 
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5,
});

// Adding a tile layer (the background map image) to the map:
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create overlays object to add to layer control.
let overlays = {
  "Accepts Walk-Ins": layers.WALKIN,
  "Accepts Insurance": layers.INSURANCE
};

// Create a control for our layers, add overlays
L.control.layers(null, overlays).addTo(myMap);

// Creation of control to hold search bar, include API key to access geocoding
L.control.geocoder('pk.f9a6e58ed4410a44cd8351ef4757e81a').addTo(myMap);

// Perform a GET request to the query URL
d3.csv(url).then(data => {
  console.log(data);
  
  let markers = L.markerClusterGroup();
  for (let i = 0; i < 1000;i++){//data.length; i++) {
    let location = data[i];
    let marker = L.marker([location.Latitude, location.Longitude])
      .bindPopup(`<h3>${location['Location Name']}</h3><hr>
                    <p>Phone: ${location['Phone Number'] || "N/A"}</p>
                    <p>Address: ${location['Street Address'] || "N/A"}, ${location['City'] || "N/A"}, ${location['State'] || "N/A"}</p>
                    <p>Walk-In: ${location['Walk-Ins Accepted'] ==="True" ? "Accepted" : "Not Accepted"}</p>
                    <p>Insurance: ${location['Insurance Accepted'] ==="True" ? "Accepted" : "Not Accepted"}</p>
                    <p><a href="${location['Website'] || "#"}" target="_blank">${location['Website'] || "Website"}</a></p>`
                  );

    // Add markers to layer groups based on insurance and walk-in status
    //console.log(location)
    if (location['Walk-Ins Accepted'] === "True") {
      //console.log("Hitting this point")
      layers.WALKIN.addLayer(marker);
    }
    if (location['Insurance Accepted'] === "True") {
      layers.INSURANCE.addLayer(marker);
    }
    markers.addLayer(marker);
  }

  // Add our layers to the map.
  myMap.addLayer(markers); // Add the marker cluster group to the map
  layers.WALKIN.addTo(myMap); // Add the walk-in layer to the map
  layers.INSURANCE.addTo(myMap); // Add the insurance layer to the map
});