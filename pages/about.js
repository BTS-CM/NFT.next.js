import { useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useNotifications } from '@mantine/notifications';

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";

import { Text, Center, Grid, Col, Button, Paper, ActionIcon } from '@mantine/core'

import { analyticsNotification } from '../lib/analyticsNotification';

const SEO = dynamic(() => import('../components/SEO'));
import { useAnalytics, useApproval } from '../components/states';

function About(properties) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const config = properties.config;
  const notifications = useNotifications();

  let [analytics, setAnalytics] = useAnalytics();
  let [approval, setApproval] = useApproval();

  useEffect(() => {

    async function sendAnalytics() {
      if (approval === "request") {
        analyticsNotification(notifications, setApproval, setAnalytics)
      }

      if (analytics && config.google_analytics.length) {
        const ReactGA = (await import('react-ga4')).default
        ReactGA.initialize(config.google_analytics);
        ReactGA.pageview('About')
      }
    }
    sendAnalytics();

  }, [analytics]);

  const trading = useMemo(() => (
                    <Col span={6} xs={12} sm={6} md={6} lg={6} key={"Trading"}>
                      <Center>
                        <Paper padding="md" shadow="sm" withBorder sx={{textAlign: 'center'}}>
                          <Text size="lg">
                            {t("mainpage.traders.header")}
                          </Text>
                          <Text size="md">
                            {t("mainpage.traders.body1a")}<a href="https://how.bitshares.works/en/master/user_guide/create_account.html">{t("mainpage.traders.a1")}</a>{t("mainpage.traders.body1b")}
                          </Text>
                          <a href={`https://wallet.bitshares.org`}>
                            <Button sx={{margin: "5px"}} variant="outline">Bitshares.org</Button>
                          </a>
                          <a href={`https://ex.xbts.io/`}>
                            <Button sx={{margin: "5px"}} variant="outline">XBTS.io</Button>
                          </a>
                          <a href={`https://dex.iobanker.com/`}>
                            <Button sx={{margin: "5px"}} variant="outline">ioBanker DEX</Button>
                          </a>
                          <a href={`https://www.gdex.io/`}>
                            <Button sx={{margin: "5px"}} variant="outline">GDEX.io</Button>
                          </a>
                          <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
                            <Button sx={{margin: "5px"}} variant="outline">{t("mainpage.traders.a2")}</Button>
                          </a>
                        </Paper>
                      </Center>
                    </Col>
                  ), [t]);

  const tips = useMemo(() => (
    <Col span={12} xs={12} sm={12} md={6} lg={6} key={"BTS_Info"}>
      <Center>
        <Paper padding="md" shadow="sm" withBorder sx={{textAlign: 'center'}}>
          <Text size="lg">
            {t("mainpage.benefits.header")}
          </Text>
          <Text size="md">
            {t("mainpage.benefits.body1")}<a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t("mainpage.benefits.a1")}</a>.
          </Text>
          <Text size="md">
            {t("mainpage.benefits.body2")}<a href="https://how.bitshares.works/en/master/technology/dpos.html">{t("mainpage.benefits.a2")}</a>.
          </Text>
          <Text size="md">
            {t("mainpage.benefits.body3")}<a href="https://how.bitshares.works/en/master/technology/bitshares_features.html#industrial-performance-and-scalability">{t("mainpage.benefits.a3")}</a>;{t("mainpage.benefits.body4")}
          </Text>
        </Paper>
      </Center>
    </Col>
  ), [t])

  return ([
    <SEO
      description={t('about.header_description', {title: config.title})}
      title={t('about.header_title')}
      siteTitle={config.title}
      key={'SEO'}
    />,
    <Grid key={"about"} grow>
      <Col span={12}>
        <Paper padding="md" shadow="xs">
          <Text size="lg">
            About Bitshares NFTs
          </Text>
          <Text>
            {t('about.p1')}<a href="https://bitshares.org">{t('about.a1')}</a>
          </Text>
          <Text>
            {t('about.p2')}<a href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification">{t('about.a2')}</a>.{t('about.p3')}
          </Text>
          <Text>
            {t('about.p4')}<a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t('about.a3')}</a>. {t('about.p5')}.
          </Text>
        </Paper>
      </Col>
    </Grid>,
    <Grid grow key={"tips"}>
      {trading ? trading : undefined}
      {tips ? tips : undefined}
    </Grid>
  ]);
}

export const getStaticProps = async ({ locale }) => {

  const config = require('../components/config.json');

  return {
    props: {
      config: config,
    }
  };
}

export default About
