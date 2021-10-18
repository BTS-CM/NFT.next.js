import { useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout';

import ReactGA from 'react-ga4';
ReactGA.initialize('G-CTZ1V9EXWY');

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

function About() {
  const { t } = useTranslation('about');
  const classes = useStyles();

  useEffect(() => {
    ReactGA.pageview('About')
  }, []);

  return (
    <Layout
      description={'Learn more about the NFTEA gallery'}
      title={'About'}
      siteTitle={'NFTEA Gallery'}
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['about', 'nav']),
  },
})

export default About
