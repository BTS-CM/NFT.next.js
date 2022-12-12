const axios = require('axios');
const fs = require('fs');
const art = require('../config/art.json');

const production_art = art.production;
const staging_art = art.staging;

(async () => {
  for (let i = 0; i < production_art.length; i++) {
    const currentArt = production_art[i];
    const { name } = currentArt;
    const { id } = currentArt;

    let response;
    try {
      response = await axios.get(`https://api.bitshares.ws/lookup/asset/${id}`);
    } catch (err) {
      console.error(err);
    }

    delete response.data.options;

    fs.writeFile(`../components/assets/${name}.json`, JSON.stringify(response.data, null, 4), (err) => {
      if (err) console.log(err);
    });
  }

  for (let i = 0; i < staging_art.length; i++) {
    const currentArt = staging_art[i];
    const { name } = currentArt;
    const { id } = currentArt;

    let response;
    try {
      response = await axios.get(`https://api.testnet.bitshares.ws/lookup/asset/${id}`);
    } catch (err) {
      console.error(err);
    }

    delete response.data.options;

    fs.writeFile(`../components/assets/${name}.json`, JSON.stringify(response.data, null, 4), (err) => {
      if (err) console.log(err);
    });
  }
})();
