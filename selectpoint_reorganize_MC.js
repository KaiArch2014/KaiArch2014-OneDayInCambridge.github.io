  
let canvas;
let myMap;

let ptsdata;

let markersdata;

// Filtered points
let fpts = [];

// Markers list
let markersList = [];
let markersLat = [];
let markersLng = [];
let markersText = [];
let markersImgsLinks = [];
let markersImg = [];

let minidis = 10000;
let mininum = 0;

//MAPBOX api key
mapboxgl.accessToken = 'pk.eyJ1IjoibWNhaSIsImEiOiJjazNueXZtZXowd2wwM2NsanE5YTBwMTZiIn0.Ly1XvmSy8Ks7rdWt0FGmDg';

var mappa = new Mappa('Mapbox', mapboxgl.accessToken);

const options = {
  lat: 42.3736,
  lng: -71.1097,
  zoom: 14,
  studio: true,
  style: 'mapbox://styles/mapbox/dark-v10',
}

// Load files
function preload(){
  // Load pts data
  ptsdata = loadJSON('data/pts.geojson')
  console.log(ptsdata);

  //Load markers data
  markersdata = loadTable('data/markers.csv', 'csv', 'header');

  // Load font type
  font_regular = loadFont('font/Rajdhani/Rajdhani-Regular.ttf');
  
}

// Set up canvas
function setup()
{
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  
  refilter();
  drawMarkers();
  colorLegend();

  // Load Image
  markersImgsLinks = markersdata.getColumn("ImageLink");
  for (let i = 0; i < markersdata.getRowCount(); i++){
    markersImg[i] = loadImage(markersImgsLinks[i]);
  }
}

// Filter the data according to user choice
function refilter(){
  // Get the function
  var e = document.getElementById("Function");
  var strFunc = e.options[e.selectedIndex].value;

  // Get the classyear
  var g = document.getElementById("Classyear");
  var strFunc3 = g.options[g.selectedIndex].value;

  // Get the duration
  var h = document.getElementById("Duration");
  var strFunc4 = h.options[h.selectedIndex].value;

  // Get the filtered points list
  var filteredpts = ptsdata.features.filter(function(d){return d.properties.FUNCTION == strFunc
      && d.properties.CLASSYEAR == strFunc3 && int(d.properties.DUR) <= int(strFunc4)})
  console.log(filteredpts);

  // Clear the list first
  fpts = [];

  // Store new data with selected function into the fpts list
  for (let i = 0; i < filteredpts.length; i++){
    let coordinate = filteredpts[i].geometry.coordinates;
    let lng = coordinate[1];
    let lat = coordinate[0];
    // Notice this function needs to be recalled everytime to draw
    let pos = myMap.latLngToPixel(coordinate[1],coordinate[0]);
    let size = filteredpts[i].properties.SIZE;
    let actdef1 = filteredpts[i].properties.ActDef_1;
    let actdef2 = filteredpts[i].properties.Actdef_2;
    let func1 = filteredpts[i].properties.FUNCTION;
    let func2 = filteredpts[i].properties.FUNCTION_2;
    let hover = false;
    let press = false;

    //console.log(size);

    let fpt = {
      lng: lng,
      lat: lat,
      x: pos.x,
      y: pos.y,
      size: size,
      actdef1: actdef1,
      actdef2: actdef2,
      func1: func1,
      func2: func2,
      hover: hover,
      press: press,

      // Will be added later on
      color: []
    }
    // Push new element to the list
    fpts.push(fpt);
  }

  //console.log(fpts);
  changeSize();
  addColor();
  //console.log(fpts);
  //drawPoints();
  myMap.onChange(drawPoints);
}

// Change size of each pt
// alternative: Should we normalize the range of data? the raw data range is 0-10000
// next step: if normalize, set data > 1000 to be a maximun number
function changeSize(){
  for (let i = 0; i < fpts.length; i++){
    if (fpts[i].size == 0){
      fpts[i].size = fpts[i].size + 3;
    }
    if (fpts[i].size > 0 && fpts[i].size <= 10){
      fpts[i].size = 4;
    }
    if (fpts[i].size > 10 && fpts[i].size <= 20){
      fpts[i].size = 5;
    }
    if (fpts[i].size > 20 && fpts[i].size <= 100){
      fpts[i].size = 7;
    }
    if (fpts[i].size > 100 && fpts[i].size <= 200){
      fpts[i].size = 9;
    }
    if (fpts[i].size > 200 && fpts[i].size <= 300){
      fpts[i].size = 10;
    }
    if (fpts[i].size > 300 && fpts[i].size <= 400){
      fpts[i].size = 11;
    }
    if (fpts[i].size > 400 && fpts[i].size <= 500){
      fpts[i].size = 12;
    }
    if (fpts[i].size > 500 && fpts[i].size <= 1000){
      fpts[i].size = 14;
    }
    if (fpts[i].size > 500 && fpts[i].size <= 1000){
      fpts[i].size = 16;
    }
    if (fpts[i].size > 1000){
      fpts[i].size = 20;
    }
  }
  //console.log(fpts);
}

// Def the color of each pt
function addColor(){
  // QUESTION: Can we use forEach to write this one?
  for (let i = 0; i < fpts.length; i++){
    if (fpts[i].func2 == "Mental"){
      fpts[i].color = [255,255,0];
    }
    else if (fpts[i].func2 == "Bodily"){
      fpts[i].color = [255,127,0];
    }
    else if (fpts[i].func2 == "Economic"){
      fpts[i].color = [77,233,76];
    }
    else if (fpts[i].func2 == "Social"){
      fpts[i].color = [255,0,0];
    }
    else{
      fpts[i].color = [0,0,255];
    }
  }
  //console.log(fpts);
}

function draw()
{
}

// Drawpoints on Canvas
function drawPoints(){
  clear()
  for (let i = 0; i < fpts.length; i++){
    // noStroke();
    // Add stroke colors/weighs to circles
    stroke(fpts[i].color[0],fpts[i].color[1],fpts[i].color[2]);
    strokeWeight(1);
    fill(fpts[i].color[0],fpts[i].color[1],fpts[i].color[2],120);
    let pos = myMap.latLngToPixel(fpts[i].lng,fpts[i].lat);
    ellipse(pos.x,pos.y,fpts[i].size,fpts[i].size);

    // Update the x and y
    fpts[i].x = pos.x;
    fpts[i].y = pos.y;
  }
  console.log("drawPoints!");
  drawMarkers();
  colorLegend()
}

// Whenever the mouse moves, check if it is on a circle
function mouseMoved(){
  // The smallest distance and current mininum
  minidis = 10000;
  mininum = 0;
  // Go through each pt to find the closet one
  for (let i = 0; i < fpts.length; i++){
    var d = dist(mouseX, mouseY,fpts[i].x,fpts[i].y)
    //console.log(mouseX);
    //console.log(mouseY);
    //console.log(fpts[i].x);
    //console.log(fpts[i].y);
    if (d <= minidis){
      minidis = d;
      mininum = i;
    }
  }
  //console.log(mininum);

  // Compare the distance with the size (if hover on)
  if (float(fpts[mininum].size) >= float(minidis))
  {
    ImgTextPop();
  }
  else{
    drawPoints();
    drawMarkers();
  }

  // else{
  //   image(pic2,fpts[mininum].x-60,fpts[mininum].y-80,150,90);
  //   //text("good",fpts[mininum].x+10,fpts[mininum].y-40)
  // }
}

function mousePressed(){

}

function ImgTextPop(){
  // Text popup
  //image(pic1,fpts[mininum].x-60,fpts[mininum].y-80,150,90);
  fill(255,255,255);
  textAlign(LEFT,TOP);
  textFont(font_regular);

  // Test whether there is a functiondef2 or not
  if (fpts[mininum].actdef2 == ""){
    var w = textWidth(fpts[mininum].actdef1);
    fill(0, 0, 0, 10);
    rect(fpts[mininum].x-19,fpts[mininum].y-30, w+14, 15);
    fill(255);
    stroke(fpts[mininum].color[0],fpts[mininum].color[1],fpts[mininum].color[2]);
    text(fpts[mininum].actdef1,fpts[mininum].x-12,fpts[mininum].y-30);  
    }
  else{
    var w = textWidth(fpts[mininum].actdef2);
    fill(0, 0, 0, 50);
    rect(fpts[mininum].x-19,fpts[mininum].y-30, w+14, 15);
    fill(255);
    stroke(fpts[mininum].color[0],fpts[mininum].color[1],fpts[mininum].color[2]);
    text(fpts[mininum].actdef2,fpts[mininum].x-12,fpts[mininum].y-30);  
    }
    //console.log("Hi, ImgTextPop!");
}

function drawMarkers(){
  // Get location name
  //var markersName = markersdata.getColumn("LocationName")
  // Get latitudes
  markersLat = markersdata.getColumn("lat");
  // Get longtitudes
  markersLng = markersdata.getColumn("lng");

  for(let i = 0; i < markersdata.getRowCount(); i++){
    // var name = markersdata.getString(i, "LocationName");
    // markersLat = markersdata.getNum(i, "lat");
    // markersLng = markersdata.getNum(i, "lng");
    // var descr = markersdata.getString(i, "LocationName");
    // var links = markersdata.getString(i, "LocationName");
    stroke(255);
    fill(255, 255, 255, 120);
    // Get the marker positions and draw ellipses on map
    var pos = myMap.latLngToPixel(markersLat[i], markersLng[i]);
    var pt = ellipse(pos.x, pos.y, 10, 10);
  }
  mouseOverMarkers();
}

// When mouse over the markers
function mouseOverMarkers(){
  for(let i = 0; i < markersdata.getRowCount(); i++){
    var pos1 = myMap.latLngToPixel(markersLat[i], markersLng[i]);
    if (dist(mouseX, mouseY, pos1.x, pos1.y) < 10){   
      markersImgTxtPop(i);
      console.log("find mouse!");
    }
  }
}

//Pop up images and text for markers
function markersImgTxtPop(i){
    markersText = markersdata.getColumn("Description");

    var selectedMLat = markersLat[i];
    var selectedMLng = markersLng[i];
    let pos = myMap.latLngToPixel(selectedMLat, selectedMLng);
    console.log(markersText);
    var w = textWidth(markersText[i]);
    image(markersImg[i], pos.x - 35, pos.y - 80, 70, 70);
    
    fill(0, 0, 0, 50);
    stroke(255);
    strokeWeight(0.5);
    rect(pos.x+40, pos.y-50, w+14, 15);
    fill(255);
    strokeWeight(0.5);
    textAlign(LEFT);
    text(markersText[i],pos.x+47, pos.y-50);
    console.log("Find image!");

  console.log("markers pop!")
}

function colorLegend(){
  // Draw color legend-White:Markers
  noStroke()
  fill(255);
  textFont(font_regular);
  textAlign(CENTER);
  text("Markers", 220, windowHeight-15);
  fill(255, 255, 255, 120);
  stroke(255);
  ellipse(220, windowHeight-32, 10, 10);

  // Draw color legend-Red:Mental
  noStroke()
  fill(255);
  textAlign(CENTER);
  text("Mental", 295, windowHeight-15);
  fill(255,255,0, 120);
  stroke(255,255,0);
  rect(260, windowHeight-35, 70, 8);
  // Draw color legend-Orange:Bodily
  noStroke()
  fill(255);
  textAlign(CENTER);
  text("Bodily", 365, windowHeight-15);
  fill(255,127,0, 120);
  stroke(255,127,0);
  rect(330, windowHeight-35, 70, 8);
  // Draw color legend-Green:Economical
  noStroke()
  fill(255);
  textAlign(CENTER);
  text("Economical", 435, windowHeight-15);
  fill(77,233,76, 120);
  stroke(77,233,76);
  rect(400, windowHeight-35, 70, 8);
  // Draw color legend-Red:Social
  noStroke()
  fill(255);
  textAlign(CENTER);
  text("Social", 505, windowHeight-15);
  fill(255,0,0, 120);
  stroke(255,0,0);
  rect(470, windowHeight-35, 70, 8);
  // Draw color legend-Blue:Other
  noStroke()
  fill(255);
  textAlign(CENTER);
  text("Others", 575, windowHeight-15);
  fill(0,0,255, 120);
  stroke(0,0,255);
  rect(540, windowHeight-35, 70, 8);

  // Draw size legend
  noStroke()
  fill(255);
  textAlign(CENTER);
  text("Range of Activity", 670, windowHeight-15);
  stroke(255);
  strokeWeight(1);
  noFill();
  ellipse(670, windowHeight-30, 15, 15);
  ellipse(670, windowHeight-30, 15, 15);
}
