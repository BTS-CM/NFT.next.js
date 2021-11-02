import { useEffect } from "react";
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { isMobile, isIOS, isSafari, isMobileSafari } from 'react-device-detect';

const List = dynamic(() => import('../components/List'));
const SEO = dynamic(() => import('../components/SEO'));

import { useAnalytics } from '../components/states';

function Listings (properties) {
  const { t } = useTranslation('listings');
  const config = properties.config;

  let [analytics, setAnalytics] = useAnalytics();
  useEffect( async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Listings')
    }
  }, [analytics]);

  return (
    <SEO
      description={t('header_description')}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <List isMobile={isMobile} isApple={isIOS || isSafari || isMobileSafari} {...properties}/>
  );
}


export const getStaticProps = async ({ locale }) => {
  const config = require('../components/config.json');
  const art = require('../components/art.json');

  let prodNFTS = art.production.map(item => require(`../components/assets/${item.name}.json`));
  let minProdNFTS = [];
  for (let i = 0; i < prodNFTS.length; i++) {
    const nft = prodNFTS[i];
    const nft_object = nft.description.nft_object;

    let nftData = {
      symbol: nft.symbol,
      id: nft.id,
      type: nft_object.type,
      title: nft_object.title,
      artist: nft_object.artist,
      encoding: nft_object.encoding,
      media_json: nft_object.media_json ? true : false
    };

    if (nft_object.media_png || nft_object.image_png) {
      nftData["fileType"] = "png";
    } else if (nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif) {
      nftData["fileType"] = "gif";
    } else if (nft_object.media_jpeg || nft_object.image_jpeg) {
      nftData["fileType"] = "jpeg";
    } else if (nft_object.media_json) {
      nftData["fileType"] = "objt";
    } else if (nft_object.media_gltf) {
      nftData["fileType"] = "gltf";
    }

    minProdNFTS.push(nftData);
  }

  let stagingNFTS = art.staging.map(item => require(`../components/assets/${item.name}.json`));
  let minStagingNFTS = [];
  for (let i = 0; i < stagingNFTS.length; i++) {
    const nft = stagingNFTS[i];
    const nft_object = nft.description.nft_object;

    let nftData = {
      symbol: nft.symbol,
      id: nft.id,
      type: nft_object.type,
      title: nft_object.title,
      artist: nft_object.artist,
      encoding: nft_object.encoding,
      media_json: nft_object.media_json ? true : false
    };

    if (nft_object.media_png || nft_object.image_png) {
      nftData["fileType"] = "png";
    } else if (nft_object.media_gif || nft_object.media_GIF || nft_object.image_GIF || nft_object.image_gif) {
      nftData["fileType"] = "gif";
    } else if (nft_object.media_jpeg || nft_object.image_jpeg) {
      nftData["fileType"] = "jpeg";
    } else if (nft_object.media_json) {
      nftData["fileType"] = "objt";
    } else if (nft_object.media_gltf) {
      nftData["fileType"] = "gltf";
    }

    minStagingNFTS.push(nftData)
  }

  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      config: config,
      art: art,
      minProdNFTS,
      minStagingNFTS,
      ...(await serverSideTranslations(locale, ['listings', 'nav'])),
    }
  };
}


export default Listings
