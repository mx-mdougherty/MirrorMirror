//socket
let socket = io();

//listen for connection
socket.on('connect', function() {
  console.log("Connected");
});

// global variables
let strokeWidth = 8;
let color = 255;
let fadeAmount = 10;
let f=0;

function setup() {
  let myCanvas = createCanvas(windowWidth,windowHeight);
  myCanvas.parent ("data_container");
  background(255);
  fill(217,226,226);
  noStroke();
  rect(10,10,(windowWidth-40),(windowHeight-40));
  //listen for data
  socket.on('mouse', data => {
		stroke(color,100);
		strokeWeight(data.strokeWidth);
		line(data.x, data.y, data.px, data.py)
	})
}

function preload(){
  sink = loadImage("assets/Sink.png");
  hand1 = loadImage("assets/HandL.png");
  hand2 = loadImage("assets/HandR.png");
  heart = loadImage("assets/Heart-03.png");
}
// dragged
function mouseDragged() {
  stroke(255,100);
  strokeWeight(strokeWidth);
  line(mouseX, mouseY, pmouseX, pmouseY)
  // send coordinates
  sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}
  //send ALL data to the server
function sendmouse(x, y, pX, pY) {
  const data = {
   x: x,
   y: y,
   px: pX,
   py: pY,
   color: (color,100),
   strokeWidth: strokeWidth,
  }
  socket.emit('mouse', data)
 }
 

function doubleClicked() {
  imageMode(CENTER);
  let imageHand = [hand1, hand2, heart];
  let img = random(imageHand);
    image(img,mouseX,mouseY,random(70,110),random(70,110));
}

// fade out
function mouseReleased() {
  fill(217,226,226,f);
  f += fadeAmount;
  noStroke();
  rect(10,10,(windowWidth-40),(windowHeight-40));
}

function draw(){
  imageMode(CENTER);
  image(sink,(windowWidth/2),(3*windowHeight/4));
}

