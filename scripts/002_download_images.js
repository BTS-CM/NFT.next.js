const fs = require('fs');
const axios = require('axios');
const sharp = require('sharp');
const art = require('../config/art.json');

const prodArt = art.production;
const stagingArt = art.staging;
// eslint-disable-next-line import/no-dynamic-require, global-require
const assets = prodArt.map(asset => require(`../components/assets/${asset.name}.json`));

(async () => {
  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    const name = asset.symbol;
    console.log(`downloading: ${name}`);

    const description = asset && asset.description ? asset.description : undefined;
    const nft_object = description ? description.nft_object : undefined;

    if (!fs.existsSync(`./public/images/${name}`)) {
      // eslint-disable-next-line consistent-return
      fs.mkdir(`./public/images/${name}`, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Directory created successfully!');
      });
    }

    let url;
    if (nft_object && (nft_object.media_png_multihashes || nft_object.media_PNG_multihashes)) {
      const theseMultihashes = nft_object.media_png_multihashes
        ? nft_object.media_png_multihashes
        : nft_object.media_PNG_multihashes;

      for (let k = 0; k < theseMultihashes.length; k++) {
        if (!fs.existsSync(`./public/images/${name}/${k}.webp`)) {
          const currentURL = theseMultihashes[k].url;

          await axios({
            method: 'get',
            url: `https://gateway.ipfs.io${currentURL}`,
            responseType: 'stream',
          }).then((response) => {
            response.data.pipe(fs.createWriteStream(`./public/images/${name}/${k}.png`));
          });
        }
      }
    } else if (
      nft_object && (nft_object.media_webp_multihashes || nft_object.media_WEBP_multihashes)
    ) {
      const theseMultihashes = nft_object.media_webp_multihashes
        ? nft_object.media_webp_multihashes
        : nft_object.media_WEBP_multihashes;

      for (let k = 0; k < theseMultihashes.length; k++) {
        if (!fs.existsSync(`./public/images/${name}/${k}.webp`)) {
          const currentURL = theseMultihashes[k].url;

          await axios({
            method: 'get',
            url: `https://gateway.ipfs.io${currentURL}`,
            responseType: 'stream',
          }).then((response) => {
            response.data.pipe(fs.createWriteStream(`./public/images/${name}/${k}.webp`));
          });
        }
      }
    } else if (nft_object && nft_object.media_PNG_multihash) {
      if (!fs.existsSync(`./public/images/${name}/0.webp`)) {
        const currentURL = nft_object.media_PNG_multihash;

        await axios({
          method: 'get',
          url: `https://gateway.ipfs.io${currentURL}`,
          responseType: 'stream',
        }).then((response) => {
          response.data.pipe(fs.createWriteStream(`./public/images/${name}/0.png`));
        });
      }
    } else if (nft_object && nft_object.media_json) {
      const data = { media_json: nft_object.media_json };
      const fileName = `./public/images/${name}/media_json.json`;

      if (data && fileName && !fs.existsSync(`./public/images/${name}/media_json.json`)) {
        fs.writeFile(fileName, JSON.stringify(data), (err) => {
          console.log(err || '');
        });
      }
    } else if (nft_object) {
      let image;
      let fileName;
      if (nft_object.media_png || nft_object.image_png) {
        image = nft_object.media_png || nft_object.image_png || undefined;
        fileName = `./public/images/${name}/0.png`;
      } else if (
        nft_object.media_gif ||
          nft_object.media_GIF ||
          nft_object.image_GIF ||
          nft_object.image_gif ||
          nft_object.media_gif_multihash
      ) {
        image = nft_object.media_gif ||
                nft_object.media_GIF ||
                nft_object.image_GIF ||
                nft_object.image_gif ||
                `https://cloudflare-ipfs.com${nft_object.media_gif_multihash}` ||
                undefined;
        fileName = `./public/images/${name}/0.gif`;
      } else if (
        nft_object.media_jpeg ||
        nft_object.image_jpeg ||
        nft_object.media_jpeg_multihash
      ) {
        image = nft_object.media_jpeg ||
                nft_object.image_jpeg ||
                `https://cloudflare-ipfs.com${nft_object.media_jpeg_multihash}` ||
                undefined;
        fileName = `./public/images/${name}/0.jpeg`;
      }

      if (image && fileName && !fs.existsSync(`./public/images/${name}/0.webp`)) {
        fs.writeFile(fileName, image, { encoding: 'base64' }, (err) => {
          console.log(err || '');
        });
      }
    }
  }
})();
