var map = L.map("mapid").setView([40, -104], 3);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiaGNoZW41NDkiLCJhIjoiY2tmZ2JyaHYzMDJrcjJ0bXFrbnJsYW05dyJ9.JY85kTTf6VDpVUp6nFH7Kg",
  }
).addTo(map);

var states = [
  {
    type: "Feature",
    properties: { party: "Republican" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-104.05, 48.99],
          [-97.22, 48.98],
          [-96.58, 45.94],
          [-104.03, 45.94],
          [-104.05, 48.99],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: { party: "Democrat" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-109.05, 41.0],
          [-102.06, 40.99],
          [-102.03, 36.99],
          [-109.04, 36.99],
          [-109.05, 41.0],
        ],
      ],
    },
  },
];

L.geoJSON(states, {
  style: function (feature) {
    switch (feature.properties.party) {
      case "Republican":
        return { color: "#ff0000" };
      case "Democrat":
        return { color: "#0000ff" };
    }
  },
}).addTo(map);

var geojsonFeature = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621],
  },
};

var myLines = [
  {
    type: "LineString",
    coordinates: [
      [-100, 40],
      [-105, 45],
      [-110, 55],
    ],
  },
  {
    type: "LineString",
    coordinates: [
      [-105, 40],
      [-110, 45],
      [-115, 55],
    ],
  },
];

var myStyle = {
  color: "#ff7800",
  weight: 5,
  opacity: 0.65,
};

L.geoJSON(myLines, {
  style: myStyle,
}).addTo(map);

var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

var someFeatures = [
  {
    type: "Feature",
    properties: {
      name: "Coors Field",
      show_on_map: true,
    },
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Busch Field",
      show_on_map: false,
    },
    geometry: {
      type: "Point",
      coordinates: [-104.98404, 39.74621],
    },
  },
];

L.geoJSON(someFeatures, {
  filter: function (feature, layer) {
    return feature.properties.show_on_map;
  },
}).addTo(map);

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}

var geojsonFeature = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621],
  },
};

L.geoJSON(geojsonFeature, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
}).addTo(map);

L.geoJSON(geojsonFeature, {
  onEachFeature: onEachFeature,
}).addTo(map);
// L.geoJSON(geojsonFeature).addTo(map);
