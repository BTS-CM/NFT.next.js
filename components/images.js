const atob = require('atob');

/**
 * Parse the nft_object to return relevant image data
 * @param {Object} nft_object
 * @param {String} symbol
 * @returns {Object}
 */
function getImage(nft_object, symbol) {
  let image;
  let imgURL;
  let fileType;

  if (!nft_object) {
    return {
      image: undefined,
      imgURL: undefined,
      fileType: undefined,
    };
  }

  //console.log({nft_object})

  if (nft_object.media_png || nft_object.image_png) {
    image = nft_object.media_png || nft_object.image_png || undefined;
    imgURL = image
      ? `data:image/png;base64,${image}`
      : undefined;
    fileType = 'png';
  } else if (
    nft_object.media_gif ||
    nft_object.media_GIF ||
    nft_object.image_GIF ||
    nft_object.image_gif
  ) {
    image = nft_object.media_gif ||
            nft_object.media_GIF ||
            nft_object.image_GIF ||
            nft_object.image_gif ||
            undefined;

    imgURL = image
      ? `data:image/gif;base64,${image}`
      : undefined;
    fileType = 'gif';
  } else if (nft_object.media_jpeg || nft_object.image_jpeg) {
    image = nft_object.media_jpeg || nft_object.image_jpeg || undefined;
    imgURL = image
      ? `data:image/jpeg;base64,${image}`
      : undefined;
    fileType = 'jpeg';
  } else if (nft_object.media_json) {
    image = nft_object.media_json;
    fileType = 'objt';
  } else if (nft_object.media_gltf) {
    image = nft_object.media_gltf;
    fileType = 'gltf';
  } else if (nft_object.media_jpeg_multihash || nft_object.media_JPEG_multihash) {
    imgURL = `/images/${symbol}/0.webp`;
    //imgURL = nft_object.media_jpeg_multihash || nft_object.media_JPEG_multihash || undefined;
    fileType = 'jpeg';
  } else if (nft_object.media_gif_multihash || nft_object.media_GIF_multihash) {
    imgURL = `/images/${symbol}/0.gif`;
    //imgURL = nft_object.media_gif_multihash || nft_object.media_GIF_multihash || undefined;
    fileType = 'gif';
  } else if (nft_object.media_png_multihash || nft_object.media_PNG_multihash) {
    imgURL = `/images/${symbol}/0.webp`;
    //imgURL = nft_object.media_png_multihash || nft_object.media_PNG_multihash || undefined;
    fileType = 'png';
  }

  return {
    image,
    imgURL,
    fileType,
  };
}

function getPngDimensions(base64) {
  const header = atob(base64.slice(0, 50)).slice(16, 24);
  const uint8 = Uint8Array.from(header, c => c.charCodeAt(0));
  const dataView = new DataView(uint8.buffer);

  return {
    width: dataView.getInt32(0),
    height: dataView.getInt32(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  };
}

export {
  getImage,
  getPngDimensions,
};
