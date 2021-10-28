// components/Layout.js
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles';
import { useTheme, useLanguage, useAnalytics } from './states';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const Grid = dynamic(() => import('@material-ui/core/Grid'));
const Container = dynamic(() => import('@material-ui/core/Container'));
const CssBaseline = dynamic(() => import('@material-ui/core/CssBaseline'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Divider = dynamic(() => import('@mui/material/Divider'));
const TwitterIcon = dynamic(() => import('@material-ui/icons/Twitter'));
const Button = dynamic(() => import('@material-ui/core/Button'));
const Nav = dynamic(() => import('./Nav'));

import config from "./config.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  a: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  a2: {
    color: theme.palette.text.primary,
  },
}));

function Layout({ description, title, siteTitle, imageURL, children }) {
  const classes = useStyles();
  const { t } = useTranslation('nav');

  const [theme, setTheme] = useTheme();
  const [language, setLanguage] = useLanguage();
  const [analytics, setAnalytics] = useAnalytics();

  const themeMemo = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: theme,
        },
      }),
    [theme],
  );

  return (
    <>
      <html lang="en">
        <Head>
          <title>{`${title} | ${siteTitle}`}</title>
          <meta name="description" content={description} />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="./favicon.ico" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
          <meta charSet="utf-8" />
          <meta httpEquiv="content-language" content={language ? language : 'en'} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={siteTitle} />
          <meta property="twitter:card" content="summary" key="twcard" />
          <meta property="twitter:title" content={title} />
          <meta name="twitter:site" content={`@${config ? config.twitter : ''}`} />
          <meta name="twitter:creator" content={`@${config ? config.twitter : ''}`} />
          <meta property="twitter:description" content={description} />
          <meta name="twitter:image" content={imageURL} />
          <meta property="og:image" content={imageURL} />
        </Head>
        <body>
          <ThemeProvider theme={themeMemo}>
            <CssBaseline/>
            <div className={classes.root}>
              <Container maxWidth="lg">
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Nav />
                  </Grid>

                  <Grid item xs={12}>
                    <main>{children}</main>
                  </Grid>

                  <Grid item xs={12} key={"footer 0"} style={{textAlign: 'center'}}>
                    <Divider/>
                  </Grid>

                  <Grid item xs={12} sm={6} key={"footer 1"}>
                    <Typography variant="h6">
                      {config.title}
                    </Typography>
                    <Typography variant="body1">
                      {t('footer_1')}
                    </Typography>
                    <Typography variant="body2">
                      {t('footer_2')}
                    </Typography>
                    <Typography variant="body2">
                      {t('footer_3')}<Link href={"https://nextjs.org/"} passHref><a className={classes.a2}>Next.js</a></Link>{t('footer_4')}<Link href={"https://vercel.com"} passHref><a className={classes.a2}>Vercel</a></Link>
                    </Typography>
                    <Divider style={{marginTop: '10px', marginBottom: '10px'}} />
                    <Button
                      style={{'marginRight': '5px', 'float': 'left'}}
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      size="small"
                      variant="contained"
                      href={`https://twitter.com/${config.twitter}`}
                    >
                      <TwitterIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2} key={"footer 2"}>
                    <Typography variant="h6">
                      {config.title}
                    </Typography>
                    <Link href={"/"} passHref>
                      <a className={classes.a}>
                        {t('link1')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/gallery"} passHref>
                      <a className={classes.a}>
                        {t('link2')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/listings"} passHref>
                      <a className={classes.a}>
                        {t('link3')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/search"} passHref>
                      <a className={classes.a}>
                        {t('link4')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/news"} passHref>
                      <a className={classes.a}>
                        {t('link9')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/about"} passHref>
                      <a className={classes.a}>
                        {t('link5')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/settings"} passHref>
                      <a className={classes.a}>
                        {t('link8')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/viewers"} passHref>
                      <a className={classes.a}>
                        {t('link7')}
                      </a>
                    </Link>
                    <br/>
                    <Link href={"/license"} passHref>
                      <a className={classes.a}>
                        {t('link6')}
                      </a>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={2} key={"footer 3"}>
                    <Typography variant="h6">
                      {t('footer_links')}
                    </Typography>
                    <Link href={"https://bitshares.org/"} passHref>
                      <a className={classes.a}>
                        Bitshares.org
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://github.com/bitshares"} passHref>
                      <a className={classes.a}>
                        GitHub
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://bitsharestalk.org/"} passHref>
                      <a className={classes.a}>
                        Forum
                      </a>
                    </Link>
                    <Typography variant="h6">
                      {t('footer_wallets')}
                    </Typography>
                    <Link href={"https://wallet.bitshares.org"} passHref>
                      <a className={classes.a}>
                        Bitshares.org
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://ex.xbts.io/"} passHref>
                      <a className={classes.a}>
                        XBTS.io
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://dex.iobanker.com/"} passHref>
                      <a className={classes.a}>
                        ioBanker DEX
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://www.gdex.io/"} passHref>
                      <a className={classes.a}>
                        GDEX.io
                      </a>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={2} key={"footer 4"}>
                    <Typography variant="h6">
                      {t('footer_markets')}
                    </Typography>
                    <Link href={"https://cryptoindex.org/coin/bitshares"} passHref>
                      <a className={classes.a}>
                        CryptoIndex
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://www.coingecko.com/en/coins/bitshares"} passHref>
                      <a className={classes.a}>
                        CoinGecko
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://coinmarketcap.com/currencies/bitshares/"} passHref>
                      <a className={classes.a}>
                        CoinMarketCap
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://www.worldcoinindex.com/coin/bitshares"} passHref>
                      <a className={classes.a}>
                        WorldCoinIndex
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://coincodex.com/crypto/bitshares/"} passHref>
                      <a className={classes.a}>
                        CoinCodex
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://nomics.com/assets/bts-bitshares"} passHref>
                      <a className={classes.a}>
                        Nomics
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://bitgur.com/coin/BTS"} passHref>
                      <a className={classes.a}>
                        Bitgur
                      </a>
                    </Link>
                    <br/>
                    <Link href={"https://messari.io/asset/bitshares"} passHref>
                      <a className={classes.a}>
                        Messari
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </ThemeProvider>

        </body>
      </html>
    </>
  )
}

export default Layout;
