import { useMemo } from 'react';

import {
  useTranslation,
} from 'next-export-i18n';

import { isMobile, isIOS, isSafari, isMobileSafari } from 'react-device-detect';

import { Text, Center, Grid, Col, Container, Paper, Button, Group } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import configJSON from '../config/config.json' assert {type: 'json'};
import artJSON from '../config/art.json' assert {type: 'json'};

import CarouselElement from '../components/Carousel';
import SEO from '../components/SEO';
import { useAppStore } from '../components/states';

function Home(props) {
  const { t } = useTranslation();
  const environment = useAppStore((state) => state.environment);
  const env = environment || 'production';
  const { height, width } = useViewportSize();

  let paperWidth;
  if (width < 576) { //xs
    paperWidth = 300;
  } else if (width < 768) { //sm
    paperWidth = width * 0.75;
  } else if (width < 1000) { //md
    paperWidth = width * 0.5;
  } else if (width < 1280) { //lg
    paperWidth = width * 0.6;
  } else if (width < 1500) { //xl
    paperWidth = width * 0.5;
  } else {
    paperWidth = width * 0.4;
  }

  const { config } = props;
  const nfts = env === 'production' ? props.minProdNFTS : props.minStagingNFTS;

  const carouselMemo = useMemo(() => <CarouselElement
    nfts={nfts}
    isMobile={isMobile}
    isApple={isIOS || isSafari || isMobileSafari}
    width={paperWidth}
  />, [nfts, paperWidth]);

  return ([
    <SEO
      description={t('mainpage.header_description', { title: config.title })}
      title={t('mainpage.header_title')}
      siteTitle={config ? config.title : ''}
      key="seo"
    />,
    <Grid grow key="Index featured NFT">
      <Col span={12}>
        <Center>
          <Text size="md">
            {t('mainpage.featured')}
          </Text>
        </Center>
        <Center>
          <Paper p="sm" shadow="sm" withBorder>
            <div style={{ width: paperWidth, margin: 'auto' }}>
              {carouselMemo}
            </div>
          </Paper>
        </Center>
      </Col>
    </Grid>,
  ]);
}

export const getStaticProps = async ({ locale }) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  const minProdNFTS = prodNFTS.map(nft => {
    let desc;
    if (nft && Array.isArray(nft)) {
      const thisNFT = nft[0];
      desc = thisNFT.options.description;
    } else {
      desc = nft.description;
    }

    return {
      symbol: nft.symbol,
      market: desc.market,
      title: desc.nft_object.title,
      artist: desc.nft_object.artist,
      media_json: !!desc.nft_object.media_json,
    };
  });

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const stagingNFTS = artJSON.staging.map(item => require(`../components/assets/${item.name}.json`));
  const minStagingNFTS = stagingNFTS.map(nft => {
    let desc;
    if (nft && Array.isArray(nft)) {
      const thisNFT = nft[0];
      desc = thisNFT.options.description;
    } else {
      desc = nft.description;
    }

    return {
      symbol: nft.symbol,
      market: desc.market,
      title: desc.nft_object.title,
      artist: desc.nft_object.artist,
      media_json: !!desc.nft_object.media_json,
    };
  });

  return {
    props: {
      minProdNFTS,
      minStagingNFTS,
      config: configJSON,
    },
  };
};

export default Home;
