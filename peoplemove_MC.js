let canvas;
let myMap;
let tripsCoordinates;
let allCoordinates = [];
// Different routes for everybody
let filteredRoutes = [];
let data;

//MAPBOX api key
mapboxgl.accessToken = 'pk.eyJ1IjoibWNhaSIsImEiOiJjazNueXZtZXowd2wwM2NsanE5YTBwMTZiIn0.Ly1XvmSy8Ks7rdWt0FGmDg';

var mappa = new Mappa('Mapbox', mapboxgl.accessToken);

// This will allow to move from one position to another
let delta = []; 
// The current coordinate in the allCoordinates array 
// that will tell the origin and destination
let coordinate = []; 

// Pixel position of the origin
let origin; 
// Vector representation of the origin
let originVector;
// Pixel position of the destination  
let destination; 
// Vector representation of the destination
let destinationVector;
// The current position of the people
let pplPosition;

let visitedRoutes = []; // A new array to hold all visited positions

const options = {
  // Cambridge
  // latitude for the center of the image 
  lat: 42.3736,
  // longitude for the center of the image
  lng: -71.1097,
  //zoom of the image. Min 1. Max 16
  zoom: 14,
  //width in pixels
  //width: 500,
  //height in pixels
  //height:700,
  //MAPBOX style
  studio: true,
  style: 'mapbox://styles/mapbox/dark-v10'
}

function preload() {
  // Load geojson data
  data = loadJSON('data/pth.geojson');
  console.log(data);
}

queue()
  .defer(d3.json, 'data/pts.geojson')
  .await(function(error, ptsData){
    //console.log(ptsData);
  });

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  // Tile Map only creates a reference to a tile map
  myMap = mappa.tileMap(options);
  // Overlay must be used to show that map
  myMap.overlay(canvas); 

  // AutoRun
  onchange_route();

  // loop over the array of features and then 
  // loop again over the array of coordinates in the geometry object
  // and then again over each array containing the latitude and longitude

  
  //onsole.log(allCoordinates.length);
  //myMap.onChange(drawRoute);
}

function onchange_route()
{
  clear()
  allCoordinates = [];
  delta = [];
  filteredRoutes = [];
  coordinate = [];
  visitedRoutes = [];
  // Filter the data accroding to user choice
  var e = document.getElementById("Classyear2");
  var strFunc = e.options[e.selectedIndex].value;

  console.log(strFunc);

  var filteredData = data.features.filter(function(d){return d.properties.CLASSYEAR == strFunc})
  console.log(filteredData);

  // Only read the filteredData
  //console.log(filteredData.length);
  for(let i = 0; i < filteredData.length; i++){
    if(filteredData[i].geometry.coordinates[0].length == 2){
      //console.log(filteredData[i].geometry.coordinates.length);
      //console.log(filteredData[i].geometry.coordinates[0]);
      filteredRoutes.push(filteredData[i].geometry.coordinates);
    }
    else{
      let subroutes = [];
      for (let j = 0; j < filteredData[i].geometry.coordinates.length; j++){
        subroutes = subroutes.concat(filteredData[i].geometry.coordinates[j])
      }
      filteredRoutes.push(subroutes);
    }
    //console.log(filteredData[i].geometry.coordinates);
    //console.log(filteredRoutes.length);

    for(let j = 0; j < filteredRoutes.length; j++){
      visitedRoutes.push([]);
      coordinate.push(0);
      delta.push(0);
    }

  }

  console.log(filteredRoutes);
  console.log(filteredRoutes[0][0]);
}

function draw(){
  for (let i = 0; i < filteredRoutes.length; i++){
    if (coordinate[i] == filteredRoutes[i].length-2){
      //drawRoute();
      continue;
    }
    if(delta[i] < 1){
    // Delta holds the current distance between the origin and the destination. 
    // 0 means is all the way in the origin and 1 that it's in the destination. 
    // We'll increase this value by 0.2 each frame.
    // Why we set it to be 0.2?????
      delta[i] += 0.1; 
    } else {
    // Once it has arrived at its destination, add the origin as a visited location
      visitedRoutes[i].push(filteredRoutes[i][coordinate[i]]) 
    // Reset the value once it hits the destination
      delta[i] = 0; 
    // Move one coordinate in the allCoordinates array
      coordinate[i] ++; 
    // Call the drawRoute to update the route
      // TOCHANGE
      drawRoute();
    }

  // Get the Lat/Lng position of the origin and 
  // transform it into pixel position at every frame
    origin = myMap.latLngToPixel(filteredRoutes[i][coordinate[i]][1], filteredRoutes[i][coordinate[i]][0]); 
  // A vector representation of the origin. Holds x and y.
    originVector = createVector(origin.x, origin.y); 
  // Get the Lat/Lng position of the destination and 
  // transform it into pixel position at every frame. 
  // The destination is one element in front of the current coordinate
    destination = myMap.latLngToPixel(filteredRoutes[i][coordinate[i] + 1][1], filteredRoutes[i][coordinate[i] + 1][0]);  
  // A vector representation of the destination.
    destinationVector = createVector(destination.x, destination.y);

  // The current position of the people will be determined
  // by the distance between the origin and the 
  // destination that delta contains.
    position = originVector.lerp(destinationVector, delta[i]);

    noStroke();
  // Color of the dot
    fill(255,255,0);
  // Draw the people in the current position: Size/middlepoint
    ellipse(position.x, position.y, 7, 7);
  }
}

// This functions draws a line with n-vertices where n = visited routes;
function drawRoute(){

  myMap.onChange(clear);
  for (let n = 0; n < filteredRoutes.length; n++){
  //??????HOWTOCLEAR
  // stroke color and width to see the route line
  stroke(255,255,0,40);
  strokeWeight(5);
  if(visitedRoutes[n].length > 0){
    noFill();
    beginShape();
    //why e?
    visitedRoutes[n].forEach(function (e) {
        var pos = myMap.latLngToPixel(e[1], e[0]);
        vertex(pos.x, pos.y);
    })
    endShape()
  }
}
}


