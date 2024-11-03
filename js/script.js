

// Dictionary of all necessary currency codes to respective symbol

let currencySigns = {

    'all': 'Lek', 
    'afn': '؋', 
    'ars': '$', 
    'awg': 'ƒ', 
    'aud': '$', 
    'azn': '₼', 
    'bsd': '$', 
    'bbd': '$', 
    'byn': 'Br', 
    'bzd': 'BZ$',  
    'bmd': '$', 
    'bob': '$b', 
    'bam': 'KM', 
    'bwp': 'P', 
    'bgn': 'лв', 
    'brl': 'R$', 
    'bnd': '$', 
    'khr': '៛', 
    'cad': '$', 
    'kyd': '$', 
    'clp': '$', 
    'cny': '¥', 
    'cop': '$', 
    'crc': '₡', 
    'hrk': 'kn', 
    'cup': '₱', 
    'czk': 'Kč', 
    'dkk': 'kr', 
    'dop': 'RD$',
    'xcd': '$', 'egp': '£', 'svc': '$', 'eur': '€', 'fkp': '£', 'fjd': '$', 'ghs': '¢', 'gip': '£', 'gtq': 'Q', 'ggp': '£', 'gyd': '$', 'hnl': 'L', 'hkd': '$', 'huf': 'Ft', 'isk': 'kr', 'inr': '₹', 'idr': 'Rp', 'irr': '﷼', 'imp': '£', 'ils': '₪', 'jmd': 'J$', 'jpy': '¥', 'jep': '£', 'kzt': 'лв', 'kpw': '₩', 'krw': '₩', 'kgs': 'лв', 'lak': '₭', 'lbp': '£', 'lrd': '$', 'mkd': 'ден', 'myr': 'RM', 'mur': '₨', 'mxn': '$', 'mnt': '₮', 'mzn': 'MT', 'nad': '$', 'npr': '₨', 'ang': 'ƒ', 'nzd': '$', 'nio': 'C$', 'ngn': '₦', 'nok': 'kr', 'omr': '﷼', 'pkr': '₨', 'pab': 'B/.', 'pyg': 'Gs', 'pen': 'S/.', 'php': '₱', 'pln': 'zł', 'qar': '﷼', 'ron': 'lei', 'rub': '₽', 'shp': '£', 'sar': '﷼', 'rsd': 'Дин.', 'scr': '₨', 'sgd': '$', 'sbd': '$', 'sos': 'S', 'zar': 'R', 'lkr': '₨', 'sek': 'kr', 'chf': 'CHF', 'srd': '$', 'syp': '£', 'twd': 'NT$', 'thb': '฿', 'ttd': 'TT$', 'try': '₺', 'tvd': '$', 'uah': '₴', 'gbp': '£', 'usd': '$', 'uyu': '$U', 'uzs': 'лв', 'vef': 'Bs', 'vnd': '₫', 'yer': '﷼', 'zwd': 'Z$'}



// Buttons, text areas and input fields:
const currencyToConvertSelection = document.getElementById("currencyToConvert");

const currencyToConvertToSelection = document.getElementById("currencyToConvertTo");

const calculateBtn = document.getElementById("calculate");

let currencySignField = document.getElementById("symbol-infront");

const amountField = document.getElementById("amount-input");

let outputField = document.getElementById("output");

const swapBtn = document.getElementById("swap");


// Global variables:
let amountValue;
let currencyToConvert;
let currencyToConvertTo;


// Boolean that allows love conversion
let field1Changed = false;
let field2Changed = false;


// Funciton that is called whenever a field has a valid value, tries to convert
tryConvert = function() {

    // Checks if the other field has also recieved a value
    if (field1Changed && field2Changed) {
        
        // Takes input amount
        amountValue = parseFloat(amountField.value);

        // Checks that the input number is an actual valid value
        if (!isNaN(amountValue) && currencyToConvert != "invalid" && currencyToConvertTo != "invalid"){
            callAPI(amountValue, currencyToConvert, currencyToConvertTo);
        } else{
            //pass
        } 
        
    } else{
        //pass
    }
}

// Listens for a change in the first currency field
currencyToConvertSelection.addEventListener("change", () => {
    // Takes value of the dropdown selection
    currencyToConvert = currencyToConvertSelection.value;
    //Adds a symbol next to the amount input box
    currencySignField.textContent = currencySigns[currencyToConvert]
    // Tries to convert if the field is valid
    if (currencyToConvert !== "invalid"){
        field1Changed = true;
        tryConvert()
    } else{
        // Ensure that no output will occur when the program isnt ready
        outputField.textContent = "";
    }

})


// Same as above but for the second currency field 
currencyToConvertToSelection.addEventListener("change", () => {
    currencyToConvertTo = currencyToConvertToSelection.value;

    if (currencyToConvertTo !== "invalid"){

        field2Changed = true;
        tryConvert();

    }else{
        outputField.textContent = "";
    }
})

// Code for the swap button that changes the actual value of the dropdowns
swapBtn.addEventListener("click", () =>{
    temp = currencyToConvertSelection.value;
    currencyToConvertSelection.value = currencyToConvertToSelection.value;
    currencyToConvertToSelection.value = temp;
    currencySignField.textContent = currencySigns[currencyToConvertSelection.value];
    currencyToConvert = currencyToConvertSelection.value;
    currencyToConvertTo = currencyToConvertToSelection.value;
    tryConvert();

})

// Listens for an amount to be entered and tries to do a live conversion is value is valid
amountField.addEventListener("input", () => {
    amountValue = parseFloat(amountField.value);
    if (!isNaN(amountValue) && currencyToConvert != undefined && currencyToConvertTo != undefined){
        callAPI(amountValue, currencyToConvert, currencyToConvertTo);
    } else{
        //pass window.alert("Error");
        outputField.textContent = "";
    } 
    
})



calculateBtn.addEventListener("click", () => {
    amountValue = parseFloat(amountField.value);
     if (!isNaN(amountValue) && currencyToConvert != undefined && currencyToConvertTo != undefined){
        callAPI(amountValue, currencyToConvert, currencyToConvertTo);
    } else{
        window.alert("Error");
    } 
    
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        amountValue = parseFloat(amountField.value);
        if (!isNaN(amountValue) && currencyToConvert != undefined && currencyToConvertTo != undefined){
            callAPI(amountValue, currencyToConvert, currencyToConvertTo);
        } else{
            window.alert("Error");
        } 
    }
    
})


// Url form: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}

// It returns a json of the equivalent of each currency for 1 of the url-specified currency


// Variables for API calling
let conversionRate;
let convertedAmount;


// Actual calling of API
function callAPI(amountValue, currencyToConvert, currencyToConvertTo){

    // URL for API query
    currencyQueryURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"+currencyToConvert+".json";

    // Using jQuery and an ajax call to get a response from the API
    $.ajax({
        url: currencyQueryURL,
        method: "GET"
    }).then(
        (response) => {

            // Finding the relevant rate
            conversionRate = response[currencyToConvert][currencyToConvertTo];
            // Calculating converted amount
            convertedAmount = (amountValue*conversionRate).toFixed(2);
            // Outputting the value in text content
            outputField.textContent = `${currencySigns[currencyToConvertTo]}${convertedAmount}`;
            


            
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
  tryConvert()
}


// Code for filling html selection fields:

// Dictionary referred to for the selection field to have correct values
let currencyKey = [

    {'name': '--Select--', 'code':'invalid', 'symbol':'invalid'},
    {'name': 'Albania Lek', 'code': 'all', 'symbol': 'Lek'}, 
    {'name': 'Afghanistan Afghani', 'code': 'afn', 'symbol': '؋'}, 
    {'name': 'Argentina Peso', 'code': 'ars', 'symbol': '$'}, 
    {'name': 'Aruba Guilder', 'code': 'awg', 'symbol': 'ƒ'}, 
    {'name': 'Australia Dollar', 'code': 'aud', 'symbol': '$'}, 
    {'name': 'Azerbaijan Manat', 'code': 'azn', 'symbol': '₼'}, 
    {'name': 'Bahamas Dollar', 'code': 'bsd', 'symbol': '$'}, 
    {'name': 'Barbados Dollar', 'code': 'bbd', 'symbol': '$'}, 
    {'name': 'Belarus Ruble', 'code': 'byn', 'symbol': 'Br'}, 
    {'name': 'Belize Dollar', 'code': 'bzd', 'symbol': 'BZ$'}, 
    {'name': 'Bermuda Dollar', 'code': 'bmd', 'symbol': '$'}, 
    {'name': 'Bolivia Bolíviano', 'code': 'bob', 'symbol': '$b'}, 
    {'name': 'Bosnia and Herzegovina Convertible Mark', 'code': 'bam', 'symbol': 'KM'}, 
    {'name': 'Botswana Pula', 'code': 'bwp', 'symbol': 'P'}, 
    {'name': 'Bulgaria Lev', 'code': 'bgn', 'symbol': 'лв'},
    {'name': 'Brazil Real', 'code': 'brl', 'symbol': 'R$'}, 
    {'name': 'Brunei Darussalam Dollar', 'code': 'bnd', 'symbol': '$'}, 
    {'name': 'Cambodia Riel', 'code': 'khr', 'symbol': '៛'}, 
    {'name': 'Canada Dollar', 'code': 'cad', 'symbol': '$'}, 
    {'name': 'Cayman Islands Dollar', 'code': 'kyd', 'symbol': '$'}, 
    {'name': 'Chile Peso', 'code': 'clp', 'symbol': '$'}, 
    {'name': 'China Yuan Renminbi', 'code': 'cny', 'symbol': '¥'}, 
    {'name': 'Colombia Peso', 'code': 'cop', 'symbol': '$'}, 
    {'name': 'Costa Rica Colon', 'code': 'crc', 'symbol': '₡'}, 
    {'name': 'Croatia Kuna', 'code': 'hrk', 'symbol': 'kn'}, 
    {'name': 'Cuba Peso', 'code': 'cup', 'symbol': '₱'}, 
    {'name': 'Czech Republic Koruna', 'code': 'czk', 'symbol': 'Kč'}, 
    {'name': 'Denmark Krone', 'code': 'dkk', 'symbol': 'kr'}, 
    {'name': 'Dominican Republic Peso', 'code': 'dop', 'symbol': 'RD$'}, 
    {'name': 'East Caribbean Dollar', 'code': 'xcd', 'symbol': '$'}, 
    {'name': 'Egypt Pound', 'code': 'egp', 'symbol': '£'}, 
    {'name': 'El Salvador Colon', 'code': 'svc', 'symbol': '$'}, 
    {'name': 'Euro Member Countries', 'code': 'eur', 'symbol': '€'}, 
    {'name': 'Falkland Islands (Malvinas) Pound', 'code': 'fkp', 'symbol': '£'}, 
    {'name': 'Fiji Dollar', 'code': 'fjd', 'symbol': '$'}, 
    {'name': 'Ghana Cedi', 'code': 'ghs', 'symbol': '¢'}, 
    {'name': 'Gibraltar Pound', 'code': 'gip', 'symbol': '£'}, 
    {'name': 'Guatemala Quetzal', 'code': 'gtq', 'symbol': 'Q'}, 
    {'name': 'Guernsey Pound', 'code': 'ggp', 'symbol': '£'}, 
    {'name': 'Guyana Dollar', 'code': 'gyd', 'symbol': '$'}, 
    {'name': 'Honduras Lempira', 'code': 'hnl', 'symbol': 'L'}, 
    {'name': 'Hong Kong Dollar', 'code': 'hkd', 'symbol': '$'}, 
    {'name': 'Hungary Forint', 'code': 'huf', 'symbol': 'Ft'}, 
    {'name': 'Iceland Krona', 'code': 'isk', 'symbol': 'kr'}, 
    {'name': 'India Rupee', 'code': 'inr', 'symbol': '₹'}, 
    {'name': 'Indonesia Rupiah', 'code': 'idr', 'symbol': 'Rp'}, 
    {'name': 'Iran Rial', 'code': 'irr', 'symbol': '﷼'}, 
    {'name': 'Isle of Man Pound', 'code': 'imp', 'symbol': '£'}, 
    {'name': 'Israel Shekel', 'code': 'ils', 'symbol': '₪'}, 
    {'name': 'Jamaica Dollar', 'code': 'jmd', 'symbol': 'J$'}, 
    {'name': 'Japan Yen', 'code': 'jpy', 'symbol': '¥'}, 
    {'name': 'Jersey Pound', 'code': 'jep', 'symbol': '£'}, 
    {'name': 'Kazakhstan Tenge', 'code': 'kzt', 'symbol': 'лв'}, 
    {'name': 'Korea (North) Won', 'code': 'kpw', 'symbol': '₩'}, 
    {'name': 'Korea (South) Won', 'code': 'krw', 'symbol': '₩'}, 
    {'name': 'Kyrgyzstan Som', 'code': 'kgs', 'symbol': 'лв'}, 
    {'name': 'Laos Kip', 'code': 'lak', 'symbol': '₭'}, 
    {'name': 'Lebanon Pound', 'code': 'lbp', 'symbol': '£'}, 
    {'name': 'Liberia Dollar', 'code': 'lrd', 'symbol': '$'}, 
    {'name': 'Macedonia Denar', 'code': 'mkd', 'symbol': 'ден'}, 
    {'name': 'Malaysia Ringgit', 'code': 'myr', 'symbol': 'RM'}, 
    {'name': 'Mauritius Rupee', 'code': 'mur', 'symbol': '₨'}, 
    {'name': 'Mexico Peso', 'code': 'mxn', 'symbol': '$'}, 
    {'name': 'Mongolia Tughrik', 'code': 'mnt', 'symbol': '₮'}, 
    {'name': 'Mozambique Metical', 'code': 'mzn', 'symbol': 'MT'}, 
    {'name': 'Namibia Dollar', 'code': 'nad', 'symbol': '$'}, 
    {'name': 'Nepal Rupee', 'code': 'npr', 'symbol': '₨'}, 
    {'name': 'Netherlands Antilles Guilder', 'code': 'ang', 'symbol': 'ƒ'}, 
    {'name': 'New Zealand Dollar', 'code': 'nzd', 'symbol': '$'}, 
    {'name': 'Nicaragua Cordoba', 'code': 'nio', 'symbol': 'C$'}, 
    {'name': 'Nigeria Naira', 'code': 'ngn', 'symbol': '₦'}, 
    {'name': 'Norway Krone', 'code': 'nok', 'symbol': 'kr'}, 
    {'name': 'Oman Rial', 'code': 'omr', 'symbol': '﷼'}, 
    {'name': 'Pakistan Rupee', 'code': 'pkr', 'symbol': '₨'}, 
    {'name': 'Panama Balboa', 'code': 'pab', 'symbol': 'B/.'}, 
    {'name': 'Paraguay Guarani', 'code': 'pyg', 'symbol': 'Gs'}, 
    {'name': 'Peru Sol', 'code': 'pen', 'symbol': 'S/.'}, 
    {'name': 'Philippines Peso', 'code': 'php', 'symbol': '₱'}, 
    {'name': 'Poland Zloty', 'code': 'pln', 'symbol': 'zł'}, 
    {'name': 'Qatar Riyal', 'code': 'qar', 'symbol': '﷼'}, 
    {'name': 'Romania Leu', 'code': 'ron', 'symbol': 'lei'}, 
    {'name': 'Russia Ruble', 'code': 'rub', 'symbol': '₽'}, 
    {'name': 'Saint Helena Pound', 'code': 'shp', 'symbol': '£'}, 
    {'name': 'Saudi Arabia Riyal', 'code': 'sar', 'symbol': '﷼'}, 
    {'name': 'Serbia Dinar', 'code': 'rsd', 'symbol': 'Дин.'}, 
    {'name': 'Seychelles Rupee', 'code': 'scr', 'symbol': '₨'}, 
    {'name': 'Singapore Dollar', 'code': 'sgd', 'symbol': '$'}, 
    {'name': 'Solomon Islands Dollar', 'code': 'sbd', 'symbol': '$'}, 
    {'name': 'Somalia Shilling', 'code': 'sos', 'symbol': 'S'}, 
    {'name': 'South Africa Rand', 'code': 'zar', 'symbol': 'R'}, 
    {'name': 'Sri Lanka Rupee', 'code': 'lkr', 'symbol': '₨'}, 
    {'name': 'Sweden Krona', 'code': 'sek', 'symbol': 'kr'}, 
    {'name': 'Switzerland Franc', 'code': 'chf', 'symbol': '₣'}, 
    {'name': 'Suriname Dollar', 'code': 'srd', 'symbol': '$'}, 
    {'name': 'Syria Pound', 'code': 'syp', 'symbol': '£'}, 
    {'name': 'Taiwan New Dollar', 'code': 'twd', 'symbol': 'NT$'}, 
    {'name': 'Thailand Baht', 'code': 'thb', 'symbol': '฿'}, 
    {'name': 'Trinidad and Tobago Dollar', 'code': 'ttd', 'symbol': 'TT$'}, 
    {'name': 'Turkey Lira', 'code': 'try', 'symbol': '₺'}, 
    {'name': 'Tuvalu Dollar', 'code': 'tvd', 'symbol': '$'}, 
    {'name': 'Ukraine Hryvnia', 'code': 'uah', 'symbol': '₴'}, 
    {'name': 'United Kingdom Pound', 'code': 'gbp', 'symbol': '£'}, 
    {'name': 'United States Dollar', 'code': 'usd', 'symbol': '$'}, 
    {'name': 'Uruguay Peso', 'code': 'uyu', 'symbol': '$U'}, 
    {'name': 'Uzbekistan Som', 'code': 'uzs', 'symbol': 'лв'}, 
    {'name': 'Venezuela Bolívar', 'code': 'vef', 'symbol': 'Bs'}, 
    {'name': 'Viet Nam Dong', 'code': 'vnd', 'symbol': '₫'}, 
    {'name': 'Yemen Rial', 'code': 'yer', 'symbol': '﷼'}, 
    {'name': 'Zimbabwe Dollar', 'code': 'zwd', 'symbol': 'Z$'}

]

// jQuery to append selection values to the dropdown element
$(document).ready(function (){
    for (let i=0; i < currencyKey.length; i++){
        $("#currencyToConvert").append(`<option value=${currencyKey[i]["code"]}>${currencyKey[i]["name"]}</option>`); 
        $("#currencyToConvertTo").append(`<option value=${currencyKey[i]["code"]}>${currencyKey[i]["name"]}</option>`);

    }
})

// Below checks if dropdown values are actually in API:

// Proof of a verification method for the retrieved codes and if the API would retreive them

// let currencyCodes = ['all', 'afn', 'ars', 'awg', 'aud', 'azn', 'bsd', 'bbd', 'byn', 'bzd', 'bmd', 'bob', 'bam', 'bwp', 'bgn', 'brl', 'bnd', 'khr', 'cad', 'kyd', 'clp', 'cny', 'cop', 'crc', 'hrk', 'cup', 'czk', 'dkk', 'dop', 'xcd', 'egp', 'svc', 'eur', 'fkp', 'fjd', 'ghs', 'gip', 'gtq', 'ggp', 'gyd', 'hnl', 'hkd', 'huf', 'isk', 'inr', 'idr', 'irr', 'imp', 'ils', 'jmd', 'jpy', 'jep', 'kzt', 'kpw', 'krw', 'kgs', 'lak', 'lbp', 'lrd', 'mkd', 'myr', 'mur', 'mxn', 'mnt', 'mzn', 'nad', 'npr', 'ang', 'nzd', 'nio', 'ngn', 'nok', 'omr', 'pkr', 'pab', 'pyg', 'pen', 'php', 'pln', 'qar', 'ron', 'rub', 'shp', 'sar', 'rsd', 'scr', 'sgd', 'sbd', 'sos', 'zar', 'lkr', 'sek', 'chf', 'srd', 'syp', 'twd', 'thb', 'ttd', 'try', 'tvd', 'uah', 'gbp', 'usd', 'uyu', 'uzs', 'vef', 'vnd', 'yer', 'zwd']

// for (let i=0; i < currencyCodes.length; i++){

//     currencyQueryURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"+currencyCodes[i]+".json"

//     $.ajax({
//         url: currencyQueryURL,
//         method: "GET",
//         success: function(data){
//             console.log(`Success ${i}`)
//         },
//         error: function(error){
//             console.log(`Error ${i}`)
//         }
//     })}
