import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const Paper = dynamic(() => import('@mui/material/Paper'));
const Table = dynamic(() => import('@material-ui/core/Table'));
const TableBody = dynamic(() => import('@material-ui/core/TableBody'));
const TableContainer = dynamic(() => import('@material-ui/core/TableContainer'));
const TableHead = dynamic(() => import('@material-ui/core/TableHead'));
const TableRow = dynamic(() => import('@material-ui/core/TableRow'));
import TableCell from '@material-ui/core/TableCell';

import { motion } from "framer-motion"
import { makeStyles } from '@material-ui/core/styles';

import { useEnvironment } from './states';

const { getImage } = require("../components/images");

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
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

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

    let imageSRC = null;
    try {
      imageSRC = require(`../public/images/${symbol}/0_thumb.webp`);
    } catch (error) {
    }

    return (
      <TableRow key={`tr ${symbol}`}>
        <TableCell ref={ref} component="th" scope="row">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
              <Link href={`/nft/${symbol}`} key={`/nft/${symbol}/img`} passHref>
                <a>
                  {inView && imageSRC ? (
                    <Image
                      key={`${symbol} thumbnail`}
                      alt={`${symbol} thumbnail`}
                      effect="blur"
                      width={128}
                      height={128}
                      src={imageSRC}
                    />
                  ) : null}
                </a>
              </Link>
          </motion.div>

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

  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
  const art = properties.art;
  let data = art && art[env] ? art[env] : [];

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
