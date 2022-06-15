require('dotenv').config();

const axios = require('axios');
const api_key = process.env.CRYPTO_COMPARE_API_TOKEN

const getLatestUSDPrice = async () => {
    var url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD&api_key=${api_key}`
    try {
        const {data:response} = await axios.get(url) //use data destructuring to get data from the promise object
        return response
    }
        catch (error) {
        console.log(error);
    }
}

const getDateUSDPrice = async (token, time_stamp) => {
    var url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${token}&tsyms=USD&ts=${time_stamp}&api_key=${api_key}`
    const response = await axios.get(url)
    return response.data
}   

module.exports = {
    getDateUSDPrice,
    getLatestUSDPrice
}