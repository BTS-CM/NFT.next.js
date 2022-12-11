import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

import { Card } from '@mantine/core';
import { useInView } from 'react-intersection-observer';

function image(symbol, media_json, isApple, inView) {
  if (isApple) {
    return <img
      width="350"
      height="350"
      src={!media_json ? `/images/${symbol}/${inView ? '0_gallery' : '0_thumb'}.webp` : '/images/placeholders/0.webp'}
      alt={`${symbol} NFT contents`}
    />;
  }
  return <Image
    width={350}
    height={350}
    src={!media_json ? `/images/${symbol}/${inView ? '0_gallery' : '0_thumb'}.webp` : '/images/placeholders/0.webp'}
    alt={`${symbol} NFT contents`}
  />;
}

export default function CardSection(properties) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const { symbol } = properties;
  const { media_json } = properties;
  const { isApple } = properties;
  const bg = `/images/${symbol}/0_bg.webp`;

  let backgroundImage = `url(${bg})`;
  if (inView) {
    backgroundImage = '';
  }

  return (
    <Card.Section>
      <div
        ref={ref}
        style={{
          backgroundImage,
          backgroundSize: 'cover',
        }}
      >
        {
          image(symbol, media_json, isApple, inView)
        }
      </div>
    </Card.Section>
  );
}
