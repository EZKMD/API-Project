
let currencySigns = {
    "gbp":"£",
    "usd":"$",
    "aud":"$",
    "vnd":"₫"
}

//Interactables:

const currencyToConvertSelection = document.getElementById("currencyToConvert");

const currencyToConvertToSelection = document.getElementById("currencyToConvertTo")

const calculateBtn = document.getElementById("calculate");

const amountField = document.getElementById("amount-input");

let outputField = document.getElementById("output");

let amountValue;
let currencyToConvert;
let currencyToConvertTo;

currencyToConvertSelection.addEventListener("change", () => {
    currencyToConvert = currencyToConvertSelection.value;
})

currencyToConvertToSelection.addEventListener("change", () => {
    currencyToConvertTo = currencyToConvertToSelection.value;
})

calculateBtn.addEventListener("click", () => {
    amountValue = parseInt(amountField.value);
     if (!isNaN(amountValue) && currencyToConvert != undefined){
        callAPI(amountValue, currencyToConvert, currencyToConvertTo)
    } else{
        window.alert("Error");
    } 
    
})



// Url form: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}

// Following is the latest exchange rates of the euro

// It returns a json of the equivalent of each currency for 1 Euro

let conversionRate;
let convertedAmount;

function callAPI(amountValue, currencyToConvert, currencyToConvertTo){
    console.log(currencyToConvert)
    console.log(currencyToConvertTo)
    currencyQueryURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"+currencyToConvertTo+".json";
    $.ajax({
        url: currencyQueryURL,
        method: "GET"
    }).then(
        (response) => {

            //Checking types of variables
            conversionRate = response[currencyToConvertTo][currencyToConvert];
            convertedAmount = (amountValue/conversionRate).toFixed(2);
            console.log("Amount: "+amountValue)
            console.log("Conversion Rate: "+conversionRate)
            console.log("Converted: "+convertedAmount);
            outputField.textContent = `€${convertedAmount}`
            


            
        }
    )
}
