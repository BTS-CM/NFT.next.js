import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ReactGA from 'react-ga4';

import ANFT from "../components/ANFT";
import Layout from '../components/Layout';
import artJSON from '../components/art.json';

ReactGA.initialize('G-CTZ1V9EXWY');

function All() {
  const art = artJSON && artJSON.production ? artJSON.production : [];
  return art && art.length
          ? art.map(asset => <ANFT id={asset.name} key={asset.name + "_gallery"} individual={false} />)
          : <p>loading</p>
}

function Gallery() {

  useEffect(() => {
    ReactGA.pageview('Gallery')
  }, []);

  return (
    <Layout
      description={'Check out all of the Bitshares NFTs featured on the NFTEA Gallery!'}
      title={'All featured NFTs'}
      siteTitle={'NFTEA Gallery'}
    >
      <All />
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['nft', 'nav']),
  },
})

export default Gallery
