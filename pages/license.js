import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';
const SEO = dynamic(() => import('../components/SEO'));

import config from '../components/config.json';
import { useAnalytics, useApproval } from '../components/states';
import { analyticsNotification } from '../lib/analyticsNotification';

function License(properties) {
  const { t } = useTranslation('license');

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
        ReactGA.pageview('License')
      }
    }
    sendAnalytics();
  }, [analytics]);

  return ([
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
      key={'SEO'}
    />,
    <Grid grow key={"License"}>
      <Col span={12}>
        <Paper padding="md" shadow="xs">
          <Text>
            {t('type')}
          </Text>
          <Text>
            {t('copyright')}
          </Text>
          <Text>
            {t('permission')}
          </Text>
          <Text>
            {t('notice')}
          </Text>
          <Text>
            {t('disclaimer')}
          </Text>
          <Text>
            <a sx={{color: 'text.secondary'}} href="https://github.com/BTS-CM/NFT.next.js">{t('repo')}</a>
          </Text>
        </Paper>
      </Col>
    </Grid>
  ]);
}

export const getStaticProps = async ({ locale }) => {
  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      ...(await serverSideTranslations(locale, ['license', 'nav'])),
    }
  }
}

export default License;
