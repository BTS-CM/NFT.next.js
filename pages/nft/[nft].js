import { useRouter } from 'next/router'
import ReactGA from 'react-ga4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

import Layout from '../../components/Layout';
import ANFT from "../../components/ANFT";

import art from '../../components/art.json';
import config from '../../components/config.json';
import { useEnvironment } from '../../components/states';

ReactGA.initialize(config ? config.google_analytics : '');

const NFT = () => {
  const router = useRouter()
  const { nft } = router.query

  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
  const artNames = art && art[env] ? art[env].map(item => item.name) : [];

  const { t } = useTranslation('nft');

  if (nft && artNames.includes(nft)) {
    ReactGA.pageview(`NFT ${nft}`);
    return <Layout
      description={t('header_description', {nft: nft})}
      title={t('header_title', {nft: nft})}
      siteTitle={config.title}
    >
      <ANFT id={nft} key={nft} individual={true} />
    </Layout>
  } else {
    ReactGA.pageview(`Invalid NFT ${nft ? nft : '???'}`);
    return <Layout
              description={"Unable to load this NFT"}
              title={`Unknown NFT`}
              siteTitle={config.title}
            >
              <p>Unable to load NFT</p>
            </Layout>
  }
}

export const getStaticPaths = async ({ locales }) => {

  let prodNFTS = art.production.map(item => ({params: {nft: item.name}}));
  let stagingNFTS = art.staging.map(item => ({params: {nft: item.name}}));

  let paths = [];

  for (let i = 0; i < prodNFTS.length; i++) {
    const currentNFT = prodNFTS[i];
    paths.push(
      ...locales.map(locale => ({...currentNFT, locale: locale}))
    )
  }

  for (let i = 0; i < stagingNFTS.length; i++) {
    const currentNFT = stagingNFTS[i];
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
