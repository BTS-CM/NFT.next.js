import { useRouter } from 'next/router'
import ReactGA from 'react-ga4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../../components/Layout';
import ANFT from "../../components/ANFT";

import art from '../../components/art.json';

ReactGA.initialize('G-CTZ1V9EXWY');

const NFT = () => {
  const router = useRouter()
  const { nft } = router.query
  const artNames = art && art.production ? art.production.map(item => item.name) : [];

  if (nft && artNames.includes(nft)) {
    ReactGA.pageview(`NFT ${nft}`);
    return <Layout
      description={`"${nft}" is an Bitshares blockchain powered NFT; buy, trade, collect it on the BTS DEX!`}
      title={`"${nft}" Bitshares NFT`}
      siteTitle={'NFTEA Gallery'}
    >
      <ANFT id={nft} key={nft} individual={true} />
    </Layout>
  } else {
    ReactGA.pageview(`Invalid NFT ${nft ? nft : '???'}`);
    return <Layout
              description={"Unable to load this NFT"}
              title={`Unknown NFT`}
              siteTitle={'NFTEA Gallery'}
            >
              <p>Unable to load NFT</p>
            </Layout>
  }
}



export const getStaticPaths = async ({ locales }) => {

  let nfts = art.production.map(item => ({params: {nft: item.name}}));

  let paths = [];

  for (let i = 0; i < nfts.length; i++) {
    const currentNFT = nfts[i];

    paths.push(
      ...locales.map(locale => ({...currentNFT, locale: locale}))
    )
  }

  return {
      paths: paths, //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['nft', 'nav']),
  },
})

export default NFT
