const transactions = require('./transaction');
const cryptoCompare = require('./cryptoCompare');
const yargs = require('yargs').argv;

const token = yargs.token
const date = yargs.date
const epochDate = new Date(date).getTime() / 1000


const displayToken = (tokenPrices) => {
    // console.log(tokenPrices)
    for (const [key, value] of Object.entries(tokenPrices)) {
        console.log(`${key}: ${value} USD`);
      }
}

transactions.calculateTokenAmount(date).then((result) => {
    var tokenPrices = {}
    var amount = result
    //Given a date and a token, return the portfolio value of that token in USD on that date
    if (token && date){
        var amount;
        cryptoCompare.getDateUSDPrice(token, epochDate).then((response) =>{
            tokenPrices[token] = amount[token] * response[token].USD;  
            displayToken(tokenPrices);
        })

    } else if (token && date === undefined){
        cryptoCompare.getLatestUSDPrice().then((response) =>{
            tokenPrices[token] = amount[token] * response[token].USD;
            displayToken(tokenPrices);
        })
    } else if (token === undefined && date) {
        cryptoCompare.getDateUSDPrice(token, epochDate).then((response) =>{
            tokenPrices[token] = amount[token] * response[token].USD;
            displayToken(tokenPrices);
        })
    } else {
        cryptoCompare.getLatestUSDPrice().then((response) =>{
            tokenPrices['BTC'] = amount.BTC * response.BTC.USD
            tokenPrices['ETH'] = amount.ETH * response.ETH.USD
            tokenPrices['XRP'] = amount.XRP * response.XRP.USD
            displayToken(tokenPrices);
        })
    }
    
    
});

