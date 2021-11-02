import { useMemo } from 'react';
import { appWithTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic'
import Link from 'next/link';
import Head from 'next/head'
import { useTranslation } from 'next-i18next';
import { CacheProvider } from '@emotion/react';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const Grid = dynamic(() => import('@mui/material/Grid'));
const Container = dynamic(() => import('@mui/material/Container'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Divider = dynamic(() => import('@mui/material/Divider'));
const TwitterIcon = dynamic(() => import('@mui/icons-material/Twitter'));
const Button = dynamic(() => import('@mui/material/Button'));
const Nav = dynamic(() => import('../components/Nav'));

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import { useTheme } from '../components/states';
import createEmotionCache from '../src/createEmotionCache';
import config from "../components/config.json";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { t } = useTranslation('nav');
  const [theme, setTheme] = useTheme();

  let defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      mode: theme
    },
  });

  const navMemo = useMemo(() => <Grid item xs={12}><Nav /></Grid>, []);

  const footer = useMemo(() => ([
    <Grid item xs={12} key={"footer 0"} sx={{textAlign: 'center'}}>
      <Divider/>
    </Grid>,
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
        {t('footer_3')}<Link href={"https://nextjs.org/"} passHref><a sx={{color: 'text.primary'}}>Next.js</a></Link>{t('footer_4')}<Link href={"https://vercel.com"} passHref><a sx={{color: 'text.primary'}}>Vercel</a></Link>
      </Typography>
      <Divider style={{marginTop: '10px', marginBottom: '10px'}} />
      <Button
        sx={{mr: '5px', float: 'left'}}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        size="small"
        variant="contained"
        href={`https://twitter.com/${config.twitter}`}
      >
        <TwitterIcon />
      </Button>
    </Grid>,
    <Grid item xs={12} sm={2} key={"footer 2"}>
      <Typography variant="h6">
        {config.title}
      </Typography>
      <Link href={"/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link1')}
        </a>
      </Link>
      <br/>
      <Link href={"/gallery"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link2')}
        </a>
      </Link>
      <br/>
      <Link href={"/listings"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link3')}
        </a>
      </Link>
      <br/>
      <Link href={"/search"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link4')}
        </a>
      </Link>
      <br/>
      <Link href={"/news"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link9')}
        </a>
      </Link>
      <br/>
      <Link href={"/about"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link5')}
        </a>
      </Link>
      <br/>
      <Link href={"/settings"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link8')}
        </a>
      </Link>
      <br/>
      <Link href={"/viewers"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link7')}
        </a>
      </Link>
      <br/>
      <Link href={"/license"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          {t('link6')}
        </a>
      </Link>
    </Grid>,
    <Grid item xs={12} sm={2} key={"footer 3"}>
      <Typography variant="h6">
        {t('footer_links')}
      </Typography>
      <Link href={"https://bitshares.org/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          Bitshares.org
        </a>
      </Link>
      <br/>
      <Link href={"https://github.com/bitshares"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          GitHub
        </a>
      </Link>
      <br/>
      <Link href={"https://bitsharestalk.org/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          Forum
        </a>
      </Link>
      <Typography variant="h6">
        {t('footer_wallets')}
      </Typography>
      <Link href={"https://wallet.bitshares.org"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          Bitshares.org
        </a>
      </Link>
      <br/>
      <Link href={"https://ex.xbts.io/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          XBTS.io
        </a>
      </Link>
      <br/>
      <Link href={"https://dex.iobanker.com/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          ioBanker DEX
        </a>
      </Link>
      <br/>
      <Link href={"https://www.gdex.io/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          GDEX.io
        </a>
      </Link>
    </Grid>,
    <Grid item xs={12} sm={2} key={"footer 4"}>
      <Typography variant="h6">
        {t('footer_markets')}
      </Typography>
      <Link href={"https://cryptoindex.org/coin/bitshares"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          CryptoIndex
        </a>
      </Link>
      <br/>
      <Link href={"https://www.coingecko.com/en/coins/bitshares"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          CoinGecko
        </a>
      </Link>
      <br/>
      <Link href={"https://coinmarketcap.com/currencies/bitshares/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          CoinMarketCap
        </a>
      </Link>
      <br/>
      <Link href={"https://www.worldcoinindex.com/coin/bitshares"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          WorldCoinIndex
        </a>
      </Link>
      <br/>
      <Link href={"https://coincodex.com/crypto/bitshares/"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          CoinCodex
        </a>
      </Link>
      <br/>
      <Link href={"https://nomics.com/assets/bts-bitshares"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          Nomics
        </a>
      </Link>
      <br/>
      <Link href={"https://bitgur.com/coin/BTS"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          Bitgur
        </a>
      </Link>
      <br/>
      <Link href={"https://messari.io/asset/bitshares"} passHref>
        <a sx={{color: 'text.primary', textDecoration: 'none'}}>
          Messari
        </a>
      </Link>
    </Grid>
  ]), [t])

  return (
    <CacheProvider value={emotionCache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline/>
          <Head>
            <meta name="theme-color" content={defaultTheme.palette.primary.main} />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
            <meta charSet="utf-8" />
            <meta property="og:type" content="website" />
            <meta property="twitter:card" content="summary" key="twcard" />
          </Head>

          <div styles={{flexGrow: 1}}>
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                {navMemo}

                <Grid item xs={12}>
                  <Component {...pageProps} />
                </Grid>

                {footer}
              </Grid>
            </Container>
          </div>

        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp)

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
