import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { useGateway } from './states';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const Carousel = dynamic(() => import('react-responsive-carousel').then((module) => module.Carousel));

const Card = dynamic(() => import('@mui/material/Card'));
const CardContent = dynamic(() => import('@mui/material/CardContent'));
const CardMedia = dynamic(() => import('@mui/material/CardMedia'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Button = dynamic(() => import('@mui/material/Button'));

import { CardActionArea } from '@mui/material';

function CarouselItem (properties) {
  const [gateway, setGateway] = useGateway();

  let asset = properties.asset;
  let symbol = asset && asset.symbol ? asset.symbol : undefined;

  let value = properties.value;
  let media_png_multihash = properties.media_png_multihash;

  let visible = properties.visible;
  let nearby = properties && properties.nearby ? properties.nearby : null;
  let isApple = properties && properties.isApple ? properties.isApple : false;

  if (!gateway) {
    setGateway('gateway.ipfs.io');
  }

  let itrs = media_png_multihash.url.split(".")[0].split("/");
  let itr = itrs[itrs.length - 1];

  let media = null;
  if (visible) {
    media = isApple
            ? <img
                src={`/images/${symbol}/${value}.webp`}
                key={`${symbol}_featured_div_${itr}`}
                alt={`${symbol}_featured_div_${itr}`}
              />
            : <CardMedia
                component="img"
                width="100%"
                height="100%"
                image={`/images/${symbol}/${value}.webp`}
                key={`${symbol}_featured_div_${itr}`}
                alt={`${symbol}_featured_div_${itr}`}
              />
  } else if (nearby) {
    media = isApple
            ? <img
                src={`/images/${symbol}/${value}_thumb.webp`}
                key={`${symbol}_featured_div_thumb_${itr}`}
                alt={`${symbol}_featured_div_thumb_${itr}`}
              />
            : <CardMedia
              component="img"
              width="100%"
              height="100%"
              image={`/images/${symbol}/${value}_thumb.webp`}
              key={`${symbol}_featured_div_thumb_${itr}`}
              alt={`${symbol}_featured_div_thumb_${itr}`}
            />
  }

  return (<Card key={symbol + "_featured_div_" + itr} sx={{p: 0, textAlign: 'center', m: 0.75}}>
        <CardActionArea href={`https://${gateway}${media_png_multihash.url}`}>
          {media}
        </CardActionArea>
      </Card>);
}

export default function IPFSCarouselElement(properties) {
  let media_png_multihashes = properties.media_png_multihashes;

  const [index, setIndex] = useState(0);

  let carouselItems = media_png_multihashes && media_png_multihashes.length > 0
    ? media_png_multihashes.map((key, value) => {
        let asset = properties.asset;
        let symbol = asset && asset.symbol ? asset.symbol : undefined;
        let itrs = key.url.split(".")[0].split("/");
        let itr = itrs[itrs.length - 1];

        return <CarouselItem
                  media_png_multihash={key}
                  value={value}
                  visible={index === value}
                  nearby={index === value - 1 || index === value + 1}
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
        interval={7500}
        onChange={(index) => setIndex(index)}
        statusFormatter={(current, total) => `Image ${current} of ${total} (iteration ${media_png_multihashes[current-1].url.split(".")[0].split("/").slice(-1)[0]})`}
      >
        {carouselItems}
      </Carousel>
  );
}
