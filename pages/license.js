import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const Typography = dynamic(() => import('@mui/material/Typography'));
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
    <Paper sx={{p: 2, textAlign: 'center', color: 'text.secondary'}}>
      <Typography variant="body1" gutterBottom color="textSecondary">
        {t('type')}
      </Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        {t('copyright')}
      </Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        {t('permission')}
      </Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        {t('notice')}
      </Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        {t('disclaimer')}
      </Typography>
      <Typography variant="body1" gutterBottom color="textPrimary">
        <a sx={{color: 'text.secondary'}} href="https://github.com/BTS-CM/NFT.next.js">{t('repo')}</a>
      </Typography>
    </Paper>
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
