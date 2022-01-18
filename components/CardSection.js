import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import Image from 'next/image';

import { Card } from '@mantine/core';
import { useInView } from 'react-intersection-observer';
import { useTheme } from './states';

function image (symbol, media_json, isApple, inview) {
  if (isApple) {
    return <img
              width={"350px"}
              height={"350px"}
              src={!media_json ? `/images/${symbol}/${inview ? `0_gallery` : `0_thumb`}.webp` : "/images/placeholders/0.webp"}
              alt={`${symbol} NFT apple image`}
            />
  } else {
    return <Image
              width={"350px"}
              height={"350px"}
              src={!media_json ? `/images/${symbol}/${inview ? `0_gallery` : `0_thumb`}.webp` : "/images/placeholders/0.webp"}
              alt={`${symbol} NFT image`}
            />
  }
}

export default function CardSection(properties) {
  const { ref, inview, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const symbol = properties.symbol;
  const media_json = properties.media_json;
  const isApple = properties.isApple;
  const bg = `/images/${symbol}/0_bg.webp`;

  return (
    <Card.Section inview={inview}>
      <div
        ref={ref}
        style={{
          backgroundImage: 'url('+bg+')',
          backgroundSize: "cover"
        }}
      >
        {
          image(symbol, media_json, isApple, inview)
        }
      </div>
    </Card.Section>
  );
}
