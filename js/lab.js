/* Map of GeoJSON data from MegaCities.geojson */
//declare map var in global scope
var map;
var minValue;
//function to instantiate the Leaflet map
function createMap() {
  //create the map
  map = L.map("mapid", {
    center: [37, -95],
    zoom: 4,
  });

  //add OSM base tilelayer
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);

  //call getData function
  getData();
}

function onEachFeature(feature, layer) {
  //no property named popupContent; instead, create html string with all properties
  var popupContent = "";
  if (feature.properties) {
    //loop to add feature property names and values to html string
    for (var property in feature.properties) {
      popupContent +=
        "<p>" + property + ": " + feature.properties[property] + "</p>";
    }
    layer.bindPopup(popupContent);
  }
}

function processData(data) {
  var attributes = [];
  var properties = data.features[0].properties;
  for (var prop in properties) {
    if (prop.indexOf("POP") !== -1) {
      attributes.push(prop);
    }
  }
  console.log(attributes);
  return attributes;
}

function calculateMinValue(data) {
  var allValues = [];

  for (var state of data.features) {
    for (var year = 2010; year <= 2019; year++) {
      var attrid = "POPESTIMATE" + String(year);
      var population = state.properties[attrid];
      allValues.push(population);
    }
  }
  var minValue = Math.min(...allValues);
  return minValue;
}

function calcPropRadius(attValue) {
  //constant factor adjusts symbol sizes evenly
  var minRadius = 5;
  //Flannery Apperance Compensation formula
  var radius = 1.0083 * Math.pow(attValue / minValue, 0.5715) * minRadius;

  return radius;
}

function createPropSymbols(data, attributes) {
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return pointToLayer(feature, latlng, attributes);
    },
  }).addTo(map);
}

function pointToLayer(feature, latlng, attributes) {
  var attribute = attributes[0];
  var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };
  attValue = feature.properties[attribute];
  geojsonMarkerOptions.radius = calcPropRadius(attValue);
  var layer = L.circleMarker(latlng, geojsonMarkerOptions);
  var popupContent = "<p>State: " + feature.properties["NAME"] + "</p>";
  popupContent += "<p>Year: " + attribute.slice(-4) + "</p>";
  popupContent += "<p>Population: " + feature.properties[attribute] + "</p>";

  layer.bindPopup(popupContent);

  return layer;
}

function createSequenceControls(attributes) {
  $("#panel").append('<input class = "range-slider" type = "range">');
  $(".range-slider").attr({
    max: 9,
    min: 0,
    value: 0,
    step: 1,
  });

  $("#panel").append('<button class="step" id="reverse">Reverse</button>');
  $("#panel").append('<button class="step" id="forward">Forward</button>');

  $("#reverse").html('<img src="img/backward.png">');
  $("#forward").html('<img src="img/forward.png">');

  $(".step").on("click", function () {
    var currValue = $(".range-slider").val();
    if ($(this).attr("id") === "forward") {
      currValue++;
      currValue = currValue > 9 ? 0 : currValue;
    } else if ($(this).attr("id") === "reverse") {
      currValue--;
      currValue = currValue < 0 ? 9 : currValue;
    }

    $(".range-slider").val(currValue);
    updatePropSymbols(attributes[currValue]);
  });

  $(".range-slider").on("input", function () {
    var currValue = $(this).val();
    updatePropSymbols(attributes[currValue]);
  });
}

function updatePropSymbols(attribute) {
  map.eachLayer(function (layer) {
    if (layer.feature && layer.feature.properties[attribute]) {
      var props = layer.feature.properties;
      var radius = calcPropRadius(props[attribute]);
      layer.setRadius(radius);

      var popupContent = "<p><b>State:</b> " + props.NAME + "</p>";
      var year = attribute.slice(-4);
      popupContent +=
        "<p><b>Population in " + year + ":</b> " + props[attribute] + "</p>";

      popup = layer.getPopup();
      popup.setContent(popupContent).update();
    }
  });
}

//function to retrieve the data and place it on the map
function getData() {
  //load the data
  $.getJSON("data/populationEst.geojson", function (response) {
    var attributes = processData(response);
    minValue = calculateMinValue(response);
    console.log(minValue);

    createPropSymbols(response, attributes);
    createSequenceControls(attributes);
  });
}

$(document).ready(createMap);
