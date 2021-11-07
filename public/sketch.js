//socket
let socket = io();

//listen for connection
socket.on('connect', function() {
  console.log("Connected");
});

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
}

function mouseDragged() {
  let mousePos = { x: mouseX, y: mouseY };
  //send data to the server
  socket.emit('data', mousePos);
}

function drawPos(pos) {
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 8, 8);
}

function draw(){
  image(sink,(0,0));
}
// function foreground() {
//   image(sink,(0,0));
//   noFIll();
//   strokeWeight(4);
//   rect(10,10,(windowWidth-40),(windowHeight-40));
//  }