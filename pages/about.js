import { useEffect } from "react";
import dynamic from 'next/dynamic';
import { useNotifications } from '@mantine/notifications';

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";

import { Text, Center, Grid, Col, Paper, ActionIcon } from '@mantine/core'

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
