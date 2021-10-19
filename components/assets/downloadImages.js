const fs = require('fs');
const art = require('../art.json');
const axios = require('axios');
const sharp = require('sharp');

const prodArt = art.production;
let assets = prodArt.map(asset => require(`./${asset.name}.json`));

(async () => {

  for (let i = 0; i < assets.length; i++) {
    let asset = assets[i];
    let name = asset.symbol;

    if (!fs.existsSync('../../public/images/' + name)) {
      fs.mkdir('../../public/images/' + name, (err) => {
          if (err) {
              return console.error(err);
          }
          console.log('Directory created successfully!');
      });
    }

    let description = asset && asset.description ? asset.description : undefined;
    let nft_object = description ? description.nft_object : undefined;

    let url;
    if (nft_object && nft_object.media_png_multihashes) {

      for (let k = 0; k < nft_object.media_png_multihashes.length; k++) {
        let currentURL = nft_object.media_png_multihashes[k].url;

        await axios({
            method: "get",
            url: "https://gateway.ipfs.io" + currentURL,
            responseType: "stream"
        }).then(function (response) {
            response.data.pipe(fs.createWriteStream(`../../public/images/${name}/${k}.png`));
        });
      }

    } else if (nft_object) {
      let image;
      let fileName;
      if (nft_object.media_png || nft_object.image_png) {
        image = nft_object.media_png || nft_object.image_png || undefined;
        fileName = `../../public/images/${name}/0.png`;
      } else if (nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif) {
        image = nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif || undefined;
        fileName = `../../public/images/${name}/0.gif`;
      } else if (nft_object.media_jpeg || nft_object.image_jpeg) {
        image = nft_object.media_jpeg || nft_object.image_jpeg || undefined;
        fileName = `../../public/images/${name}/0.jpeg`;
      }

      if (image && fileName) {
        fs.writeFile(fileName, image, {encoding: 'base64'}, function(err){
          console.log(err ? err : '')
        });
      }
    }

  }

})();
