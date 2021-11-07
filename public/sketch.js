//socket
let socket = io();

//listen for connection
socket.on('connect', function() {
  console.log("Connected");
});

// global variables

function setup() {
  let myCanvas = createCanvas(windowWidth,windowHeight);
  myCanvas.parent ("data_container");
  background(255);
  fill(217,226,226);
  noStroke();
  rect(10,10,(windowWidth-40),(windowHeight-40));
  
  //listen for data
  socket.on('data', function(obj) {
    console.log(obj);
    drawPos(obj);
  });
}

function preload(){
  sink = loadImage("assets/Sink.png");
  hand1 = loadImage("assets/HandL.png");
  hand2 = loadImage("assets/HandR.png");
  heart = loadImage("assets/Heart-03.png");
}

function mouseDragged() {
  let mousePos = { x: mouseX, y: mouseY };
  //send data to the server
  socket.emit('data', mousePos);
}

function doubleClicked() {
  imageMode(CENTER);
  let imageHand = ["hand1", "hand2", "heart"];
  image(hand1,mouseX,mouseY,100,100);
}

function drawPos(pos) {
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 8, 8);
}

function draw(){
  imageMode(CENTER);
  image(sink,(windowWidth/2),(3*windowHeight/4));
}

