

// Initialize the map 
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5
});

// Adding a tile layer (the background map image) to the map:
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
street.addTo(myMap);

// Perform a GET request to the query URL
let path = "../Data_Cleaning/Vaccine_Providers.csv";
d3.csv(path).then(data => {
  data.forEach(row => {
    // Get the column headers from the first row
    const headers = Object.keys(data[0]);
    
    // Log the headers to the console
    // console.log("Column Headers:", headers);

    let locationName = row['Location Name']; 
    let Latitude = parseFloat(row['Latitude']); 
    let Longitude = parseFloat(row['Longitude']);

    // Add marker to the map
    if (!isNaN(Longitude)){
      L.marker([Latitude, Longitude]) // Latitude and Longitude for the marker position
      .addTo(myMap) // Add the marker to the map
      .bindPopup(`<b>${locationName}</b>`); // Popup content
    }
    
  });
});

// Define arrays to hold the created city and state markers.
let locationMarkers = [];

// Loop through locations with specific latitude and longitude
data.forEach(row => {
  let Latitude = parseFloat(row['Latitude']); 
  let Longitude = parseFloat(row['Longitude']);
  
  // Create a circle marker
  let circle = L.circle([Latitude, Longitude], {
    stroke: false,
    fillOpacity: 0.75,
    color: "white",
    fillColor: "white",
    radius: 100 // You can set a radius based on your needs
  }).addTo(myMap);

  locationMarkers.push(circle); // Store the circle in the array
});