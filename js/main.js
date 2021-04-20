/* Map of GeoJSON data from MegaCities.geojson */
//declare map var in global scope
var map = (map = L.map("mapid", {
  center: [43.0731, -89.4012],
  zoom: 11,
}));
var minValue;

map.on("click", function (e) {
  alert(e.latlng);
});

var getColor = chroma.scale(["#FFEDA0", "#800026"]).domain([0, 20000]);

var measures = [
  "tot_pop_10",
  "pc_wht_10",
  "avg_huval",
  "yrblt_mdn",
  "trst_trps",
];

var chartWidth = window.innerWidth * 0.5,
  chartHeight = 460,
  leftPadding = 40,
  rightPadding = 2,
  topBottomPadding = 5,
  chartInnerWidth = chartWidth - leftPadding - rightPadding,
  chartInnerHeight = chartHeight - topBottomPadding * 2,
  // translate = "translate(" + leftPadding + "," + 0 + ")";
  translate = "translate(" + leftPadding + "," + topBottomPadding / 2 + ")";

function onEachFeature(feature, layer) {
  var popupContent = "tot_pop_10";
  if (feature.properties) {
    console.log("a");
    layer.bindPopup(
      "<p>" +
        "Neighborhood: " +
        feature.properties["NEIGHB_NAME"] +
        "<br>" +
        popupContent +
        ": " +
        feature.properties[popupContent] +
        "</p>"
    );
  }
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: changeColor,
  });
}

function highlightFeature(e) {
  var layer = e.target;
  console.log(layer);

  var neighborName = layer.feature.properties["NEIGHB_NAME"];
  console.log(neighborName);

  var GEOID;

  for (var i = 0; i < attributes.length; i++) {
    if (attributes[i]["name"] === neighborName) {
      GEOID = attributes[i]["geo_key"];
    }
  }

  highlightNeighBar(GEOID);

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,
    opacity: 1,
    color: "blue",
    dashArray: "3",
    fillOpacity: 0.7,
  });

  var neighborName = layer.feature.properties["NEIGHB_NAME"];
  console.log(neighborName);

  var GEOID;

  for (var i = 0; i < attributes.length; i++) {
    if (attributes[i]["name"] === neighborName) {
      GEOID = attributes[i]["geo_key"];
    }
  }

  dehighlightNeighBar(GEOID);

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function changeColor(e) {
  var layer = e.target;

  // layer.setStyle({
  //   weight: 2,
  //   opacity: 1,
  //   color: "blue",
  //   dashArray: "3",
  //   fillOpacity: 0.7,
  //   fillColor: "yellow",
  // });
  if (layer.style["fillColor"] !== "white") {
    layer.setStyle({ fillColor: "yellow" });
  } else {
    layer.style["fillColor"] = "yellow";
  }
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties["tot_pop_10"]),
    weight: 2,
    opacity: 1,
    color: "blue",
    dashArray: "3",
    fillOpacity: 0.7,
    className: feature.properties["NEIGHB_NAME"],
  };
}

//function to instantiate the Leaflet map
function createMap() {
  //add OSM base tilelayer
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);

  //call getData function
  getData();
}

function getData() {
  var promises = [
    d3.csv("data/nip_neighbassoc_19.csv"),
    d3.csv("data/nip_neighbassoc_18.csv"),
    d3.csv("data/nip_neighbassoc_17.csv"),
    d3.csv("data/nip_neighbassoc_16.csv"),
    d3.csv("data/nip_neighbassoc_15.csv"),
    d3.csv("data/nip_neighbassoc_14.csv"),
    d3.csv("data/nip_neighbassoc_13.csv"),
    d3.csv("data/nip_neighbassoc_12.csv"),
    // d3.json("data/EuropeCountries.topojson"),
    (us = d3.json(
      "https://opendata.arcgis.com/datasets/66e4a6a80ae64865a81bc8d4464a6417_12.geojson"
    )),
  ];

  Promise.all(promises).then(callback);
}

function callback(data) {
  attributes = data[0];
  madisonMap = data[data.length - 1];
  console.log(attributes);
  console.log(madisonMap);

  attributes = attributes.filter((d) => {
    return (
      parseFloat(d["tot_pop_10"]) > 0 && parseFloat(d["tot_pop_10"]) < 200000
    );
  });

  madisonMap.features = madisonMap.features.filter((neigh) => {
    return neigh.properties["NEIGHB_NAME"] !== "City of Madison";
  });

  console.log(attributes);
  console.log(madisonMap);

  joinData(madisonMap, attributes);

  console.log(madisonMap);

  L.geoJson(madisonMap, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  createBarChart();
}

function joinData(madisonMap, attributes) {
  for (var i = 0; i < madisonMap.features.length; i++) {
    var neighborsName = madisonMap.features[i]["properties"]["NEIGHB_NAME"];
    //   console.log(stateName);

    for (var j = 0; j < attributes.length; j++) {
      if (attributes[j]["name"] == neighborsName) {
        measures.forEach((measure) => {
          madisonMap.features[i]["properties"][measure] = parseFloat(
            attributes[j][measure]
          );
        });

        // console.log(stateName + attributes[j]["income"]);
      }
    }
  }
}

// function onEachFeature(feature, layer) {

//     if (feature.properties && feature.properties["tot_pop_10"]) {

//         var popupContent = feature.properties["tot_pop_10"].toString();

//         console.log(popupContent);
//         layer.bindPopup(popupContent);
//     }
//     // layer.bindPopup(popupContent);
// }

function createBarChart() {
  var expressed = "tot_pop_10";

  var maxValue = d3.max(attributes, (d) => {
    return parseFloat(d[expressed]);
  });
  var yScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, maxValue]);

  console.log(maxValue);

  n = attributes.length;
  var chart = d3.select("#barChart").append("svg").attr("class", "barchart");
  var bars = chart
    .selectAll(".rect")
    .data(attributes)
    .enter()
    .append("rect")
    .sort(function (a, b) {
      return b[expressed] - a[expressed];
    })
    .attr("id", (d) => {
      return "_" + d.geo_key;
    })
    .attr("x", function (d, i) {
      // return i * (chartInnerWidth / n) + leftPadding;
      return i * (chartInnerWidth / n - 1) + leftPadding;
    })
    .attr("width", chartInnerWidth / attributes.length - 1.5)
    //size/resize bars
    .attr("height", function (d, i) {
      return 460 - yScale(parseFloat(d[expressed]));
    })
    .attr("y", function (d, i) {
      return yScale(parseFloat(d[expressed])) + topBottomPadding;
    })
    .style("fill", "blue")
    .style("color", "blue")
    .on("mouseover", (event, d) => {
      highlightNeighBar(d.geo_key);
      highlightMap(d);
    })
    .on("mouseout", (event, d) => {
      dehighlightNeighBar(d.geo_key);
      dehighlightMap(d);
    });
}

function highlightNeighBar(neigh) {
  // var barchart = d3.select("#barChart");
  // console.log(barchart);
  var barChart = d3.select("#barChart").select("." + "barchart");
  var bar = barChart.select("#_" + neigh);
  // console.log(bar);
  bar.style("stroke", "red").style("stroke-width", "3");
}

function highlightMap(d) {
  var selected_elements = document.getElementsByClassName(d.name);
  var selected_element = selected_elements[0];
  console.log(selected_element);
  // selected_elements.style["weight"] = "red";
  selected_element.style["stroke"] = "red";
  selected_element.style["stroke-width"] = "4";
}

function dehighlightNeighBar(neigh) {
  var barChart = d3.select("#barChart").select("." + "barchart");
  var bar = barChart.select("#_" + neigh);
  // console.log(bar);
  bar.style("stroke", "black").style("stroke-width", "1");
}

function dehighlightMap(d) {
  var selected_elements = document.getElementsByClassName(d.name);
  var selected_element = selected_elements[0];
  console.log(selected_element);
  // selected_elements.style["weight"] = "red";
  selected_element.style["stroke"] = "blue";
  selected_element.style["stroke-width"] = "2";
}

$(document).ready(createMap);
