const transactions = require('./transaction')
const cryptoCompare = require('./cryptoCompare')
const yargs = require('yargs').argv

const token = yargs.token
const date = yargs.date
const timeStamp = new Date(date).getTime() / 1000

const displayToken = (tokenPrices) => {
  for (const [key, value] of Object.entries(tokenPrices)) {
    console.log(`${key}: ${value} USD`)
  }
}

transactions.calculateTokenAmount(date).then((amount) => {
  const tokenPrices = {}

  cryptoCompare.getCurrencyPrice(token, timeStamp).then((price) => {
    for (const [key, value] of Object.entries(price)) {
      tokenPrices[key] = amount[key] * value.USD
    }
    if (token) {
      console.log(`${token}: ${tokenPrices[token]} USD`)
    } else {
      displayToken(tokenPrices)
    }
  })
})
