import React, { useState } from 'react';
import Link from 'next/link';
import ReactGA from 'react-ga4';

import { LazyLoadImage  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import { useTranslation } from 'next-i18next';
import art from '../components/art.json';

const { getImage } = require("../components/images");

ReactGA.initialize('G-CTZ1V9EXWY');

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  a: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
}));

function ListRow (properties) {
  const classes = useStyles();

  let id = properties.id;
  const initAssetData = require(`./assets/${id}.json`);
  const [asset, setAsset] = useState(initAssetData ? initAssetData : undefined);

  const symbol = asset ? asset.symbol : undefined;
  const description = asset ? asset.description : undefined;
  const nft_object = description ? description.nft_object : undefined;

  let type = nft_object && nft_object.type ? nft_object.type : undefined;
  let title = nft_object && nft_object.title ? nft_object.title : undefined;
  let artist = nft_object && nft_object.artist ? nft_object.artist : undefined;
  let encoding = nft_object && nft_object.encoding ? nft_object.encoding : undefined;

  let {
    image,
    imgURL,
    fileType
  } = getImage(nft_object);

  if (title && artist) {

    const titleArtist = `"${title}" by ${artist}`;
    const typeEncoding = `${fileType ? fileType : ''} (${encoding})`;
    const symbolID = `${symbol} (ID: ${id})`;

    return (
      <TableRow key={`tr ${symbol}`}>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`} key={`/nft/${symbol}/img`} passHref>
              <a>
                <LazyLoadImage
                  alt={`${symbol} thumbnail`}
                  effect="blur"
                  width={128}
                  height={128}
                  placeholderSrc={`/images/${symbol}_icon.webp`}
                  src={`/images/${symbol}_thumb.webp`}
                />
              </a>
            </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>{titleArtist}</a>
            </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>{typeEncoding}</a>
            </Link>
          </TableCell>
          <TableCell>
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>{symbolID}</a>
            </Link>
          </TableCell>
      </TableRow>
    );
  } else {
    return (
      <TableRow key={`tr ${symbol}`}>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>loading</a>
            </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>loading</a>
            </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>loading</a>
            </Link>
          </TableCell>
          <TableCell>
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>loading</a>
            </Link>
          </TableCell>
      </TableRow>
    );
  }

}

function ListContents(properties) {


  const data = art && art.production ? art.production : [];
  if (!data || !data.length) {
    return <p>List is loading NFTs...</p>;
  }

  let artIds = data.map(item => item.name);
  const tableRows = artIds && artIds.length
                      ? artIds.map((id) => {
                          return <ListRow id={id} key={`listrow_${id}`} />;
                        })
                      : [];

  return tableRows;
}

function List(properties) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Image
            </TableCell>
            <TableCell>
              NFT info
            </TableCell>
            <TableCell>
              NFT type
            </TableCell>
            <TableCell>
              Asset info
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <ListContents {...properties} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List
