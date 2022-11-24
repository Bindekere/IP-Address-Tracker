const ipInput = document.getElementById("ipInput")
const button = document.querySelector("button")
const display = document.querySelector("main")
const ipResultsArray = document.querySelectorAll(".actual")
let map;
let marker;

async function getUserIP(){
    const res = await fetch(`https://api64.ipify.org?format=json`)
    const data = await res.json()
    ipInput.value = data.ip
    returnipResult(ipInput.value)
}

ipInput.addEventListener("search",()=>{
    if(ipInput.value){
        returnipResult(ipInput.value)
    }
    else{ipInput.placeholder = "Enter an IP Address"}
})

button.addEventListener("click",()=>{
    if(ipInput.value){
        returnipResult(ipInput.value)
    }
    else{ipInput.placeholder = "Enter an IP Address"}
})


async function returnipResult(ipValue){
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9SS2F8Zn6j2oi8sn1Cfw2okQmUWQu&ipAddress=${ipValue}`)
    const data = await res.json()

    //error handling uniquely!
    if(data.code){
        display.innerHTML = `<div class="mx-auto" style=
        "position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);">
        <h3>Error: ${data.code}</h3>
        <h4>Please ${data.messages}</h4><div>`
        ipInput.placeholder = "Please enter a valid IP Address"
    }
    else{
        updateMainDisplay(data)
        if(map){
            map = map.remove();
        }

        map = L.map('map').setView([`${data.location.lat}`, `${data.location.lng}`], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        marker = L.marker([`${data.location.lat}`, `${data.location.lng}`]).addTo(map);
    }
}
function updateMainDisplay(data){
    display.innerHTML = `<div id="map"></div>`
        ipResultsArray[0].textContent= data.ip
        ipResultsArray[1].textContent= `${data.location.country}, ${data.location.region}`
        ipResultsArray[2].textContent= `UTC ${data.location.timezone}`
        ipResultsArray[3].textContent= data.isp
}