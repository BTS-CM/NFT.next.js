import { useRouter } from 'next/router'
import ReactGA from 'react-ga4';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const SEO = dynamic(() => import('../../components/SEO'));
const ANFT = dynamic(() => import('../../components/ANFT'));

import art from '../../components/art.json';
import { useEnvironment, useAnalytics } from '../../components/states';

function InvalidNFT (props) {
  if (props.analytics) {
    ReactGA.pageview(`Invalid NFT`);
  }

  let config = props.config;

  return <SEO
            description={"Unable to load this NFT"}
            title={`Unknown NFT`}
            siteTitle={config.title}
          />,
          <p>Unable to load NFT</p>
}

function ValidNFT (props) {
  let nft = props.nft;
  let initAsset = props.initAsset;
  let config = props.config;

  if (props.analytics) {
    ReactGA.pageview(`NFT ${nft}`);
  }
  const { t } = useTranslation('nft');
  return <SEO
    description={t('header_description', {nft: nft})}
    title={t('header_title', {nft: nft})}
    siteTitle={config.title}
  />,
  <ANFT id={nft} initAsset={initAsset} key={nft} individual={true} {...props} />
}


function NFT (props) {

  let [analytics, setAnalytics] = useAnalytics();
  let initAsset = props.initAsset;
  let config = props.config;

  if (analytics && config.google_analytics.length) {
    ReactGA.initialize(config.google_analytics);
  }
  const router = useRouter()
  const { nft } = router.query
  let [environment, setEnvironment] = useEnvironment();

  if (!nft) {
    return <InvalidNFT analytics={analytics} {...props} />
  }

  let env = environment ? environment : 'production';
  const artNames = art && art[env] ? art[env].map(item => item.name) : [];

  if (artNames.includes(nft)) {
    return <ValidNFT
              nft={nft}
              initAsset={initAsset}
              environment={env}
              analytics={analytics}
              {...props}
            />
  } else {

    const stagingArt = art && art['staging'] ? art['staging'].map(item => item.name) : [];
    if (stagingArt.includes(nft)) {
      return <ValidNFT
                nft={nft}
                initAsset={initAsset}
                environment={'staging'}
                analytics={analytics}
                {...props}
              />
    } else {
      return <InvalidNFT analytics={analytics} {...props} />
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

export const getStaticProps = async ({ locale, params }) => {

  let config = require('../../components/config.json');
  let initAsset = require(`../../components/assets/${params.nft}.json`);

  return {
    props: {
      config,
      initAsset,
      ...(await serverSideTranslations(locale, ['nft', 'nav'])),
    },
  };
}

export default NFT
