const axios = require('axios');
const Crypto = require('../Model/Crypto');

const fetchDataAndStoreInDB = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;

    Object.keys(tickers).slice(0, 10).forEach(async (symbol) => {
      const data = tickers[symbol];
      
      await Crypto.create({
        name: data.name,
        last: data.last,
        buy: data.buy,
        sell: data.sell,
        volume: data.volume,
        base_unit: data.base_unit,
      });
    });

    console.log('Data fetched and stored in the database');
  } catch (error) {
    console.error('Error fetching data from WazirX API:', error.message);
  }
};

module.exports = {
  fetchDataAndStoreInDB,
};
