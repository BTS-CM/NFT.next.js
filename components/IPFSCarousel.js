import { useState, useEffect } from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from 'next-export-i18n';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useViewportSize } from '@mantine/hooks';
import { Card } from '@mantine/core';

import { useAppStore } from './states';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

// requires a loader
const Carousel = dynamic(() => import('react-responsive-carousel').then((module) => module.Carousel));

function CarouselItem(properties) {
  const gateway = useAppStore((state) => state.gateway);
  const setGateway = useAppStore((state) => state.setGateway);

  const { asset } = properties;
  const symbol = asset && asset.symbol ? asset.symbol : undefined;

  const { value } = properties;
  const { media_png_multihash } = properties;

  const { visible } = properties;
  const nearby = properties && properties.nearby ? properties.nearby : null;
  const isApple = properties && properties.isApple ? properties.isApple : false;
  const imageSize = properties && properties.imageSize ? properties.imageSize : 500;

  if (!gateway) {
    setGateway('gateway.ipfs.io');
  }

  const itrs = media_png_multihash.url.split('.')[0].split('/');
  const itr = itrs[itrs.length - 1];

  let media = null;
  if (visible) {
    media = isApple
      ? <img
          src={`/images/${symbol}/${value}.webp`}
          key={`${symbol}_featured_div_${itr}`}
          alt={`${symbol}_featured_div_${itr}`}
      />
      : <Image
          width={imageSize}
          height={imageSize}
          src={`/images/${symbol}/${value}.webp`}
          key={`${symbol}_featured_div_${itr}`}
          alt={`${symbol}_featured_div_${itr}`}
      />;
  } else if (nearby) {
    media = isApple
      ? <img
          src={`/images/${symbol}/${value}_thumb.webp`}
          key={`${symbol}_featured_div_thumb_${itr}`}
          alt={`${symbol}_featured_div_thumb_${itr}`}
      />
      : <Image
          width={imageSize}
          height={imageSize}
          src={`/images/${symbol}/${value}_thumb.webp`}
          key={`${symbol}_featured_div_thumb_${itr}`}
          alt={`${symbol}_featured_div_thumb_${itr}`}
      />;
  }

  return (<Card
    align="center"
    component="a"
    href={`https://${gateway}${media_png_multihash.url}`}
    key={`${symbol}_featured_div_${itr}`}
    p="none"
  >
            {media}
          </Card>);
}

function getWidth(width) {
  if (width >= 1500) {
    return 1100;
  } if (width >= 1280) {
    return 900;
  } if (width >= 1080) {
    return 700;
  } if (width >= 800) {
    return 450;
  } if (width >= 420) {
    return 400;
  } if (width >= 300) {
    return 300;
  }
  return 200;
}

export default function IPFSCarouselElement(properties) {
  const { height, width } = useViewportSize();
  const imageSize = getWidth(width);

  const { media_png_multihashes } = properties;

  const [index, setIndex] = useState(0);

  const carouselItems = media_png_multihashes && media_png_multihashes.length > 0
    ? media_png_multihashes.map((key, value) => {
      const { asset } = properties;
      const symbol = asset && asset.symbol ? asset.symbol : undefined;
      const itrs = key.url.split('.')[0].split('/');
      const itr = itrs[itrs.length - 1];

      return <CarouselItem
        media_png_multihash={key}
        value={value}
        imageSize={imageSize}
        visible={index === value}
        nearby={index === value - 1 || index === value + 1}
        {...properties}
        key={`${symbol}_carousel_item_${itr}`}
        first={value === 0}
      />;
    }).filter(x => x)
    : [];

  return (
      <Carousel
        showIndicators={false}
        showThumbs={false}
        stopOnHover
        useKeyboardArrows
        autoFocus
        autoPlay
        infiniteLoop
        interval={7500}
        width={imageSize}
        onChange={(newIndex) => setIndex(newIndex)}
        statusFormatter={(current, total) => `Image ${current} of ${total} (iteration ${media_png_multihashes[current - 1].url.split('.')[0].split('/').slice(-1)[0]})`}
      >
        {carouselItems}
      </Carousel>
  );
}
