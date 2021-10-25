import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactGA from 'react-ga4';
import { useInView } from 'react-intersection-observer';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion"

//import { useTranslation } from 'next-i18next';
import art from '../components/art.json';
import config from './config.json';

const { getImage } = require("../components/images");

ReactGA.initialize(config.google_analytics);

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

    let imageSRC = require(`../public/images/${symbol}/0_thumb.webp`);

    return (
      <TableRow key={`tr ${symbol}`}>
        <TableCell ref={ref} component="th" scope="row">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Fade triggerOnce={true}>
              <Link href={`/nft/${symbol}`} key={`/nft/${symbol}/img`} passHref>
                <a>
                  {inView ? (
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
            </Fade>
          </motion.div>

        </TableCell>
        <TableCell component="th" scope="row">
          <Fade triggerOnce={true}>
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>{titleArtist}</a>
            </Link>
          </Fade>
        </TableCell>
        <TableCell component="th" scope="row">
          <Fade triggerOnce={true}>
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>{typeEncoding}</a>
            </Link>
          </Fade>
        </TableCell>
        <TableCell>
          <Fade triggerOnce={true}>
            <Link href={`/nft/${symbol}`}>
              <a className={classes.a}>{symbolID}</a>
            </Link>
          </Fade>
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
