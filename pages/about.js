import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Paper = dynamic(() => import('@mui/material/Paper'));
const Layout = dynamic(() => import('../components/Layout'));

import { useAnalytics } from '../components/states';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  a: {
    color: theme.palette.text.secondary
  }
}));

function About(properties) {
  const { t } = useTranslation('about');
  const classes = useStyles();
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
    <Layout
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    >
      <Paper className={classes.paper}>
        <p>
          {t('p1')}<a className={classes.a} href="https://bitshares.org">{t('a1')}</a>
        </p>
        <p>
          {t('p2')}<a className={classes.a} href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification">{t('a2')}</a>.{t('p3')}
        </p>
        <p>
          {t('p4')}<a className={classes.a} href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t('a3')}</a>. {t('p5')}.
        </p>
      </Paper>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => {

  const config = require('../components/config.json');

  return {
    props: {
      config: config,
      ...await serverSideTranslations(locale, ['about', 'nav']),
    }
  }
}

export default About
