// REFERENCES:
// https://editor.p5js.org/aferriss/sketches/SJhoZHsqf
    
fetch ("/Secrets")
 .then (resp=>resp.json())
 .then (data=>{
    console.log(data);
    // let randomSecretIndex= Math.floor(Math.random()*data.data.length);
    // let showSecret = data.data[randomSecretIndex].secret;
    // // console.log(showSecret);
    // document.getElementById("secret-info").innerHTML="";
    // let elt= document.createElement("p");
    // elt.innerHTML=showSecret;
    // document.getElementById("secret-info").appendChild(elt);
});

let fontName = [
    "5yearsoldfont.ttf",
    "Airplanes in the Night Sky.ttf",
    "alphabetized cassette tapes.ttf",
    "Architex.ttf",
    "ashcanbb_reg.ttf",
    "attack of the cucumbers.ttf",
    "Blah blah bang.ttf",
    "Broetown Signature.ttf",
    "BrownBagLunch.ttf",
    "CATHSGBR.TTF",
    "DawningofaNewDay.ttf",
    "khand.ttf",
    "mayqueen.ttf",
    "Otto.ttf",
    "PermanentMarker.ttf",
    "Popsies.ttf",
    "Rudiment.ttf",
    "Southam Demo.otf",
    "Tafelschrift.ttf",
    "blzee.ttf",
]

function preload(){
    bubble1 = loadImage("assets/Bubble-01.png");
}

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("secret-space");
    noStroke();
}

function draw() {
 //  get data from db file
    background(255);
    imageMode(CENTER);
    image(bubble1, (windowWidth/2), (windowHeight/2), 1000,1000);
}
 
function mousePressed() {
    window.location = "/";
}



