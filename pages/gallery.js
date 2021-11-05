import { useEffect, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { FixedSizeList as ReactList } from 'react-window';
import { isMobile, isIOS, isSafari, isMobileSafari } from 'react-device-detect';

const Paper = dynamic(() => import('@mui/material/Paper'));
const Grid = dynamic(() => import('@mui/material/Grid'));
const GalleryCard = dynamic(() => import('../components/GalleryCard'));
const SEO = dynamic(() => import('../components/SEO'));
import { useEnvironment, useAnalytics } from '../components/states';

function Gallery(props) {
  const { t } = useTranslation('gallery');
  let [analytics, setAnalytics] = useAnalytics();

  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Gallery')
    }
  }, [analytics]);

  let config = props.config;
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
  let nfts;
  if (env === 'production') {
    nfts = isMobile ? props.minProdNFTS : props.minProdDesktop;
  } else {
    nfts = isMobile ? props.minStagingNFTS : props.minStagingDesktop;
  }

  let galleryCards = useMemo(() => {

    const Row = ({ index, style }) => {
      let currentRow = nfts[index];
      if (!isMobile) {
        return (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={style}
            key={`tr 3 ${index}`}
          >
            <Grid item xs={3}>
              {
                currentRow[0]
                  ? <GalleryCard nft={currentRow[0]} key={currentRow[0].symbol + "_card"} isApple={isIOS || isSafari || isMobileSafari} />
                  : null
              }
            </Grid>
            <Grid item xs={3}>
              {
                currentRow[1]
                  ? <GalleryCard nft={currentRow[1]} key={currentRow[1].symbol + "_card"} isApple={isIOS || isSafari || isMobileSafari} />
                  : null
              }
            </Grid>
            <Grid item xs={3}>
              {
                currentRow[2]
                  ? <GalleryCard nft={currentRow[2]} key={currentRow[2].symbol + "_card"} isApple={isIOS || isSafari || isMobileSafari} />
                  : null
              }
            </Grid>
            <Grid item xs={3}>
              {
                currentRow[3]
                  ? <GalleryCard nft={currentRow[3]} key={currentRow[3].symbol + "_card"} isApple={isIOS || isSafari || isMobileSafari} />
                  : null
              }
            </Grid>
          </Grid>
        );
      }

      return (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          component={Paper}
          style={style}
          key={`tr ${currentRow.symbol}`}
        >
          <Grid item xs={12}>
            {
              currentRow
                ? <GalleryCard smSize={4} nft={currentRow} key={currentRow.symbol + "_card"} isApple={isIOS || isSafari || isMobileSafari} />
                : null
            }
          </Grid>
        </Grid>
      );
    }

    return (
        <ReactList
          className="List"
          height={1024}
          itemCount={nfts.length}
          itemSize={isMobile ? 500 : 420}
          width={isMobile ? 350 : 1200}
        >
          {Row}
        </ReactList>
      );
  }, [nfts]);

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config ? config.title: ''}
    />,
    galleryCards
  );
}

function chunkify(cards) {
  let cardChunks = [];
  let chunk = [];
  let itr = 0;
  for (let i = 0; i < cards.length; i++) {
    if (itr < 4) {
      chunk.push(cards[i]);
      itr += 1;
    } else {
      cardChunks.push(chunk);
      itr = 0;
      chunk = [];
    }
  }

  if (chunk.length) {
    cardChunks.push(chunk);
    chunk = [];
  }

  return cardChunks;
}

export const getStaticProps = async ({ locale }) => {
  let config = require('../components/config.json');
  let artJSON = require('../components/art.json');

  let prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  let minProdNFTS = prodNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      id: nft.id,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      market: nft.description.market,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  let stagingNFTS = artJSON.staging.map(item => require(`../components/assets/${item.name}.json`));
  let minStagingNFTS = stagingNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      id: nft.id,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      market: nft.description.market,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      minProdNFTS,
      minProdDesktop: chunkify(minProdNFTS),
      minStagingNFTS,
      minStagingDesktop: chunkify(minStagingNFTS),
      config,
      ...(await serverSideTranslations(locale, ['gallery', 'nft', 'nav'])),
    }
  };
}

export default Gallery
