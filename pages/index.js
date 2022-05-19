import { useEffect, useMemo } from 'react';

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";

import dynamic from 'next/dynamic';
import { isMobile, isIOS, isSafari, isMobileSafari } from 'react-device-detect';

import { Text, Center, Grid, Col, Container, Paper, Button, Group } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useViewportSize } from '@mantine/hooks';

import { analyticsNotification } from '../lib/analyticsNotification';
import CarouselElement from "../components/Carousel"
import SEO from "../components/SEO"
import { useEnvironment, useAnalytics, useApproval } from '../components/states';

function Home(props) {

  const { t } = useTranslation();
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
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

  let config = props.config;
  let nfts = env === 'production' ? props.minProdNFTS : props.minStagingNFTS;

  let [analytics, setAnalytics] = useAnalytics();
  let [approval, setApproval] = useApproval();
  const notifications = useNotifications();

  useEffect(() => {
    async function sendAnalytics() {
      if (approval === "request") {
        analyticsNotification(notifications, setApproval, setAnalytics)
      }
      if (analytics && config.google_analytics.length) {
        const ReactGA = (await import('react-ga4')).default
        ReactGA.initialize(config.google_analytics);
        ReactGA.pageview('Index');
      }
    }
    sendAnalytics();
  }, [analytics]);

  const carouselMemo = useMemo(() => <CarouselElement
                                       nfts={nfts}
                                       isMobile={isMobile}
                                       isApple={isIOS || isSafari || isMobileSafari}
                                       width={paperWidth}
                                     />, [nfts]);

  return ([
    <SEO
      description={t('mainpage.header_description', {title: config.title})}
      title={t('mainpage.header_title')}
      siteTitle={config ? config.title : ''}
      key="seo"
    />,
    <Grid grow key={"Index featured NFT"}>
      <Col span={12}>
        <Center>
          <Text size="md">
            {t("mainpage.featured")}
          </Text>
        </Center>
        <Center>
          <Paper padding="sm" shadow="sm" withBorder>
            <div style={{width: paperWidth, margin: 'auto' }}>
              {carouselMemo}
            </div>
          </Paper>
        </Center>
      </Col>
    </Grid>
  ])
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');
  let artJSON = require('../components/art.json');

  let prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  let minProdNFTS = prodNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  let stagingNFTS = artJSON.staging.map(item => require(`../components/assets/${item.name}.json`));
  let minStagingNFTS = stagingNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  return {
    props: {
      minProdNFTS,
      minStagingNFTS,
      config,
    }
  };
};

export default Home
