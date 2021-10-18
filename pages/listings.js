import { useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '../components/List';
import Layout from '../components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ReactGA from 'react-ga4';
ReactGA.initialize('G-CTZ1V9EXWY');

function Listings () {
  useEffect(() => {
    ReactGA.pageview('Listings')
  }, []);

  return (
    <Layout
      description={`A list of all Bitshares NFTs currently featured on the Bitshares blockchain.`}
      title={`List of featured Bitshares NFTs`}
      siteTitle={'NFTEA Gallery'}
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
