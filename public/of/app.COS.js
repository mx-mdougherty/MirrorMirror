// TO DO
// Cannot press submit unless user inputs info

function getRandomIntInclusive(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)+min);
}
let bubbleNumber = getRandomIntInclusive(1,8);
let fontSelect = getRandomIntInclusive(0,19);

window.addEventListener("load",()=>{
    document.getElementById("button-log").addEventListener("click",()=>{
        let newSecret = document.getElementById("secret").value;
        // console.log(newSecret);
        // create object
        let obj= {
            "text": newSecret,
            "font": fontSelect,
            "bubble": bubbleNumber,
            };
        console.log(obj);
        // stringify the object
        let jsonData=JSON.stringify(obj);

        // make a fetch req of type POST
        fetch("/Secrets", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData,
        })
        .then(response => response.json())
        .then (data => {console.log(data)})

        // send user to new page
        window.location = "/secrets";    
    })
})


