import { useMemo } from 'react';

import {
  useTranslation,
} from 'next-export-i18n';

import dynamic from 'next/dynamic';
import { isIOS, isSafari, isMobileSafari } from 'react-device-detect';
import { useViewportSize } from '@mantine/hooks';
import {
  SimpleGrid,
} from '@mantine/core';

import configJSON from '../config/config.json' assert {type: 'json'};
import artJSON from '../config/art.json' assert {type: 'json'};

import { useAppStore } from '../components/states';

const GalleryCard = dynamic(() => import('../components/GalleryCard'));
const SEO = dynamic(() => import('../components/SEO'));

function Gallery(props) {
  const { t } = useTranslation();
  const { height, width } = useViewportSize();

  let cols = 1;
  if (width >= 3500) {
    cols = 8;
  } else if (width >= 2900 && width < 3500) {
    cols = 7;
  } else if (width >= 2500 && width < 2900) {
    cols = 6;
  } else if (width >= 2100 && width < 2500) {
    cols = 5;
  } else if (width >= 1700 && width < 2100) {
    cols = 4;
  } else if (width >= 1350 && width < 1700) {
    cols = 3;
  } else if (width > 1060 && width < 1350) {
    cols = 2;
  }

  const { config } = props;
  const environment = useAppStore((state) => state.environment);
  const env = environment || 'production';
  const nfts = env === 'production'
    ? props.minProdNFTS
    : props.minStagingNFTS;

  const galleryCards = useMemo(() => <SimpleGrid cols={cols} key="Gallery Grid">
              {
                nfts.map(nft => <GalleryCard nft={nft} key={`${nft.symbol}_card`} isApple={isIOS || isSafari || isMobileSafari} />)
              }
                                     </SimpleGrid>, [nfts, cols]);

  return ([
    <SEO
      description={t('gallery.header_description', { title: config.title })}
      title={t('gallery.header_title')}
      siteTitle={config ? config.title : ''}
      key="SEO"
    />,
    galleryCards,
  ]);
}

export const getStaticProps = async ({ locale }) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const stagingNFTS = artJSON.staging.map(item => require(`../components/assets/${item.name}.json`));

  const minProdNFTS = prodNFTS.map(nft => ({
    symbol: nft.symbol,
    id: nft.id,
    market: nft.description.market,
    title: nft.description.nft_object.title,
    artist: nft.description.nft_object.artist,
    media_json: !!nft.description.nft_object.media_json,
  }));

  const minStagingNFTS = stagingNFTS.map(nft => ({
    symbol: nft.symbol,
    id: nft.id,
    market: nft.description.market,
    title: nft.description.nft_object.title,
    artist: nft.description.nft_object.artist,
    media_json: !!nft.description.nft_object.media_json,
  }));

  return {
    props: {
      minProdNFTS,
      minStagingNFTS,
      config: configJSON,
    },
  };
};

export default Gallery;
