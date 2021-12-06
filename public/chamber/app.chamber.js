// REFERENCES:
// https://p5js.org/examples/motion-bouncy-bubbles.html
// https://editor.p5js.org/aferriss/sketches/SJhoZHsqf

let bYes;
let bNo;
let names = [
    "YES",
    "NO",
]
        

function preload(){
    bubble = loadImage("assets/BubbleForm-01.png");
    myFont = loadFont("assets/FingerPaint-Regular.ttf");
}

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("bubble_ask");
    bYes = new Ball(
        (random(width)), 
        (random(height)), 
        1, 
        3, 
        names[0],
    );
    bNo = new Ball(
        (random(width)), 
        (random(height)), 
        2, 
        1.5, 
        names[1],
    );
}

function draw() {
    background(bubble);
    bYes.update();
    bYes.collide(bNo);
    bNo.update();
    bNo.collide(bYes);
}

function mousePressed() {
    bYes.clicked()
    bNo.clicked()
}

class Ball {
    constructor(tempX, tempY, tempSpeedX, tempSpeedY, name) {
        this.x = tempX;
        this.y = tempY;
        this.speedX = tempSpeedX;
        this.speedY = tempSpeedY;
        this.size = 200;
        this.alive = true;
        this.bx;
        this.by;
        this.name = name;
    }

    update() {
        if (this.alive == true) {
            this.show();
            this.move();
            this.bounce();
            this.bx = this.x;
            this.by = this.y;
        }
        if (bYes.alive ==false){
            window.location = "/of";
        }
        if (bNo.alive ==false){
            window.location = "/";
        }
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    show() {
        noStroke();
        fill(168, 190, 192, 204);
        ellipse(this.x, this.y, this.size, this.size);
        fill("black");
        textFont(myFont);
        textSize(80);
        textAlign(CENTER);
        text(this.name, (this.x), (this.y+30));
    }

    bounce() {
        if (this.x > width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > height || this.y < 0) {
            this.speedY = -this.speedY;
        }

    }

    collide(enemy) {
        if (dist(this.x, this.y, enemy.x, enemy.y) < (this.size-50)) {
            this.speedX = -this.speedX;
            this.speedY = -this.speedY;
        }

    }

    clicked() {
        if (dist(mouseX, mouseY, this.x, this.y) < (this.size / 2)) {
            this.alive = false;
        }
    }
}
