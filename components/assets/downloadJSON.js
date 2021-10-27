const axios = require('axios');
const fs = require('fs');
const art = require('../art.json');

let production_art = art.production;
let staging_art = art.staging;

(async () => {
  for (let i = 0; i < production_art.length; i++) {
    let currentArt = production_art[i];
    let name = currentArt.name;
    let id = currentArt.id;

    let response;
    try {
      response = await axios.get(`https://api.bitshares.ws/lookup/asset/${id}`);
    } catch (err) {
      console.error(err);
    }

    delete response.data["options"];

    fs.writeFile(`./${name}.json`, JSON.stringify(response.data, null, 4), (err) => {
       if (err) console.log(err);
    });
  }

  for (let i = 0; i < staging_art.length; i++) {
    let currentArt = staging_art[i];
    let name = currentArt.name;
    let id = currentArt.id;

    let response;
    try {
      response = await axios.get(`https://api.testnet.bitshares.ws/lookup/asset/${id}`);
    } catch (err) {
      console.error(err);
    }

    delete response.data["options"];

    fs.writeFile(`./${name}.json`, JSON.stringify(response.data, null, 4), (err) => {
       if (err) console.log(err);
    });
  }

})();
