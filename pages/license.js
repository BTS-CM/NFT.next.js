import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core'
const SEO = dynamic(() => import('../components/SEO'));

import config from '../components/config.json';
import { useAnalytics } from '../components/states';

function License(properties) {
  const { t } = useTranslation('license');

  let [analytics, setAnalytics] = useAnalytics();
  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('License')
    }
  }, [analytics]);

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <Grid grow>
      <Col span={12} key={"Index featured NFT"}>
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
  );
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
