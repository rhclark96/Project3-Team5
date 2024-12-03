# Project3-Team5

# Project title: COVID-19 Vaccination Provider Locations.

## Overview: The main objective of our project was to help the public find COVID-19 vaccination provider locations, as well as basic information on the importance of vaccination against COVID-19. 


## Usage Instructions
Broadly, the cluster and marker map provides the number of locations in a city. Users can zoom in to narrow the area and find the vaccine provider locations near their neighborhood.

Each location is marked with a marker. The marker popup has information about the provider’s name, phone number, address, and website. Users can get more information about the location through the website and schedule appointments to get their COVID-19 vaccines.
The map has multiple layers of markers that can be toggled to help users locate the providers that have locations that accept insurance and/or walk-in appointments.

Users can also search for a nearby vaccine provider location by providing an address or zip code in the search bar. This will create a marker at the searched location to help users focus their search in the desired area.

The map could be further enhanced by providing more information, like types of vaccines available at a location, although we decided not to include such information to keep the map less crowded and visually appealing and to minimize the storage required for the machine to run the data.

## Ethical Considerations
This dataset is from a public source (CDC, DHHS) and does not include any personal information. 
Data analyses indicated that the urban centers had a relatively higher density of vaccine providers compared to the rural areas. Our suggestion is to increase the number of locations in rural areas to enable easy access to COVID-19 vaccines. 

## Libraries and Plugins Utilized
Data cleaning and storage were completed using Python via Jupyter Notebooks, and the vaccine provider locations dataset was ultimately stored in MongoDB. Cleaned data was saved to CSV files for ease of access and use in the creation of final visualizations. 

Website developed using JavaScript, HTML, and CSS. The mapping visual was created using Leaflet and D3 libraries, while additional Leaflet plugins were used to add more user-driven operations, such as the search bar (using the Leafelt LocationIQ Geocoder Plugin https://github.com/location-iq/leaflet-geocoder) and the clustered marked (using the Leaflet.markercluster plugin https://github.com/Leaflet/Leaflet.markercluster). 

Creation of the website interface driven by HTML and Bootstrap. 

## References
The dataset was downloaded from the CDC, DHHS (https://catalog.data.gov/dataset/vaccines-gov-covid-19-vaccinating-provider-locations-181de).

Yee R, Carranza D, Kim C, Trinidad J, Tobias JL, Bhatkoti R, et al. COVID-19 Vaccination Site Accessibility, United States, December 11, 2020–March 29, 2022. Emerging Infectious Diseases. 2024;30(5):947-955. https://doi.org/10.3201/eid3005.230357
