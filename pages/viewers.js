import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Grid = dynamic(() => import('@material-ui/core/Grid'));
const Paper = dynamic(() => import('@mui/material/Paper'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Button = dynamic(() => import('@mui/material/Button'));
const Layout = dynamic(() => import('../components/Layout'));

import { makeStyles } from '@material-ui/core/styles';
import { useAnalytics } from '../components/states';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function Viewers(properties) {
  const classes = useStyles();
  const { t } = useTranslation('viewers');
  const config = properties.config;

  let [analytics, setAnalytics] = useAnalytics();
  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Other galleries');
    }
  }, [analytics]);

  return (
    <Layout
      description={t('header_description')}
      title={t('header_title')}
      siteTitle={config.title}
    >
      <Grid item xs={12} key={"Viewer grid"}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5">
            {t('nft.header')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('nft.body')}
          </Typography>
          <Link href={`https://artcasa.gallery/`} passHref>
            <Button size="small" className={classes.button} variant="contained">ArtCASA</Button>
          </Link>
          <Link href={`https://alguienalli.github.io/`} passHref>
            <Button size="small" className={classes.button} variant="contained">Alguien&apos;s Bitshares NFT Explorer</Button>
          </Link>
        </Paper>
      </Grid>
      <Grid item xs={12} key={"Viewer grid"}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5">
            {t('blockchain.header')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('blockchain.body')}
          </Typography>
          <Link href={`https://wallet.bitshares.org/#/explorer/assets`} passHref>
            <Button size="small" className={classes.button} variant="contained">Bitshares.org</Button>
          </Link>
          <Link href={`https://ex.xbts.io/explorer/assets`} passHref>
            <Button size="small" className={classes.button} variant="contained">XBTS.io</Button>
          </Link>
          <Link href={`https://dex.iobanker.com/explorer/assets`} passHref>
            <Button size="small" className={classes.button} variant="contained">ioBanker DEX</Button>
          </Link>
          <Link href={`https://www.gdex.io/explorer/assets`} passHref>
            <Button size="small" className={classes.button} variant="contained">GDEX.io</Button>
          </Link>
          <Link href={`https://bts.ai/`} passHref>
            <Button size="small" className={classes.button} variant="contained">BTS.AI</Button>
          </Link>
          <Link href={`https://api.testnet.bitshares.ws/docs`} passHref>
            <Button size="small" className={classes.button} variant="contained">Insight</Button>
          </Link>
          <Link href={`https://cryptofresh.com`} passHref>
            <Button size="small" className={classes.button} variant="contained">cryptofresh</Button>
          </Link>
        </Paper>
      </Grid>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');

  return {
    props: {
      config: config,
      ...await serverSideTranslations(locale, ['viewers', 'nav']),
    }
  }
}

export default Viewers
