import { useEffect, useMemo } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { FixedSizeList as List } from 'react-window';
import useMediaQuery from '@mui/material/useMediaQuery';
import {isMobile} from 'react-device-detect';

const Paper = dynamic(() => import('@mui/material/Paper'));
const Table = dynamic(() => import('@mui/material/Table'));
const TableBody = dynamic(() => import('@mui/material/TableBody'));
const TableContainer = dynamic(() => import('@mui/material/TableContainer'));
const TableHead = dynamic(() => import('@mui/material/TableHead'));
const TableRow = dynamic(() => import('@mui/material/TableRow'));
import TableCell from '@mui/material/TableCell';

const Grid = dynamic(() => import('@mui/material/Grid'));
const NFTCard = dynamic(() => import('../components/NFTCard'));
const SEO = dynamic(() => import('../components/SEO'));
import { useEnvironment, useAnalytics } from '../components/states';

function chunkify(cards) {
  let cardChunks = [];
  let chunk = [];
  let itr = 0;
  for (let i = 0; i < cards.length; i++) {
    if (itr < 3) {
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

  let minProdDesktop = props.minProdDesktop;
  let minStagingDesktop = props.minStagingDesktop;
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
          <TableRow style={style} key={`tr ${index}`}>
            <TableCell component="td" scope="row">
              {
                currentRow[0]
                  ? <NFTCard smSize={4} nft={currentRow[0]} key={currentRow[0].symbol + "_card"} />
                  : null
              }
            </TableCell>
            <TableCell component="td" scope="row">
              {
                currentRow[1]
                  ? <NFTCard smSize={4} nft={currentRow[1]} key={currentRow[1].symbol + "_card"} />
                  : null
              }
            </TableCell>
            <TableCell component="td" scope="row">
              {
                currentRow[2]
                  ? <NFTCard smSize={4} nft={currentRow[2]} key={currentRow[2].symbol + "_card"} />
                  : null
              }
            </TableCell>
          </TableRow>
        );
      }

      return (
        <TableRow style={style} key={`tr ${index}`}>
          <TableCell component="td" scope="row">
            {
              currentRow
                ? <NFTCard smSize={4} nft={currentRow} key={currentRow.symbol + "_card"} />
                : null
            }
          </TableCell>
        </TableRow>
      );
    }

    return (
        <List
          className="List"
          height={1024}
          itemCount={nfts.length}
          itemSize={isMobile ? 500 : 550}
          width={isMobile ? 350 : 1200}
        >
          {Row}
        </List>
      );
  }, [nfts]);

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config ? config.title: ''}
    />,
    <Grid container style={{'maxWidth': '100%'}} key="gallery grid">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {
              galleryCards
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
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
