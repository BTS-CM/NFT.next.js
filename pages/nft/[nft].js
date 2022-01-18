import { useRouter } from 'next/router'
import ReactGA from 'react-ga4';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import dynamic from 'next/dynamic';
import { isIOS, isSafari, isMobileSafari } from 'react-device-detect'
import { useNotifications } from '@mantine/notifications';

const SEO = dynamic(() => import('../../components/SEO'));
const NFT = dynamic(() => import('../../components/NFT'));

import art from '../../components/art.json';
import { useEnvironment, useAnalytics, useApproval } from '../../components/states';

function InvalidNFT (props) {
  if (props.analytics) {
    ReactGA.pageview(`Invalid NFT`);
  }

  let config = props.config;

  return ([<SEO
            description={"Unable to load this NFT"}
            title={`Unknown NFT`}
            siteTitle={config.title}
            key={'SEO'}
          />,
          <p key={'Invalid'}>Unable to load NFT</p>]);
}

function ValidNFT (props) {
  let nft = props.nft;
  let initAsset = props.initAsset;
  let config = props.config;

  if (props.analytics) {
    ReactGA.pageview(`NFT ${nft}`);
  }

  const { t } = useTranslation();

  return ([
          <SEO
            description={t('nft.header_description', {nft: nft})}
            title={t('nft.header_title', {nft: nft})}
            siteTitle={config.title}
            key={"seo"}
          />,
          <NFT
            id={nft}
            initAsset={initAsset}
            key={nft}
            individual={true}
            isApple={isIOS || isSafari || isMobileSafari}
            {...props}
          />
        ]);
}


function NFTPAGE (props) {

  let [analytics, setAnalytics] = useAnalytics();
  let [approval, setApproval] = useApproval();
  const notifications = useNotifications();

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
              notifications={notifications}
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
                notifications={notifications}
                {...props}
              />
    } else {
      return <InvalidNFT analytics={analytics} {...props} />
    }

  }
}

export const getStaticPaths = async () => {

  let prodNFTS = art.production.map(item => ({params: {nft: item.name}}));
  let stagingNFTS = art.staging.map(item => ({params: {nft: item.name}}));

  return {
      paths: [...prodNFTS, ...stagingNFTS], //indicates that no page needs be created at build time
      fallback: false //indicates the type of fallback
  }
}

export const getStaticProps = async ({ locale, params }) => {
  let config = require('../../components/config.json');
  let initAsset;
  try {
    initAsset = require(`../../components/assets/${params.nft}.json`);
  } catch(e) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      config,
      initAsset,
    },
  };
}

export default NFTPAGE
