// REFERENCES:
// https://editor.p5js.org/aferriss/sketches/SJhoZHsqf
    
fetch ("/getSecrets")
 .then (resp=>resp.json())
 .then (data=>{
    let randomSecretIndex= Math.floor(Math.random()*data.data.length);
    let showSecret = data.data[randomSecretIndex].secret;
    console.log(showSecret);
    document.getElementById("secret-info").innerHTML="";
    let elt= document.createElement("p");
    elt.innerHTML=showSecret;
    document.getElementById("secret-info").appendChild(elt);
});

let fontSrc = [
   "assets/5yearsoldfont.ttf",
    "assets/Airplanes in the Night Sky.ttf",
    "assets/alphabetized cassette tapes.ttf",
    "assets/Architex.ttf",
    "assets/ashcanbb_reg.ttf",
    "assets/attack of the cucumbers.ttf",
    "assets/Blah blah bang.ttf",
    "assets/Broetown Signature.ttf",
    "assets/BrownBagLunch.ttf",
    "assets/CATHSGBR.TTF",
    "assets/DawningofaNewDay.ttf",
    "assets/khand.ttf",
    "assets/mayqueen.ttf",
    "assets/Otto.ttf",
    "assets/PermanentMarker.ttf",
    "assets/Popsies.ttf",
    "assets/Rudiment.ttf",
    "assets/Southam Demo.otf",
    "assets/Tafelschrift.ttf",
    "assets/blzee.ttf",
]

let number;
number=getRndFont(1,fontSrc.length);
console.log("Font"+[number]);
document.getElementById("secret-info").style.fontFamily="Font"+[number];

function getRndFont(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }