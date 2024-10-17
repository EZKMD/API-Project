
let currencySigns = {
    "gbp":"£",
    "usd":"$",
    "aud":"$",
    "vnd":"₫"
}

//Interactables:

const dropdownSelection = document.getElementById("dropdown");

const calculateBtn = document.getElementById("calculate");

const amountField = document.getElementById("amount-input");

let outputField = document.getElementById("output");

let currencyToConvert;
let amountValue;

dropdownSelection.addEventListener("change", () => {
    currencyToConvert = dropdownSelection.value;
    console.log(currencyToConvert);
})

calculateBtn.addEventListener("click", () => {
    amountValue = parseInt(amountField.value);
     if (!isNaN(amountValue) && currencyToConvert != undefined){
        callAPI(amountValue, currencyToConvert)
    } else{
        window.alert("Error");
    } 
    
})


// Url form: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}

// Following is the latest exchange rates of the euro
currencyQueryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`;
// It returns a json of the equivalent of each currency for 1 Euro

let conversionRate;
let convertedAmount;

function callAPI(amountValue, currencyToConvert){
    $.ajax({
        url: currencyQueryURL,
        method: "GET"
    }).then(
        (response) => {

            //Checking types of variables
            conversionRate = response.eur[currencyToConvert];
            convertedAmount = (amountValue/conversionRate).toFixed(2);
            console.log("Converted: "+convertedAmount);
            outputField.textContent = `€${convertedAmount}`
            


            
        }
    )
}
