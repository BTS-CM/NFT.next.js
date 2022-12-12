const fs = require('fs');
const sharp = require('sharp');

const fileList = fs.readdirSync('../public/images/');

(async () => {
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (file.includes('.') && fs.existsSync(`../public/images/${file}/0.webp`)) {
      await sharp(`../public/images/${file}/0.webp`)
        .resize(5, 5)
        .toFile(`../public/images/${file}/0_bg.webp`);
    }
  }
})();
