import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Card, Col, Grid, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from 'next-export-i18n';
import { useInView } from 'react-intersection-observer';
import { useAppStore } from './states';

export default function NFTCard(properties) {
  const theme = useAppStore((state) => state.theme);

  const secondaryColor = theme === 'dark'
    ? '#A6A7AB'
    : '#1A1B1E';

  const visible = properties && properties.visible ? properties.visible : null;
  const nearby = properties && properties.nearby ? properties.nearby : null;
  const isApple = properties && properties.isApple ? properties.isApple : false;

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const { nft } = properties;
  const symbol = nft ? nft.symbol : undefined;
  const market = nft ? nft.market : undefined;
  const title = nft ? nft.title : undefined;
  const artist = nft ? nft.artist : undefined;
  const media_json = nft ? nft.media_json : undefined;
  const isMobile = properties ? properties.isMobile : undefined;

  const { width } = properties;

  let media = null;
  if (visible || inView) {
    media = isApple
      ? <img
          width={`${width}px`}
          height={`${width}px`}
          alt={`${symbol} NFT media contents`}
          src={!media_json ? `/images/${symbol}/0${isMobile ? '_gallery' : ''}.webp` : '/images/placeholders/0.webp'}
      />
      : <Image
          width={width}
          height={width}
          src={!media_json ? `/images/${symbol}/0${isMobile ? '_gallery' : ''}.webp` : '/images/placeholders/0.webp'}
          alt={`${symbol} NFT image`}
      />;
  } else if (nearby) {
    media = isApple
      ? <img
          width={`${width}px`}
          height={`${width}px`}
          alt={`${symbol} NFT media contents`}
          src={!media_json ? `/images/${symbol}/0_thumb.webp` : '/images/placeholders/0.webp'}
      />
      : <Image
          width={width}
          height={width}
          component="img"
          src={!media_json ? `/images/${symbol}/0_thumb.webp` : '/images/placeholders/0.webp'}
          alt={`${symbol} NFT image`}
      />;
  }

  return (
    <Card
      shadow="sm"
      p="lg"
      component="a"
      key={`${symbol} card`}
      href={`/nft/${symbol}?lang=${query && query.lang ? query.lang : 'en'}`}
    >
      <div
        inview={inView}
        style={
          !inView
            ? {
              backgroundImage: `url(/images/${symbol}/0_bg.webp)`,
              backgroundSize: 'cover',
            }
            : {
              backgroundImage: '',
              backgroundSize: 'cover',
            }
        }
      >
        <Card.Section ref={ref}>
          {media}
        </Card.Section>
      </div>
      <Text size="md" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        {title}
      </Text>
      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1 }}>
        {t('gallery.created_text', { artist })}
      </Text>
    </Card>
  );
}
