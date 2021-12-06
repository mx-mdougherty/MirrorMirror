// REFERENCES:
// https://editor.p5js.org/aferriss/sketches/SJhoZHsqf

// Next Steps
// Add ballon pop sound
// balloons are generated from data in secret.db


//  get data from db file
// fetch ("/Secrets")
//  .then (resp=>resp.json())
//  .then (data=>{
//     let number = data.data.length; 
// })

// p5js canvas
let number=10;
let value;
let balls = [];


function preload(){
    pick = loadImage("assets/pick-02.png");
    bubble1 = loadImage("assets/Bubble-01.png");
    bubble2 = loadImage("assets/Bubble-02.png");
    bubble3 = loadImage("assets/Bubble-03.png");
    bubble4 = loadImage("assets/Bubble-04.png");
    bubble5 = loadImage("assets/Bubble-05.png");
    bubble6 = loadImage("assets/Bubble-06.png");
    bubble7 = loadImage("assets/Bubble-07.png");
}


function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("bubble_space");
    noStroke();
    let bubbleImg= [
        bubble1,
        bubble2,
        bubble3,
        bubble4,
        bubble5,
        bubble6,
        bubble7,
    ]
    for (let i = 0; i < number; i++) {
        // let bubbleImg=loadImage("assets/"+bubble[i]+".png");
        // let bubbleChoice = bubbleImg;
        // let bubbleChoice = i;
        let ball = new Ball(
            (random(width)), // x
            (random(height)), // y
            (random(1,3)), //speedx
            (random(1,3)), // speed y
            (random(50,325)), //size
            (random(bubbleImg)),
        );
        balls.push(ball);
      }
}

function draw() {
    background(255);
    imageMode(CENTER);
    image(pick, (windowWidth/2), (windowHeight/2),532,98)
    for (let i = 0; i < number; i++) {
        balls[i].update();
      }
}

function mousePressed() {
    for (let i = 0; i < number; i++) {
        balls[i].clicked();
      }
}

class Ball {
    constructor(tempX, tempY, tempSpeedX, tempSpeedY, size, val) {
        this.x = tempX;
        this.y = tempY;
        this.speedX = tempSpeedX;
        this.speedY = tempSpeedY;
        this.size=size;
        this.alive = true;
        this.bx;
        this.by;
        this.number = val;
    }

    update() {
        if (this.alive == true) {
            this.draw();
            this.move();
            this.bounce();
            this.bx = this.x;
            this.by = this.y;
        }
        if (this.alive ==false){
           window.location="/bubble"; 
        }
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        // console.log(bubbleImg)
        image((this.number), this.x, this.y, this.size, this.size);
    }

    bounce() {
        if (this.x > width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > height || this.y < 0) {
            this.speedY = -this.speedY;
        }

    }

    clicked() {
        if (dist(mouseX, mouseY, this.x, this.y) < (this.size / 2)) {
            this.alive = false;  
        }
    }
}
