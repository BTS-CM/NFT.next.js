import { useRouter } from 'next/router';
import {
  useTranslation,
} from 'next-export-i18n';
import dynamic from 'next/dynamic';
import { isIOS, isSafari, isMobileSafari } from 'react-device-detect';

import configJSON from '../../config/config.json';
import art from '../../config/art.json';
import { useAppStore } from '../../components/states';

const SEO = dynamic(() => import('../../components/SEO'));
const NFT = dynamic(() => import('../../components/NFT'));

function InvalidNFT(props) {
  const { config } = props;

  return ([<SEO
    description="Unable to load this NFT"
    title="Unknown NFT"
    siteTitle={config.title}
    key="SEO"
  />,
          <p key="Invalid">Unable to load NFT</p>]);
}

function ValidNFT(props) {
  const { nft } = props;
  const { initAsset } = props;
  const { config } = props;

  const { t } = useTranslation();

  return ([
          <SEO
            description={t('nft.header_description', { nft })}
            title={t('nft.header_title', { nft })}
            siteTitle={config.title}
            key="seo"
          />,
          <NFT
            id={nft}
            initAsset={initAsset}
            key={nft}
            individual
            isApple={isIOS || isSafari || isMobileSafari}
            {...props}
          />,
  ]);
}

function NFTPAGE(props) {
  const { initAsset } = props;
  const { config } = props;

  const router = useRouter();
  const { nft } = router.query;
  const environment = useAppStore((state) => state.environment);

  if (!nft) {
    return <InvalidNFT {...props} />;
  }

  const env = environment || 'production';
  const artNames = art && art[env] ? art[env].map(item => item.name) : [];

  if (artNames.includes(nft)) {
    return <ValidNFT
      nft={nft}
      initAsset={initAsset}
      environment={env}
      {...props}
    />;
  }

  const stagingArt = art && art.staging ? art.staging.map(item => item.name) : [];
  if (stagingArt.includes(nft)) {
    return <ValidNFT
      nft={nft}
      initAsset={initAsset}
      environment="staging"
      {...props}
    />;
  }
  return <InvalidNFT {...props} />;
}

export const getStaticPaths = async () => {
  const prodNFTS = art.production.map(item => ({ params: { nft: item.name } }));
  const stagingNFTS = art.staging.map(item => ({ params: { nft: item.name } }));

  return {
    paths: [...prodNFTS, ...stagingNFTS], //indicates that no page needs be created at build time
    fallback: false, //indicates the type of fallback
  };
};

export const getStaticProps = async ({ locale, params }) => {
  let initAsset;
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    initAsset = require(`../../components/assets/${params.nft}.json`);
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      config: configJSON,
      initAsset,
    },
  };
};

export default NFTPAGE;
