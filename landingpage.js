let bg;
let y = 0;
let mouseXY = [];

function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  bg = loadImage('imgs/0_Loading_Page_Img.jpg');
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  text1 = loadImage('imgs/0-2.png');

  img1 = loadImage('imgs/f1.png');
  img2 = loadImage('imgs/g1.png');
  img3 = loadImage('imgs/f2.png');
  img4 = loadImage('imgs/g2.png');
  img5 = loadImage('imgs/h1.png');
  img6 = loadImage('imgs/t3.png');
  img7 = loadImage('imgs/h2.png');
  img8 = loadImage('imgs/vie1.png');

  startDraw();
}

function draw() {
  
}
 
function startDraw(){
  background(bg);
  fill(0,0,0,100);
  rect(0, 0, windowWidth, windowHeight);

  image(text1, windowWidth/4, windowHeight/2, text1.width/1.5,text1.height/1.5);

  image(img2, mouseX, height/6, mouseY+10, mouseY+10);
  let inverseX = width - mouseX;
  let inverseY = height - mouseY;
  image(img3, inverseX, height/6, inverseY + 10, inverseY + 10);

  let mouseX1 = mouseX-200;
  let mouseY1 = mouseY-200;
  image(img4, mouseX1, height/6, mouseY1, mouseY1+10);
  let inverseX1 = width - mouseX1;
  let inverseY1 = height - mouseY;
  image(img5, inverseX1, height/6, inverseY1 + 10, inverseY1 + 10);

  let mouseX2 = mouseX+150;
  let mouseY2 = mouseY+150;
  image(img6, mouseX2, height/6, mouseY2, mouseY2+10);
  let inverseX2 = width - mouseX2;
  let inverseY2 = height - mouseY2;
  image(img1, inverseX2, height/6, inverseY2 + 10, inverseY2 + 10);

  let mouseX3 = mouseX+300;
  let mouseY3 = mouseY+300;
  image(img7, mouseX3, height/6, mouseY3, mouseY3+10);
  let inverseX3 = width - mouseX2;
  let inverseY3 = height - mouseY2;
  image(img8, inverseX3, height/6, inverseY3 + 10, inverseY3 + 10);

}


function bgandppl(){
  background(bg);
  fill(0,0,0,100);
  rect(0, 0, windowWidth, windowHeight);

  image(img2, mouseX, height/6, mouseY+10, mouseY+10);
  let inverseX = width - mouseX;
  let inverseY = height - mouseY;
  image(img3, inverseX, height/6, inverseY + 10, inverseY + 10);

  let mouseX1 = mouseX-200;
  let mouseY1 = mouseY-200;
  image(img4, mouseX1, height/6, mouseY1, mouseY1+10);
  let inverseX1 = width - mouseX1;
  let inverseY1 = height - mouseY;
  image(img5, inverseX1, height/6, inverseY1 + 10, inverseY1 + 10);

  let mouseX2 = mouseX+150;
  let mouseY2 = mouseY+150;
  image(img6, mouseX2, height/6, mouseY2, mouseY2+10);
  let inverseX2 = width - mouseX2;
  let inverseY2 = height - mouseY2;
  image(img1, inverseX2, height/6, inverseY2 + 10, inverseY2 + 10);

  let mouseX3 = mouseX+300;
  let mouseY3 = mouseY+300;
  image(img7, mouseX3, height/6, mouseY3, mouseY3+10);
  let inverseX3 = width - mouseX2;
  let inverseY3 = height - mouseY2;
  image(img8, inverseX3, height/6, inverseY3 + 10, inverseY3 + 10);
}

function textSmall(){
  image(text1, windowWidth/4, windowHeight/2, text1.width/1.5,text1.height/1.5);
}

function textLarge(){
  image(text1, windowWidth/5, windowHeight/2, text1.width,text1.height);
}


function mouseMoved(){
  if (mouseX >= windowWidth/4 && mouseX <= (windowWidth/4 + text1.width/1.5) 
    && mouseY >= windowHeight/2 && mouseY <= (windowHeight/2 + text1.height/1.5)){
    clear();
    bgandppl();
    textLarge();
  }
  else{
    clear();
    bgandppl();
    textSmall();
  }
}
