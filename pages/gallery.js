import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ReactGA from 'react-ga4';
import { useTranslation } from 'next-i18next';

import Grid from '@material-ui/core/Grid';

import { useEnvironment } from '../components/states';
import NFTCard from "../components/NFTCard";
import Layout from '../components/Layout';
import artJSON from '../components/art.json';
import config from '../components/config.json';
import { useAnalytics } from '../components/states';

function All() {


  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';

  const art = artJSON && artJSON[env] ? artJSON[env] : [];
  return art && art.length
          ? art.map(asset => <NFTCard smSize={4} id={asset.name} key={asset.name + "_card"} />)
          : <p>loading</p>
}

function Gallery() {
  const { t } = useTranslation('gallery');

  let [analytics, setAnalytics] = useAnalytics();

  useEffect(() => {
    if (analytics && config.google_analytics.length) {
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Gallery')
    }
  }, [analytics]);

  return (
    <Layout
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config ? config.title: ''}
    >
      <Grid container style={{'maxWidth': '100%'}} key="index">
        <All />
      </Grid>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['gallery', 'nft', 'nav']),
  },
})

export default Gallery
