import React from "react";
import L from "leaflet";
import * as d3 from "d3";


export default ({results=[]}) => {

  React.useEffect(() => {
    console.log(results)
    const MAP_CONTAINER = document.getElementById("map-container");
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "map");
      MAP_CONTAINER.appendChild(MAP_ID);

        // Creating map object
        var myMap = L.map("map", {
            center: [40.7128, -74.0059],
            zoom: 11
        });
        
        // Adding tile layer

        var apiKey = process.env.REACT_APP_MAP_API_KEY.substring(1,process.env.REACT_APP_MAP_API_KEY.length-1);

        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'></a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: apiKey,
        }).addTo(myMap);
        
        
        // Function that will determine the color of a neighborhood based on the borough it belongs to
        function chooseColor(borough) {
            switch (borough) {
            case "Brooklyn":
            return "yellow";
            case "Bronx":
            return "red";
            case "Manhattan":
            return "orange";
            case "Queens":
            return "green";
            case "Staten Island":
            return "purple";
            default:
            return "black";
            }
        }
        

            // Creating a geoJSON layer with the retrieved data
            var geoJson = L.geoJson(results, {
            // Style for each feature (in this case a neighborhood)
            style: function(feature) {
                return {
                color: "white",
                // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                fillColor: chooseColor(feature.properties.borough),
                fillOpacity: 0.5,
                weight: 1.5
                };
            },
            // Called on each feature
            onEachFeature: function(feature, layer) {
                // Setting various mouse events to change style when different events occur
                layer.on({
                // On mouse over, make the feature (neighborhood) more visible
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                    fillOpacity: 0.9
                    });
                },
                // Set the features style back to the way it was
                mouseout: function(event) {
                    geoJson.resetStyle(event.target);
                },
                // When a feature (neighborhood) is clicked, fit that feature to the screen
                click: function(event) {
                    myMap.fitBounds(event.target.getBounds());
                }
                });
                // Giving each feature a pop-up with information about that specific feature
                layer.bindTooltip("<h4>" + feature.properties.neighborhood + "</h4>");
            }
            }).addTo(myMap);

    return () => (MAP_CONTAINER.innerHTML = ""); 
  }, [results]);

  return <div id="map-container"></div>; 
};

