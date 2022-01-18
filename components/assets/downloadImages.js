const fs = require('fs');
const art = require('../art.json');
const axios = require('axios');
const sharp = require('sharp');

const prodArt = art.production;
const stagingArt = art.staging;
let assets = prodArt.map(asset => require(`./${asset.name}.json`));

(async () => {

  for (let i = 0; i < assets.length; i++) {
    let asset = assets[i];
    let name = asset.symbol;
    console.log(`downloading: ${name}`);

    let description = asset && asset.description ? asset.description : undefined;
    let nft_object = description ? description.nft_object : undefined;

    if (!fs.existsSync('../../public/images/' + name)) {
      fs.mkdir('../../public/images/' + name, (err) => {
          if (err) {
              return console.error(err);
          }
          console.log('Directory created successfully!');
      });
    }

    let url;
    if (nft_object && nft_object.media_png_multihashes) {

      for (let k = 0; k < nft_object.media_png_multihashes.length; k++) {
        if (!fs.existsSync(`../../public/images/${name}/${k}.webp`)) {
          let currentURL = nft_object.media_png_multihashes[k].url;

          await axios({
              method: "get",
              url: "https://gateway.ipfs.io" + currentURL,
              responseType: "stream"
          }).then(function (response) {
              response.data.pipe(fs.createWriteStream(`../../public/images/${name}/${k}.png`));
          });
        }
      }

    } else if (nft_object && nft_object.media_json) {
      let data = { media_json: nft_object.media_json };
      let fileName = `../../public/images/${name}/media_json.json`;

      if (data && fileName && !fs.existsSync(`../../public/images/${name}/media_json.json`)) {
        fs.writeFile(fileName, JSON.stringify(data), function(err){
          console.log(err ? err : '')
        });
      }

    } else if (nft_object) {
      let image;
      let fileName;
      if (nft_object.media_png || nft_object.image_png) {
        image = nft_object.media_png || nft_object.image_png || undefined;
        fileName = `../../public/images/${name}/0.png`;
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
                "https://cloudflare-ipfs.com" + nft_object.media_gif_multihash ||
                undefined;
        fileName = `../../public/images/${name}/0.gif`;
      } else if (
        nft_object.media_jpeg ||
        nft_object.image_jpeg ||
        nft_object.media_jpeg_multihash
      ) {
        image = nft_object.media_jpeg ||
                nft_object.image_jpeg ||
                "https://cloudflare-ipfs.com" + nft_object.media_jpeg_multihash ||
                undefined;
        fileName = `../../public/images/${name}/0.jpeg`;
      }

      if (image && fileName && !fs.existsSync(`../../public/images/${name}/0.webp`)) {
        fs.writeFile(fileName, image, {encoding: 'base64'}, function(err){
          console.log(err ? err : '')
        });
      }
    }

  }

})();
