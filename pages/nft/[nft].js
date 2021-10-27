import { useRouter } from 'next/router'
import ReactGA from 'react-ga4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

import Layout from '../../components/Layout';
import ANFT from "../../components/ANFT";

import art from '../../components/art.json';
import config from '../../components/config.json';
import { useEnvironment, useAnalytics } from '../../components/states';

function InvalidNFT (props) {
  if (props.analytics) {
    ReactGA.pageview(`Invalid NFT`);
  }
  return <Layout
            description={"Unable to load this NFT"}
            title={`Unknown NFT`}
            siteTitle={config.title}
          >
            <p>Unable to load NFT</p>
          </Layout>
}

function ValidNFT (props) {
  let nft = props.nft;
  if (props.analytics) {
    ReactGA.pageview(`NFT ${nft}`);
  }
  const { t } = useTranslation('nft');
  return <Layout
    description={t('header_description', {nft: nft})}
    title={t('header_title', {nft: nft})}
    siteTitle={config.title}
  >
    <ANFT id={nft} key={nft} individual={true} {...props} />
  </Layout>
}


const NFT = () => {

  let [analytics, setAnalytics] = useAnalytics();
  if (analytics && config.google_analytics.length) {
    ReactGA.initialize(config.google_analytics);
  }
  const router = useRouter()
  const { nft } = router.query
  let [environment, setEnvironment] = useEnvironment();

  if (!nft) {
    return <InvalidNFT analytics={analytics} />
  }

  let env = environment ? environment : 'production';
  const artNames = art && art[env] ? art[env].map(item => item.name) : [];

  if (artNames.includes(nft)) {
    return <ValidNFT nft={nft} environment={env} analytics={analytics} />
  } else {

    const stagingArt = art && art['staging'] ? art['staging'].map(item => item.name) : [];
    if (stagingArt.includes(nft)) {
      return <ValidNFT nft={nft} environment={'staging'} analytics={analytics} />
    } else {
      return <InvalidNFT analytics={analytics} />
    }

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
