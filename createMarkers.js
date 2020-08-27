// Create markers for key locations
function draw(){
  drawMarkers();

}

function drawMarkers(){
  clear();
  noStroke();
  fill(255);
  // Get the pixel position for Malan.
  let pos1 = myMap.latLngToPixel(42.376033, -71.114733);
  // Draw an ellipse using pos
  let pt1 = ellipse(pos1.x, pos1.y, 15, 15);
  //canvas.mouseOver(mouseMoved);
  if (dist(mouseX, mouseY, pos1.x, pos1.y) < 15){   
      var img1 = popupImg();
  }
}

function popupImg(){
  let pos1 = myMap.latLngToPixel(42.376033, -71.114733);
  image(pic1, pos1.x - 15, pos1.y - 40, 30, 30);
  console.log("Find image!");
}