

// Url form: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}

// Following is the latest exchange rates of the euro
currencyQueryURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
// It returns a json of the equivalent of each currency for 1 Euro


$.ajax({
    url: currencyQueryURL,
    method: "GET"
}).then(
    (response) => {
        console.log(response)
    }
)

