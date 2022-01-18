import { useEffect } from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';

const SEO = dynamic(() => import('../components/SEO'));
import config from '../components/config.json';
import { useAnalytics, useApproval } from '../components/states';

import { analyticsNotification } from '../lib/analyticsNotification';

function License(properties) {
  const { t } = useTranslation();

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
      description={t('license.header_description', {title: config.title})}
      title={t('license.header_title')}
      siteTitle={config.title}
      key={'SEO'}
    />,
    <Grid grow key={"License"}>
      <Col span={12}>
        <Paper padding="md" shadow="xs">
          <Text>
            {t('license.type')}
          </Text>
          <Text>
            {t('license.copyright')}
          </Text>
          <Text>
            {t('license.permission')}
          </Text>
          <Text>
            {t('license.notice')}
          </Text>
          <Text>
            {t('license.disclaimer')}
          </Text>
          <Text>
            <a sx={{color: 'text.secondary'}} href="https://github.com/BTS-CM/NFT.next.js">{t('license.repo')}</a>
          </Text>
        </Paper>
      </Col>
    </Grid>
  ]);
}

export default License;
