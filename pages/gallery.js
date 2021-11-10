import { useEffect, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { FixedSizeGrid  as ReactGrid } from 'react-window';
import { isMobile, isIOS, isSafari, isMobileSafari } from 'react-device-detect';
import { useViewportSize } from '@mantine/hooks';

import {
  Paper,
  Grid,
  Col,
  Group,
  SimpleGrid
} from '@mantine/core';

const GalleryCard = dynamic(() => import('../components/GalleryCard'));
const SEO = dynamic(() => import('../components/SEO'));
import { useEnvironment, useAnalytics } from '../components/states';

function Gallery(props) {
  const { t } = useTranslation('gallery');
  let [analytics, setAnalytics] = useAnalytics();
  const { height, width } = useViewportSize();

  let cols = 1;
  if (width >= 3500) {
    cols = 8;
  } else if (width >= 2900 && width < 3500) {
    cols = 7;
  } else if (width >= 2500 && width < 2900) {
    cols = 6;
  } else if (width >= 2100 && width < 2500) {
    cols = 5;
  } else if (width >= 1700 && width < 2100) {
    cols = 4;
  } else if (width >= 1350 && width < 1700) {
    cols = 3;
  } else if (width > 1060 && width < 1350) {
    cols = 2;
  }

  useEffect(() => {
    async function sendAnalytics() {
      if (analytics && config.google_analytics.length) {
        const ReactGA = (await import('react-ga4')).default
        ReactGA.initialize(config.google_analytics);
        ReactGA.pageview('Gallery')
      }
    }
    sendAnalytics();
  }, [analytics]);

  let config = props.config;
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
  let nfts = env === 'production'
              ? props.minProdNFTS
              : props.minStagingNFTS;

  let galleryCards = useMemo(() => {
    return  <SimpleGrid cols={cols}>
              {
                nfts.map(nft => {
                  return <GalleryCard nft={nft} key={nft.symbol + "_card"} isApple={isIOS || isSafari || isMobileSafari} />
                })
              }
            </SimpleGrid>
  }, [nfts, cols]);

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config ? config.title: ''}
    />,
    galleryCards
  );
}

export const getStaticProps = async ({ locale }) => {
  let config = require('../components/config.json');
  let artJSON = require('../components/art.json');

  let prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  let minProdNFTS = prodNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      id: nft.id,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  let stagingNFTS = artJSON.staging.map(item => require(`../components/assets/${item.name}.json`));
  let minStagingNFTS = stagingNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      id: nft.id,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      minProdNFTS,
      minStagingNFTS,
      config,
      ...(await serverSideTranslations(locale, ['gallery', 'nft', 'nav'])),
    }
  };
}

export default Gallery
