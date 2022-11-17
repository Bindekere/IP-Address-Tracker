const ipInput = document.getElementById("ipInput")
const button = document.querySelector("button")
const display = document.querySelector("main")
const ipResultsArray = document.querySelectorAll(".actual")

console.log(ipResultsArray)


// ipInput.addEventListener("keypress",()=>{console.log("helo")})
ipInput.addEventListener("search",()=>{
    if(ipInput.value){
        console.log(ipInput.value)
        returnipResult(ipInput.value)
    }
    else{ipInput.placeholder = "Enter an IP Address"}
})

button.addEventListener("click",()=>{
    if(ipInput.value){
        console.log(ipInput.value)
        returnipResult(ipInput.value)
    }
    else{ipInput.placeholder = "Enter an IP Address"}
})


async function returnipResult(ipValue){
    const res = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_9SS2F8Zn6j2oi8sn1Cfw2okQmUWQu&ipAddress=${ipValue}`)
    const data = await res.json()

    //error handling uniquely!
    if(data.code){
        console.log(data.messages)
        display.innerHTML = `<div class="mx-auto"><h3>Error: ${data.code}</h3>
        <h4>Please ${data.messages}</h4><div>`
        ipInput.placeholder = "Please enter a valid IP Address"
    }
    else{
        console.log(data)
        ipResultsArray[0].textContent= data.ip
        ipResultsArray[1].textContent= `${data.location.country}, ${data.location.region}`
        ipResultsArray[2].textContent= `UTC ${data.location.timezone}`
        ipResultsArray[3].textContent= data.isp
    }
}

