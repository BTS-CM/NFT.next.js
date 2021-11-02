import { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { isMobile, isIOS, isSafari, isMobileSafari } from 'react-device-detect';

const Grid = dynamic(() => import('@mui/material/Grid'));
const Paper = dynamic(() => import('@mui/material/Paper'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Card = dynamic(() => import('@mui/material/Card'));
const CardContent = dynamic(() => import('@mui/material/CardContent'));
const Button = dynamic(() => import('@mui/material/Button'));

const SEO = dynamic(() => import('../components/SEO'));
const CarouselElement = dynamic(() => import('../components/Carousel'));

import { useEnvironment, useAnalytics } from '../components/states';

function Home(props) {

  const { t } = useTranslation('mainpage');
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';

  let config = props.config;
  let nfts = env === 'production' ? props.minProdNFTS : props.minStagingNFTS;

  let [analytics, setAnalytics] = useAnalytics();

  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Index');
    }
  }, [analytics]);

  const carouselMemo = useMemo(() => <CarouselElement nfts={nfts} isMobile={isMobile} isApple={isIOS || isSafari || isMobileSafari} />, [nfts]);

  const trading = useMemo(() => (
                    <Grid item xs={12} sm={6} key={"Trading"}>
                      <Paper sx={{ p: 2, mr: 1, mb: 2, textAlign: 'center', color: 'text.secondary'}}>
                        <Typography gutterBottom variant="h5" color="textSecondary">
                          {t("mainpage:traders.header")}
                        </Typography>
                        <Typography variant="body1" gutterBottom color="textSecondary">
                          {t("mainpage:traders.body1a")}<a sx={{color: 'text.primary'}} href="https://how.bitshares.works/en/master/user_guide/create_account.html">{t("mainpage:traders.a1")}</a>{t("mainpage:traders.body1b")}
                        </Typography>
                        <a href={`https://wallet.bitshares.org`}>
                          <Button size="small" sx={{m: 1}} variant="outlined">Bitshares.org</Button>
                        </a>
                        <a href={`https://ex.xbts.io/`}>
                          <Button size="small" sx={{m: 1}} variant="outlined">XBTS.io</Button>
                        </a>
                        <a href={`https://dex.iobanker.com/`}>
                          <Button size="small" sx={{m: 1}} variant="outlined">ioBanker DEX</Button>
                        </a>
                        <a href={`https://www.gdex.io/`}>
                          <Button size="small" sx={{m: 1}} variant="outlined">GDEX.io</Button>
                        </a>
                        <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
                          <Button size="small" sx={{m: 1}} variant="outlined">{t("mainpage:traders.a2")}</Button>
                        </a>
                      </Paper>
                    </Grid>
                  ), [t]);

  const tips = useMemo(() => (
    <Grid item xs={12} sm={6} key={"BTS_Info"}>
      <Paper sx={{ p: 2, mr: 1, mb: 2, textAlign: 'center', color: 'text.secondary'}}>
        <Typography gutterBottom variant="h5" color="textSecondary">
          {t("mainpage:benefits.header")}
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t("mainpage:benefits.body1")}<a sx={{color: 'text.primary'}} href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t("mainpage:benefits.a1")}</a>.
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t("mainpage:benefits.body2")}<a sx={{color: 'text.primary'}} href="https://how.bitshares.works/en/master/technology/dpos.html">{t("mainpage:benefits.a2")}</a>.
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t("mainpage:benefits.body3")}<a sx={{color: 'text.primary'}} href="https://how.bitshares.works/en/master/technology/bitshares_features.html#industrial-performance-and-scalability">{t("mainpage:benefits.a3")}</a>;{t("mainpage:benefits.body4")}
        </Typography>
      </Paper>
    </Grid>
  ), [t])

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config ? config.title : ''}
    />,
    <Grid container style={{'maxWidth': '100%'}} key="index">
      <Grid
        item
        xs={12}
        key={"Index featured NFT"}
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          marginBottom: 2
        }}
      >
        <Typography gutterBottom variant="h5" color="textSecondary">
          {t("mainpage:featured")}
        </Typography>
        {carouselMemo}
      </Grid>

      {trading}

      {tips}

    </Grid>
  )
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');
  let artJSON = require('../components/art.json');

  let prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  let minProdNFTS = prodNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  let stagingNFTS = artJSON.staging.map(item => require(`../components/assets/${item.name}.json`));
  let minStagingNFTS = stagingNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      minProdNFTS,
      minStagingNFTS,
      config,
      ...(await serverSideTranslations(locale, ['gallery', 'mainpage', 'nav'])),
    }
  };
};

export default Home
