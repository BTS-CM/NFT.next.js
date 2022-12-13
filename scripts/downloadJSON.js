const axios = require('axios');
const fs = require('fs');
const prompts = require('prompts');

const art = require('../config/art.json');

const productionServers = [
  'https://api.bitshares.ws/lookup/asset/',
  'https://api.bitshares.build/assets/',
];

const stagingServers = [
  'https://api.testnet.bitshares.ws/lookup/asset/',
];

(async () => {
  const promptRES = await prompts([
    {
      type: 'select',
      name: 'environment',
      message: 'Which environment do you want to use?',
      choices: [
        { title: 'Production', value: 'production' },
        { title: 'Staging', value: 'staging' },
      ],
    },
    {
      type: prev => prev === 'production' ? 'select' : null,
      name: 'server',
      message: 'Which elasticsearch do you want to use?',
      choices: productionServers.map(server => ({
        title: server,
        value: server,
      })),
    },
    {
      type: prev => prev === 'staging' ? 'select' : null,
      name: 'server',
      message: 'Which elasticsearch do you want to use?',
      choices: stagingServers.map(server => ({
        title: server,
        value: server,
      })),
    },
  ]);

  if (!promptRES || !promptRES.server) {
    console.log('Prompt select error');
    return;
  }

  const envArt = promptRES.environment === 'production'
    ? art.production
    : art.staging;

  for (let i = 0; i < envArt.length; i++) {
    const currentArt = envArt[i];
    const { name } = currentArt;
    const { id } = currentArt;

    let response;
    try {
      response = await axios.get(`${promptRES.server}${id}`);
    } catch (err) {
      console.error(err);
      return;
    }

    if (promptRES.server.includes('api.bitshares.build') && response.data.length) {
      response.data[0].options.description = JSON.parse(response.data[0].options.description);
    }

    delete response.data.options;

    fs.writeFile(`../components/assets/${name}.json`, JSON.stringify(response.data, null, 4), (err) => {
      if (err) console.log(err);
    });
  }
})();
