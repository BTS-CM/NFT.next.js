import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { Card, Col, Grid, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import { useInView } from 'react-intersection-observer';

export default function NFTCard(properties) {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  let visible = properties && properties.visible ? properties.visible : null;
  let nearby = properties && properties.nearby ? properties.nearby : null;
  let isApple = properties && properties.isApple ? properties.isApple : false;

  const { ref, inview } = useInView({
    triggerOnce: true,
  });

  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  let nft = properties.nft;
  let symbol = nft ? nft.symbol : undefined;
  let market = nft ? nft.market : undefined;
  let title = nft ? nft.title : undefined;
  let artist = nft ? nft.artist : undefined;
  let media_json = nft ? nft.media_json : undefined;
  let isMobile = properties ? properties.isMobile : undefined;

  let width = properties.width;

  let media = null;
  if (visible || inview) {
    media = isApple
              ? <img
                  width={`${width}px`}
                  height={`${width}px`}
                  alt={`${symbol} NFT apple image`}
                  src={!media_json ? `/images/${symbol}/0${isMobile ? '_gallery' : ''}.webp` : "/images/placeholders/0.webp"}
                />
              : <Image
                  width={`${width}px`}
                  height={`${width}px`}
                  src={!media_json ? `/images/${symbol}/0${isMobile ? '_gallery' : ''}.webp` : "/images/placeholders/0.webp"}
                  alt={`${symbol} NFT image`}
                />;
  } else if (nearby) {
    media = isApple
              ? <img
                  width={`${width}px`}
                  height={`${width}px`}
                  alt={`${symbol} NFT apple image`}
                  src={!media_json ? `/images/${symbol}/0_thumb.webp` : "/images/placeholders/0.webp"}
                />
              : <Image
                  width={`${width}px`}
                  height={`${width}px`}
                  component="img"
                  src={!media_json ? `/images/${symbol}/0_thumb.webp` : "/images/placeholders/0.webp"}
                  alt={`${symbol} NFT image`}
                />
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      component="a"
      key={`${symbol} card`}
      href={"/nft/" + symbol}
    >
      <div
        inview={inview}
        style={{
          backgroundImage: 'url('+`/images/${symbol}/0_bg.webp`+')',
          backgroundSize: "cover"
        }}
      >
        <Card.Section ref={ref}>
          {media}
        </Card.Section>
      </div>
      <Text size="md" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        {title}
      </Text>
      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1 }}>
        {t('gallery.created_text', {artist: artist})}
      </Text>
    </Card>
  );
}
