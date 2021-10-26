import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

import { useGateway } from './states';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { useInView } from 'react-intersection-observer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  bigcard: {
    padding: theme.spacing(0),
    textAlign: 'center',
    margin: theme.spacing(0.75)
  }
}));

function CarouselItem (properties) {
  const classes = useStyles();
  const [gateway, setGateway] = useGateway();

  let asset = properties.asset;
  let value = properties.value;
  let media_png_multihash = properties.media_png_multihash;

  let symbol = asset && asset.symbol ? asset.symbol : undefined;

  if (!gateway) {
    setGateway('gateway.ipfs.io');
  }

  let linkURL= `https://${gateway}${media_png_multihash.url}`;

  let itrs = media_png_multihash.url.split(".")[0].split("/");
  let itr = itrs[itrs.length - 1];

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (<Card ref={ref} key={symbol + "_featured_div_" + itr} className={classes.bigcard}>
        <CardActionArea href={linkURL}>
          {inView ? (
            <CardMedia
              component="img"
              width="100%"
              height="100%"
              image={`/images/${symbol}/${value}.webp`}
              key={`${symbol}_featured_div_${itr}`}
              alt={`${symbol}_featured_div_${itr}`}
            />
          ) : null}
        </CardActionArea>
      </Card>);
}

export default function IPFSCarouselElement(properties) {
  let media_png_multihashes = properties.media_png_multihashes;

  let carouselItems = media_png_multihashes && media_png_multihashes.length > 0
    ? media_png_multihashes.map((key, value) => {
        let asset = properties.asset;
        let symbol = asset && asset.symbol ? asset.symbol : undefined;
        let itrs = key.url.split(".")[0].split("/");
        let itr = itrs[itrs.length - 1];

        return <CarouselItem
                  media_png_multihash={key}
                  value={value}
                  { ...properties }
                  key={symbol + "_carousel_item_" + itr}
                  first={value === 0 ? true : false}
                />;
      }).filter(x => x)
    : [];

  return (
      <Carousel
        showIndicators={false}
        showThumbs={false}
        stopOnHover={true}
        useKeyboardArrows={true}
        autoFocus={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        statusFormatter={(current, total) => `Image ${current} of ${total} (iteration ${media_png_multihashes[current-1].url.split(".")[0].split("/").slice(-1)[0]})`}
      >
        {carouselItems}
      </Carousel>
  );
}
