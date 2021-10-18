const fs = require('fs');
const art = require('../art.json');
const axios = require('axios');

const prodArt = art.production;
let assets = prodArt.map(asset => require(`./${asset.name}.json`));

for (let i = 0; i < assets.length; i++) {
    let asset = assets[i];
    let name = asset.symbol;

    if (
        !fs.existsSync(`../../public/images/${name}.png`) ||
        !fs.existsSync(`../../public/images/${name}.jpeg`) ||
        !fs.existsSync(`../../public/images/${name}.gif`)
      ) {

        let description = asset && asset.description ? asset.description : undefined;
        let nft_object = description ? description.nft_object : undefined;

        let url;
        if (nft_object && nft_object.media_png_multihashes) {
          let topFile = nft_object.media_png_multihashes[0];
          url = "https://gateway.ipfs.io" + topFile.url;

          axios({
              method: "get",
              url: url,
              responseType: "stream"
          }).then(function (response) {
              response.data.pipe(fs.createWriteStream(`../../public/images/${name}.png`));
          });

        } else if (nft_object) {
          let image;
          let fileName;
          if (nft_object.media_png || nft_object.image_png) {
            image = nft_object.media_png || nft_object.image_png || undefined;
            fileName = `../../public/images/${name}.png`;
          } else if (nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif) {
            image = nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif || undefined;
            fileName = `../../public/images/${name}.png`;
          } else if (nft_object.media_jpeg || nft_object.image_jpeg) {
            image = nft_object.media_jpeg || nft_object.image_jpeg || undefined;
            fileName = `../../public/images/${name}.png`;
          }

          if (image && fileName) {
            fs.writeFile(fileName, image, {encoding: 'base64'}, function(err){
              console.log(err)
            });
          }

        }

    }







  }
