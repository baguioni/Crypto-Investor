require('dotenv').config()

const axios = require('axios')
const apiKey = process.env.CRYPTO_COMPARE_API_TOKEN
const BASE_URL = 'https://min-api.cryptocompare.com/data'
const TOKENS = ['BTC', 'ETH', 'XRP']
const CURRENCY = 'USD'

/*
    Returns price of a cryptocurrency from https://www.cryptocompare.com/
    token * time_stamp are optional parameters
*/
const getCurrencyPrice = async (token, timeStamp) => {
  // Gets price of a token from a specific date
  const requestType = timeStamp? 'pricehistorical': 'pricemulti'

  const url = `${BASE_URL}/${requestType}?`
  const params = new URLSearchParams({
    fsyms: TOKENS,
    fsym: token,
    tsyms: CURRENCY,
    ts: timeStamp,
    api_key: apiKey
  })

  try {
    const { data: response } = await axios.get(url, { params }) // use data destructuring to get data from the promise object
    return response
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCurrencyPrice
}
