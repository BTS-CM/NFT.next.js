import { useEffect } from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Text, Grid, Col, Paper, Group, Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { analyticsNotification } from '../lib/analyticsNotification';

const SEO = dynamic(() => import('../components/SEO'));
import { useAnalytics, useApproval } from '../components/states';

function Viewers(properties) {
  const { t } = useTranslation();
  const config = properties.config;

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
        ReactGA.pageview('Other galleries');
      }
    }
    sendAnalytics();
  }, [analytics]);

  return ([
    <SEO
      description={t('viewers.header_description')}
      title={t('viewers.header_title')}
      siteTitle={config.title}
      key={'SEO'}
    />,
    <Grid key={"Viewer grid 1"}>
      <Col span={12}>
        <Paper padding="lg" align="center">
          <Text size="lg">
            {t('viewers.nft.header')}
          </Text>
          <Text>
            {t('viewers.nft.body')}
          </Text>
          <Link href={`https://artcasa.gallery/`} passHref>
            <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline">ArtCASA</Button>
          </Link>
          <Link href={`https://alguienalli.github.io/`} passHref>
            <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline">Alguien&apos;s Bitshares NFT Explorer</Button>
          </Link>
        </Paper>
      </Col>
      <Col span={12}>
        <Paper padding="lg" align="center">
          <Text size="lg">
            {t('viewers.blockchain.header')}
          </Text>
          <Text>
            {t('viewers.blockchain.body')}
          </Text>
          <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline" href={`https://wallet.bitshares.org/#/explorer/assets`}>Bitshares.org</Button>
          <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline" href={`https://ex.xbts.io/explorer/assets`}>XBTS.io</Button>
          <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline" href={`https://dex.iobanker.com/explorer/assets`}>ioBanker DEX</Button>
          <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline" href={`https://www.gdex.io/explorer/assets`}>GDEX.io</Button>
          <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline" href={`https://bts.ai/`}>BTS.AI</Button>
          <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline" href={`https://api.testnet.bitshares.ws/docs`}>Insight</Button>
          <Button sx={{margin: '5px'}} component="a" size="sm" variant="outline" href={`https://cryptofresh.com`}>cryptofresh</Button>
        </Paper>
      </Col>
    </Grid>
  ]);
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');

  return {
    props: {
      config: config,
    }
  };
}

export default Viewers
