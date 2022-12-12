import { useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useViewportSize } from '@mantine/hooks';
import { Card } from '@mantine/core';

import { useAppStore } from './states';

//import 'react-responsive-carousel/lib/styles/carousel.min.css';

// requires a loader
//const Carousel = dynamic(() => import('react-responsive-carousel').then((module) => module.Carousel));

function CarouselItem(properties) {
  const { asset } = properties;
  const symbol = asset && asset.symbol ? asset.symbol : undefined;

  const { value } = properties;
  const { media_png_multihash } = properties;

  const { visible } = properties;
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
  const gateway = useAppStore((state) => state.gateway);

  const { media_png_multihashes, asset, isApple } = properties;

  // rerender carouselItems when gateway changes
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    let tempCarouselItems = [];
    if (media_png_multihashes && media_png_multihashes.length > 0) {
      tempCarouselItems = media_png_multihashes.map((key, value) => {
        const symbol = asset && asset.symbol ? asset.symbol : undefined;
        const itrs = key.url.split('.')[0].split('/');
        const itr = itrs[itrs.length - 1];

        return <Carousel.Slide key={`${symbol}_carousel_item_${itr}`}>
                <Card
                  align="center"
                  component="a"
                  href={`https://${gateway}${key.url}`}
                  p="none"
                >
                  {
                    isApple
                      ? <img
                          src={`/images/${symbol}/${value}.webp`}
                          alt={`${symbol}_featured_div_${itr}`}
                      />
                      : <Image
                          width={imageSize}
                          height={imageSize}
                          src={`/images/${symbol}/${value}.webp`}
                          alt={`${symbol}_featured_div_${itr}`}
                      />
                  }
                </Card>
               </Carousel.Slide>;
      }).filter(x => x);

      if (tempCarouselItems.length > 0) {
        setCarouselItems(tempCarouselItems);
      }
    }
  }, [asset, gateway, imageSize, isApple, media_png_multihashes]);

  if (carouselItems.length === 0) {
    return null;
  }

  return (
      <Carousel slideSize="70%" width={imageSize} slideGap="sm" loop withIndicators>
        {
          carouselItems
        }
      </Carousel>
  );
}
