const fs = require('fs');
const sharp = require('sharp');

const fileList = fs.readdirSync(`../../public/images/`);
let filteredFiles = fileList.filter(file => file.includes(".png") && !file.includes("_icon") && !file.includes("_thumb"));

(async () => {

  for (let i = 0; i < filteredFiles.length; i++) {
    let file = filteredFiles[i];

    console.log(file.split(".png")[0])

    await sharp(`../../public/images/${file}`)
            .toFile(`../../public/images/${file.split(".png")[0]}.webp`);

    await sharp(`../../public/images/${file}`)
            .resize(32, 32)
            .toFile(`../../public/images/${file.split(".png")[0]}_icon.webp`);

    await sharp(`../../public/images/${file}`)
            .resize(128, 128)
            .toFile(`../../public/images/${file.split(".png")[0]}_thumb.webp`);
  }

})();
