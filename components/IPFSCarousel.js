import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useViewportSize } from '@mantine/hooks';

import { useGateway } from './states';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const Carousel = dynamic(() => import('react-responsive-carousel').then((module) => module.Carousel));

import { Card } from '@mantine/core';


function CarouselItem (properties) {
  const [gateway, setGateway] = useGateway();

  let asset = properties.asset;
  let symbol = asset && asset.symbol ? asset.symbol : undefined;

  let value = properties.value;
  let media_png_multihash = properties.media_png_multihash;

  let visible = properties.visible;
  let nearby = properties && properties.nearby ? properties.nearby : null;
  let isApple = properties && properties.isApple ? properties.isApple : false;
  let imageSize = properties && properties.imageSize ? properties.imageSize : 500;

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
            : <Image
                width={`${imageSize}px`}
                height={`${imageSize}px`}
                src={`/images/${symbol}/${value}.webp`}
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
            : <Image
                width={`${imageSize}px`}
                height={`${imageSize}px`}
                src={`/images/${symbol}/${value}_thumb.webp`}
                key={`${symbol}_featured_div_thumb_${itr}`}
                alt={`${symbol}_featured_div_thumb_${itr}`}
              />
  }

  return (<Card
           align="center"
           component="a"
           href={`https://${gateway}${media_png_multihash.url}`}
           key={symbol + "_featured_div_" + itr}
           padding="none"
           sx={{
             backgroundImage: 'url('+`/images/${symbol}/0_bg.webp`+')',
             backgroundSize: "cover"
           }}
          >
            {media}
          </Card>);
  }

function getWidth(width) {
  if (width >= 1500) {
    return 1100;
  } else if (width >= 1280) {
    return 900;
  } else if (width >= 1080) {
    return 700;
  } else if (width >= 800) {
    return 450;
  } else if (width >= 420) {
    return 400;
  } else if (width >= 300) {
    return 300;
  } else {
    return 200;
  }
}

export default function IPFSCarouselElement(properties) {

  const { height, width } = useViewportSize();
  let imageSize = getWidth(width);

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
                  imageSize={imageSize}
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
        width={imageSize}
        onChange={(index) => setIndex(index)}
        statusFormatter={(current, total) => `Image ${current} of ${total} (iteration ${media_png_multihashes[current-1].url.split(".")[0].split("/").slice(-1)[0]})`}
      >
        {carouselItems}
      </Carousel>
  );
}
