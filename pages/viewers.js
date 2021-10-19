import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

import Layout from '../components/Layout';
import config from '../components/config.json';

import ReactGA from 'react-ga4';
ReactGA.initialize(config.google_analytics);

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

  useEffect(() => {
    ReactGA.pageview('Other galleries')
  }, []);

  return (
    <Layout
      description={`There are severeal Bitshares blockchain powered NFT galleries already, check them out!`}
      title={`Other Bitshares blockchain powered NFT galleries`}
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['viewers', 'nav']),
  },
})

export default Viewers
