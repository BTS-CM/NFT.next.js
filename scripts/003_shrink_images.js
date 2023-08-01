const fs = require('fs');
const sharp = require('sharp');

const fileList = fs.readdirSync('./public/images/');

(async () => {
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const folderImages = fs.readdirSync(`./public/images/${file}/`);

    for (let k = 0; k < folderImages.length; k++) {
      const currentImageName = folderImages[k];
      if (currentImageName.includes('_')) {
        continue;
      }
      if (currentImageName.includes('.png') || currentImageName.includes('.webp')) {
        const currentNum = currentImageName.split('.')[0];

        if (currentImageName !== `${currentNum}.webp`) {
          await sharp(`./public/images/${file}/${currentImageName}`)
            .toFile(`./public/images/${file}/${currentNum}.webp`);
        }

        await sharp(`./public/images/${file}/${currentImageName}`)
          .resize(128, 128)
          .toFile(`./public/images/${file}/${currentNum}_thumb.webp`);

        await sharp(`./public/images/${file}/${currentImageName}`)
          .resize(350, 350)
          .toFile(`./public/images/${file}/${currentNum}_gallery.webp`);

        await sharp(`./public/images/${file}/${currentImageName}`)
          .resize(5, 5)
          .toFile(`./public/images/${file}/${currentNum}_bg.webp`);
      }
    }
  }
})();
