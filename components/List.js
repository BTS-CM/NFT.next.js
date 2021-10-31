import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const Paper = dynamic(() => import('@mui/material/Paper'));
const Table = dynamic(() => import('@mui/material/Table'));
const TableBody = dynamic(() => import('@mui/material/TableBody'));
const TableContainer = dynamic(() => import('@mui/material/TableContainer'));
const TableHead = dynamic(() => import('@mui/material/TableHead'));
const TableRow = dynamic(() => import('@mui/material/TableRow'));
import TableCell from '@mui/material/TableCell';

import { motion } from "framer-motion"
import { useEnvironment } from './states';
const { getImage } = require("../components/images");

function ListRow (properties) {
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
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>{titleArtist}</a>
            </Link>
        </TableCell>
        <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>{typeEncoding}</a>
            </Link>
        </TableCell>
        <TableCell>
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>{symbolID}</a>
            </Link>
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <TableRow key={`tr ${symbol}`}>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>loading</a>
            </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>loading</a>
            </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>loading</a>
            </Link>
          </TableCell>
          <TableCell>
            <Link href={`/nft/${symbol}`}>
              <a sx={{textDecoration: 'none', color: 'text.primary'}}>loading</a>
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: '650px'}} aria-label="simple table">
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
