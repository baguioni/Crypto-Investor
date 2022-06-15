const api_key = "c242cd5cac2466c97c279c6d3c6dbf997cd4ebb0de434b8c45de57e702a85a24"
const axios = require('axios');

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