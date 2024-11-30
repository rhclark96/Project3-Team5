// logic_walkins_insurance.js

let url = "../../Data_Cleaning/novactypestock.csv"; // Path to your CSV file

// Initialize the map (assuming this is defined in your HTML file or another JS file)
let markers = L.markerClusterGroup(); // Create a marker cluster group

// Fetch the CSV data
d3.csv(url).then(data => {
  console.log(data); // Log the data for debugging purposes
  
  // Loop through the data and create markers
  for (let i = 0; i < data.length; i++) {
    let location = data[i];

    // Ensure Latitude and Longitude are valid numbers
    let latitude = parseFloat(location.Latitude);
    let longitude = parseFloat(location.Longitude);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      // Create a marker for each location
      let marker = L.marker([latitude, longitude])
        .bindPopup(`<h3>${location['Location Name']}</h3><hr>
                    <p>Phone: ${location['Phone Number'] || "N/A"}</p>
                    <p>Address: ${location['Street Address'] || "N/A"}, ${location['City'] || "N/A"}, ${location['State'] || "N/A"}</p>
                    <p>Walk-In: ${location['Walk-In'] === "Yes" ? "Accepted" : "Not Accepted"}</p>
                    <p>Insurance: ${location['Insurance'] === "Yes" ? "Accepted" : "Not Accepted"}</p>
                    <p><a href="${location['Website'] || "#"}" target="_blank">${location['Website'] || "Website"}</a></p>`
        );

      // Add the marker to the cluster group
      markers.addLayer(marker);
    }
  }
  
  // Add our marker cluster layer to the map.
  myMap.addLayer(markers); // Ensure myMap is defined in your existing code
}).catch(error => {
  console.error('Error loading the CSV file:', error); // Handle any errors
});
