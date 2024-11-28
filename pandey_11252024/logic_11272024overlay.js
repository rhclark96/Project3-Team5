let url = "data/novactypestock.csv";

// Initialize the map
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5
});

// Adding a base layer (the background map image) to the map
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
street.addTo(myMap);

// Marker groups for feature layers
let walkinsGroup = L.layerGroup();
let insuranceGroup = L.layerGroup();
let markers = L.markerClusterGroup();

// Perform a GET request to the CSV file
d3.csv(url).then(data => {
  console.log(data);

  // Iterate through data to create markers
  data.forEach(location => {
    if (location.Latitude && location.Longitude) {
      let marker = L.marker([+location.Latitude, +location.Longitude])
        .bindPopup(`
          <h3>${location['Location Name'] || "Unknown"}</h3>
          <hr>
          <p>Phone: ${location['Phone Number'] || "N/A"}</p>
          <p>Address: ${location['Street Address'] || "N/A"}, ${location['City'] || "N/A"}, ${location['State'] || "N/A"}</p>
          <p><a href="${location['Website'] || "#"}" target="_blank">${location['Website'] || "Website"}</a></p>
        `);
      
      // Add marker to the marker cluster
      markers.addLayer(marker);

      // Add markers to specific groups based on conditions
      if (location.walkins_accepted === "true") {
        walkinsGroup.addLayer(marker);
      }
      if (location.insurance_accepted === "true") {
        insuranceGroup.addLayer(marker);
      }
    }
  });

  // Add marker cluster layer to the map
  myMap.addLayer(markers);
});

// Create base maps and overlay maps for layer control
let baseMaps = {
  "Street Map": street
};

let overlayMaps = {
  "Walk-Ins Accepted": walkinsGroup,
  "Insurance Accepted": insuranceGroup
};

// Pass map layers to layer control and add it to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Function to toggle layers based on checkboxes
function toggleLayers() {
  if (document.getElementById('walkins').checked) {
    myMap.addLayer(walkinsGroup);
  } else {
    myMap.removeLayer(walkinsGroup);
  }

  if (document.getElementById('insurance').checked) {
    myMap.addLayer(insuranceGroup);
  } else {
    myMap.removeLayer(insuranceGroup);
  }
}

// Event listeners for checkboxes
document.getElementById('Walk-Ins Accepted').addEventListener('change', toggleLayers);
document.getElementById('Insurance Accepted').addEventListener('change', toggleLayers);

// Apply default checkbox states after map setup
toggleLayers();
