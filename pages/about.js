import { useEffect } from "react";
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const Paper = dynamic(() => import('@mui/material/Paper'));
const SEO = dynamic(() => import('../components/SEO'));
import { useAnalytics } from '../components/states';

function About(properties) {
  const { t } = useTranslation('about');
  const config = properties.config;

  let [analytics, setAnalytics] = useAnalytics();
  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('About')
    }
  }, [analytics]);

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <Paper sx={{p: 2, textAlign: 'center', color: 'text.secondary'}}>
      <p>
        {t('p1')}<a sx={{color: 'text.secondary'}} href="https://bitshares.org">{t('a1')}</a>
      </p>
      <p>
        {t('p2')}<a sx={{color: 'text.secondary'}} href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification">{t('a2')}</a>.{t('p3')}
      </p>
      <p>
        {t('p4')}<a sx={{color: 'text.secondary'}} href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t('a3')}</a>. {t('p5')}.
      </p>
    </Paper>
  );
}

export const getStaticProps = async ({ locale }) => {

  const config = require('../components/config.json');
  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      config: config,
      ...(await serverSideTranslations(locale, ['about', 'nav'])),
    }
  };
}

export default About
