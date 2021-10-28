const fs = require('fs');

const fileList = fs.readdirSync(`./`);
const jsonFiles = fileList.filter(file => file.includes(".json"));

(async () => {

  for (let i = 0; i < jsonFiles.length; i++) {
    let filename = jsonFiles[i];
    let currentFile = require(`./${filename}`);
    let description = currentFile.description ? currentFile.description : undefined;
    let nft_object = description ? description.nft_object : undefined;

    [
      "media_png_multihashes",
      "media_json",
      "media_png",
      "image_png",
      "media_gif",
      "media_GIF",
      "image_GIF",
      "image_gif",
      "media_jpeg",
      "image_jpeg"
    ].forEach((item, i) => {
      delete nft_object[item];
    });

    currentFile.description.nft_object = nft_object;

    fs.writeFile(`./${filename}`, JSON.stringify(currentFile, null, 4), (err) => {
       if (err) console.log(err);
    });

  }

})();
