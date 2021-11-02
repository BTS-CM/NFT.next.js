import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('@mui/material/Grid'));
const Paper = dynamic(() => import('@mui/material/Paper'));
import { FixedSizeList as ReactList } from 'react-window';

import { useEnvironment } from './states';
const { getImage } = require("../components/images");

function List(properties) {

  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
  let isMobile = properties.isMobile;

  let nfts = env === 'production'
              ? properties.minProdNFTS
              : properties.minStagingNFTS;

  const Row = ({ index, style }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
    });
    const isApple = properties.isApple;

    let currentRow = nfts[index];
    const symbol = currentRow ? currentRow.symbol : undefined;
    let type = currentRow ? currentRow.type : undefined;
    let fileType = currentRow ? currentRow.fileType : undefined;
    let title = currentRow ? currentRow.title : undefined;
    let artist = currentRow ? currentRow.artist : undefined;
    let encoding = currentRow ? currentRow.encoding : undefined;
    let id = currentRow ? currentRow.id : undefined;

    let imageComponent = undefined;
    if (isApple) {
      imageComponent = <img
                          src={`/images/${symbol}/0_thumb.webp`}
                          key={`${symbol} apple thumbnail`}
                          alt={`${symbol} apple thumbnail`}
                        />;
    } else {
      let imageSRC = null;
      try {
        imageSRC = require(`../public/images/${symbol}/0_thumb.webp`);
      } catch (error) {
      }

      if (imageSRC) {
        imageComponent = <Image
                            key={`${symbol} thumbnail`}
                            alt={`${symbol} thumbnail`}
                            effect="blur"
                            width={128}
                            height={128}
                            src={imageSRC}
                          />;
      }
    }

    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        component={Paper}
        style={style}
        key={`tr ${symbol}`}
      >
        <Grid item xs={3}>
          <Link href={`/nft/${symbol}`} key={`/nft/${symbol}/img`} passHref>
            <a>
              {imageComponent}
            </a>
          </Link>
        </Grid>
        <Grid item xs={3}>
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>
                {`"${title}" by ${artist}`}
              </a>
            </Link>
        </Grid>
        <Grid item xs={3}>
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>
                {`${fileType ? fileType : ''} (${encoding})`}
              </a>
            </Link>
        </Grid>
        <Grid item xs={3}>
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>
                {`${symbol} (ID: ${id})`}
              </a>
            </Link>
        </Grid>
      </Grid>
    );
  }

  return (
    <ReactList
      className="List"
      height={1024}
      itemCount={nfts.length}
      itemSize={175}
      width={isMobile ? 350 : 1150}
    >
      {Row}
    </ReactList>
  );
}

export default List
