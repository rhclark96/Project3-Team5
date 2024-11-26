// Perform a GET request to the query URL
d3.csv("data/providers.csv").then(function (data) {
  console.log(data); // Log the data to the console
  
  // Process the data here, for example, creating features on a map
  createFeatures(data); // Assuming you have a createFeatures function defined
}).catch(function(error) {
  console.error('Error loading the CSV file:', error); // Handle any errors
});

// You can initialize your map here if you haven't done so yet
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5
});

// Adding a tile layer (the background map image) to our map:
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);