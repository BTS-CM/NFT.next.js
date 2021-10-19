import { useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '../components/List';
import Layout from '../components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from '../components/config.json';

import ReactGA from 'react-ga4';
ReactGA.initialize(config.google_analytics);

function Listings () {
  useEffect(() => {
    ReactGA.pageview('Listings')
  }, []);

  return (
    <Layout
      description={`A list of all Bitshares NFTs currently featured on the Bitshares blockchain.`}
      title={`List of featured Bitshares NFTs`}
      siteTitle={config.title}
    >
      <List />
    </Layout>
  );
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['nav']),
  },
})


export default Listings
