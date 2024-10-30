
let currencyCodes = ['all', 'afn', 'ars', 'awg', 'aud', 'azn', 'bsd', 'bbd', 'byn', 'bzd', 'bmd', 'bob', 'bam', 'bwp', 'bgn', 'brl', 'bnd', 'khr', 'cad', 'kyd', 'clp', 'cny', 'cop', 'crc', 'hrk', 'cup', 'czk', 'dkk', 'dop', 'xcd', 'egp', 'svc', 'eur', 'fkp', 'fjd', 'ghs', 'gip', 'gtq', 'ggp', 'gyd', 'hnl', 'hkd', 'huf', 'isk', 'inr', 'idr', 'irr', 'imp', 'ils', 'jmd', 'jpy', 'jep', 'kzt', 'kpw', 'krw', 'kgs', 'lak', 'lbp', 'lrd', 'mkd', 'myr', 'mur', 'mxn', 'mnt', 'mzn', 'nad', 'npr', 'ang', 'nzd', 'nio', 'ngn', 'nok', 'omr', 'pkr', 'pab', 'pyg', 'pen', 'php', 'pln', 'qar', 'ron', 'rub', 'shp', 'sar', 'rsd', 'scr', 'sgd', 'sbd', 'sos', 'zar', 'lkr', 'sek', 'chf', 'srd', 'syp', 'twd', 'thb', 'ttd', 'try', 'tvd', 'uah', 'gbp', 'usd', 'uyu', 'uzs', 'vef', 'vnd', 'yer', 'zwd']
const $ = require('jquery')(require('jsdom').jsdom().defaultView);



for (let i=0; i < currencyCodes.length; i++){

    currencyQueryURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"+currencyCodes[i]+".json"

    $.ajax({
        url: currencyQueryURL,
        method: "GET",
        success: function(data){
            console.log(`Success ${i}`)
        },
        error: function(error){
            console.log(`Error ${i}`)
        }
    })}//.then(
//         (response) => {
//             console.log(response)
//         }
//     )
// }