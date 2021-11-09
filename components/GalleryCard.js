import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import Link from 'next/link';

import { Card, Center, Image, Text, Grid, Col } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';

import CurrentValue from './CurrentValue';
import CardSection from './CardSection';
import { useLanguage, useTheme } from './states';

export default function GalleryCard(properties) {
  let isMobile = properties && properties.isMobile ? properties.isMobile : false;
  let isApple = properties && properties.isApple ? properties.isApple : false;

  const { t } = useTranslation('gallery');
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();

  let nft = properties.nft;
  let symbol = nft ? nft.symbol : undefined;
  let market = nft ? nft.market : undefined;
  let title = nft ? nft.title : undefined;
  let artist = nft ? nft.artist : undefined;
  let id = nft ? nft.id : undefined;
  let media_json = nft ? nft.media_json : undefined;

  let address = language && !language.includes("en") ? `/${language}` : ``;

  const { hovered, ref } = useHover();

  return (
    <Card
      radius="lg"
      component="a"
      href={address + "/nft/" + symbol}
      ref={ref}
      style={{ width: isMobile ? 300 : 350, margin: 'auto' }}
      shadow={`0 0 ${hovered ? 5 : 2}px ${theme === 'dark' ? 'white' : 'grey'}`}
    >
      <CardSection symbol={symbol} media_json={media_json} isApple={isApple} />
      <Grid grow>
        <Col span={12}>
          <Text size="lg" align="center">
            {title}
          </Text>
          <Text size="sm" align="center">
            {t('created_text', {artist: artist})}
          </Text>
          <Text size="md" key={`${id} value`} align="center">
            <CurrentValue id={id} market={market} />
          </Text>
        </Col>
      </Grid>
    </Card>
  );
}
