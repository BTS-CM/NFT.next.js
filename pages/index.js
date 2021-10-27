import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ReactGA from 'react-ga4';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


import CarouselElement from "../components/Carousel";
import Layout from '../components/Layout';
import artJSON from '../components/art.json';
import config from '../components/config.json';
import { useEnvironment, useAnalytics } from '../components/states';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  featured: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2)
  },
  leftPaper: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  rightPaper: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  stats: {
    marginBottom: theme.spacing(2),
  },
  left: {
    marginRight: theme.spacing(1),
  },
  center: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  right: {
    marginLeft: theme.spacing(1)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  a: {
    color: theme.palette.text.secondary,
    textDecoration: 'none'
  },
  textLink: {
    color: theme.palette.text.primary
  },
  button: {
    margin: theme.spacing(1)
  },
  stat: {
    margin: theme.spacing(1)
  }
}));

function diff_years(dt2, dt1) {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));

}

function Home() {

  const classes = useStyles();
  const { t } = useTranslation('mainpage');
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';

  const art = artJSON && artJSON[env] ? artJSON[env] : [];

  let genesis = new Date(2013,6,2);
  let now = new Date();

  let [analytics, setAnalytics] = useAnalytics();
  useEffect(() => {
    if (analytics && config.google_analytics.length) {
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Index');
    }
  }, [analytics]);

  return (
    <Layout
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config ? config.title : ''}
    >
      <Grid container style={{'maxWidth': '100%'}} key="index">
        <Grid item xs={12} key={"Index featured NFT"} className={classes.featured}>
            <Typography gutterBottom variant="h5" color="textSecondary">
              {t("mainpage:featured")}
            </Typography>
            <CarouselElement art={art} featured={true} />
        </Grid>

        <Grid item xs={12} sm={6} key={"Trading"}>
          <Paper className={classes.leftPaper}>
            <Typography gutterBottom variant="h5" color="textSecondary">
              {t("mainpage:traders.header")}
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
              {t("mainpage:traders.body1a")}<a className={classes.textLink} href="https://how.bitshares.works/en/master/user_guide/create_account.html">{t("mainpage:traders.a1")}</a>{t("mainpage:traders.body1b")}
            </Typography>
            <a href={`https://wallet.bitshares.org`}>
              <Button size="small" className={classes.button} variant="contained">Bitshares.org</Button>
            </a>
            <a href={`https://ex.xbts.io/`}>
              <Button size="small" className={classes.button} variant="contained">XBTS.io</Button>
            </a>
            <a href={`https://dex.iobanker.com/`}>
              <Button size="small" className={classes.button} variant="contained">ioBanker DEX</Button>
            </a>
            <a href={`https://www.gdex.io/`}>
              <Button size="small" className={classes.button} variant="contained">GDEX.io</Button>
            </a>
            <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
              <Button size="small" className={classes.button} variant="contained">{t("mainpage:traders.a2")}</Button>
            </a>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} key={"BTS_Info"}>
          <Paper className={classes.leftPaper}>
            <Typography gutterBottom variant="h5" color="textSecondary">
              {t("mainpage:benefits.header")}
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
              {t("mainpage:benefits.body1")}<a className={classes.textLink} href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t("mainpage:benefits.a1")}</a>.
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
              {t("mainpage:benefits.body2")}<a className={classes.textLink} href="https://how.bitshares.works/en/master/technology/dpos.html">{t("mainpage:benefits.a2")}</a>.
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
              {t("mainpage:benefits.body3")}<a className={classes.textLink} href="https://how.bitshares.works/en/master/technology/bitshares_features.html#industrial-performance-and-scalability">{t("mainpage:benefits.a3")}</a>;{t("mainpage:benefits.body4")}
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['gallery', 'mainpage', 'nav']),
  },
})

export default Home
