import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('@material-ui/core/Grid'));
const NFTCard = dynamic(() => import('../components/NFTCard'));
const Layout = dynamic(() => import('../components/Layout'));
import { useEnvironment, useAnalytics } from '../components/states';

function Gallery(props) {
  const { t } = useTranslation('gallery');
  let [analytics, setAnalytics] = useAnalytics();

  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Gallery')
    }
  }, [analytics]);

  let config = props.config;
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
  let nfts = env === 'production' ? props.minProdNFTS : props.minStagingNFTS;

  let galleryCards = nfts.map(nft => <NFTCard smSize={4} nft={nft} key={nft.symbol + "_card"} />);

  return (
    <Layout
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config ? config.title: ''}
    >
      <Grid container style={{'maxWidth': '100%'}} key="index">
        {
          galleryCards
        }
      </Grid>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');
  let artJSON = require('../components/art.json');

  let prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  let minProdNFTS = prodNFTS.map(nft => {
    return {
      symbol: nft.symbol,
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
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  return {
    props: {
      minProdNFTS,
      minStagingNFTS,
      config,
      ...await serverSideTranslations(locale, ['gallery', 'nft', 'nav']),
    }
  }
}

export default Gallery
