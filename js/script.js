

// Need to add the rest of the currency symbols
let currencySigns = {
    "gbp":"£",
    "usd":"$",
    "aud":"$",
    "vnd":"₫",
    "eur":"€",
    "inr":"₹",
    "aed":"د.إ"
}

//Interactables:

const currencyToConvertSelection = document.getElementById("currencyToConvert");

const currencyToConvertToSelection = document.getElementById("currencyToConvertTo")

const calculateBtn = document.getElementById("calculate");

let currencySignField = document.getElementById("symbol-infront");

const amountField = document.getElementById("amount-input");

let outputField = document.getElementById("output");

const swapBtn = document.getElementById("swap");

let amountValue;
let currencyToConvert;
let currencyToConvertTo;

currencyToConvertSelection.addEventListener("change", () => {
    currencyToConvert = currencyToConvertSelection.value;
    currencySignField.textContent = currencySigns[currencyToConvert];
})

currencyToConvertToSelection.addEventListener("change", () => {
    currencyToConvertTo = currencyToConvertToSelection.value;
})

swapBtn.addEventListener("click", () =>{
    temp = currencyToConvertSelection.value;
    currencyToConvertSelection.value = currencyToConvertToSelection.value;
    currencyToConvertToSelection.value = temp;
    currencySignField.textContent = currencySigns[currencyToConvertSelection.value];
    currencyToConvert = currencyToConvertSelection.value;
    currencyToConvertTo = currencyToConvertToSelection.value;

})

calculateBtn.addEventListener("click", () => {
    amountValue = parseInt(amountField.value);
     if (!isNaN(amountValue) && currencyToConvert != undefined && currencyToConvertTo != undefined){
        callAPI(amountValue, currencyToConvert, currencyToConvertTo)
    } else{
        window.alert("Error");
    } 
    
})



// Url form: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}

// It returns a json of the equivalent of each currency for 1 of the url-specified currency

let conversionRate;
let convertedAmount;

function callAPI(amountValue, currencyToConvert, currencyToConvertTo){

    currencyQueryURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"+currencyToConvertTo+".json";

    $.ajax({
        url: currencyQueryURL,
        method: "GET"
    }).then(
        (response) => {

            // Finding the relevant rate
            conversionRate = response[currencyToConvertTo][currencyToConvert];
            // Calculating converted amount
            convertedAmount = (amountValue/conversionRate).toFixed(2);
            // Outputting the value in text content
            outputField.textContent = `${currencySigns[currencyToConvertTo]}${convertedAmount}`
            


            
        }
    )
}

// Range slider code

let slider = document.getElementById("myRange");
let output = document.getElementById("amount-input");
output.value = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.value = this.value;
}
