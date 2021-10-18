const axios = require('axios');
const fs = require('fs');
const art = require('../art.json');

let production_art = art.production;

(async () => {
  for (let i = 0; i < production_art.length; i++) {
    let currentArt = production_art[i];
    let name = currentArt.name;

    let response;
    try {
      response = await axios.get(`https://api.bitshares.ws/lookup/asset/${name}`);
    } catch (err) {
      console.error(err);
    }

    delete response.data["options"];

    fs.writeFile(`./${name}.json`, JSON.stringify(response.data, null, 4), (err) => {
       if (err) console.log(err);
    });
  }

})();
