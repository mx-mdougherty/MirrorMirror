// TO DO
// Improve on stroke weight effect
// send stroke weight data from other users
// Update graphics from other users 
// add hidden interaction for faucet - turn nob add steam
// add faucet animation?
// add drips https://editor.p5js.org/RosaK/sketches/BJW6xl1_Q

//socket
let socket = io();

//listen for connection
socket.on('connect', function() {
  console.log("Connected");
});

// global variables
let strokeWidth = 8;
let fadeAmount = .1;
let f=0;
let i;
let speed;

function preload(){
  sink = loadImage("assets/Sink.png");
  hand1 = loadImage("assets/HandL.png");
  hand2 = loadImage("assets/HandR.png");
  hand3 = loadImage("assets/hand-04.png");
  hand4 = loadImage("assets/hand-05.png");
  hand5 = loadImage("assets/hand-06.png");
  hand11 = loadImage("assets/HandL-blue.png");
  hand12 = loadImage("assets/HandR-blue.png");
  hand13 = loadImage("assets/hand-04-blue.png");
  hand14 = loadImage("assets/hand-05-blue.png");
  hand15 = loadImage("assets/hand-06-blue.png");
  heart = loadImage("assets/Heart-03.png");
}
function setup() {
  let myCanvas = createCanvas(windowWidth,windowHeight);
  myCanvas.parent ("data_container");
  background(255);
  fill(217,226,226);
  noStroke();
  cursor(HAND);
  rect(10,10,(windowWidth-40),(windowHeight-40));
  //listen for data
  socket.on('mouse', data => {
		stroke(168, 190, 192, 204);
		strokeWeight(data.strokeWidth);
		line(data.x, data.y, data.px, data.py)
    f=0;
	});

  // listen for handprint
  socket.on ('handprint', details=> {
    imageMode(CENTER);
    let imageHandBlue = [hand11, hand12, hand13, hand14, hand15];
    let imgSelectBlue = random(imageHandBlue)
    image(imgSelectBlue,details.x,details.y,details.imgSize,details.imgSize);
  });

  // listen for heart
  socket.on('heart', specs =>{
    imageMode(CENTER);
    image(heart,(random(windowWidth)),(random(windowHeight)),specs.size,specs.size);
  });
}


// draw on mirror
function mouseDragged() {
  stroke(255,150);
  let speed = mouseX - pmouseX;
  strokeWeight(map(speed,0,75,8,15));
  line(mouseX, mouseY, pmouseX, pmouseY)
  // send coordinates
  sendmouse(mouseX, mouseY, pmouseX, pmouseY, strokeWeight)
}
  //send ALL data to the server
function sendmouse(mouseX, mouseY, pmouseX, pmouseY) {
  const data = {
   x: mouseX,
   y: mouseY,
   px: pmouseX,
   py: pmouseY,
   strokeWidth: strokeWidth,
  }
  socket.emit('mouse', data)
 }

//  handprint
function doubleClicked() {
  imageMode(CENTER);
  let imageHand = [hand1, hand2, hand3, hand4, hand5];
  let imgSelect = random(imageHand)
  let imgSize = random(50,150);
  image(imgSelect,mouseX,mouseY,imgSize,imgSize);
  handprint(mouseX,mouseY,imgSize);
}
// send
function handprint(mouseX,mouseY,imgSize){
  const details={
    x: mouseX,
    y: mouseY,
    imgSize: imgSize,
  }
  socket.emit('handprint', details)
 }


// //soap dispenser 
 function mousePressed(){
  if ((mouseX > ((windowWidth/2)-200)) && (mouseX < ((windowWidth/2)-140)) && (mouseY > (windowHeight-325)) && (mouseY < (windowHeight-200))){
    window.location = "/chamber";
    //  heart
    // imageMode(CENTER);
    // let size = random(100,350);
    // image(hear, (random(windowWidth)),(random(windowHeight)),size,size);
    // sendHeart(size);
  }
  else{}
}
// send heart
// function sendHeart(size){
// const specs={
//   size: size,
// }
// socket.emit('heart', specs)
// }

function mouseReleased() {
  // i=0;
  f=0;
  noStroke;
  // drips after draw start 
  // fill('white');
  // let drip = random(5,50);
  // for (let i = 0; i < drip; i=i+(.01)){
  //   ellipse(mouseX, (mouseY+i),2.5,2.5);
  // }
  }

function draw(){
  if (mouseIsPressed) {
    // pause fade
    f=0;
  }
  else{
    // how to wait 4.5 seconds and then fade out
    setTimeout(fade,4500);
  }

  function fade(){
  fill(217,226,226,f);
  f += fadeAmount;
  noStroke();
  rect(10,10,(windowWidth-40),(windowHeight-40));
  }

// place sink image
  imageMode(CENTER);
  image(sink,(windowWidth/2),(windowHeight-175));

}


