import { Card, Center, Image, Text, Grid, Col, Group, Badge, Stack } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import {
  useTranslation,
  useLanguageQuery,
} from 'next-export-i18n';
//import { useInView } from 'react-intersection-observer';

import CurrentValue from './CurrentValue';
import CardSection from './CardSection';
import { useAppStore } from './states';

export default function GalleryCard(properties) {
  const isMobile = properties && properties.isMobile ? properties.isMobile : false;
  const isApple = properties && properties.isApple ? properties.isApple : false;

  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const theme = useAppStore((state) => state.theme);

  const { nft } = properties;
  const symbol = nft ? nft.symbol : undefined;
  const market = nft ? nft.market : undefined;
  const title = nft ? nft.title : undefined;
  const artist = nft ? nft.artist : undefined;
  const id = nft ? nft.id : undefined;
  const media_json = nft ? nft.media_json : undefined;

  const { hovered, ref } = useHover();

  return (
    <Card
      radius="lg"
      withBorder
      component="a"
      href={`/nft/${symbol}?lang=${query ? query.lang : 'en'}`}
      ref={ref}
      style={{ width: isMobile ? 300 : 350, margin: 'auto', paddingTop: 0 }}
      shadow={`0 0 ${hovered ? 5 : 2}px ${theme === 'dark' ? 'white' : 'grey'}`}
    >
      <CardSection symbol={symbol} media_json={media_json} isApple={isApple} />
      <Grid grow>
        <Col span={12}>
          <Text size="lg" align="center">
            {title}
          </Text>
          <Text size="sm" align="center">
            {t('gallery.created_text', { artist })}
          </Text>
          <Text size="md" key={`${id} value`} align="center">
            <CurrentValue id={id} market={market} />
          </Text>
        </Col>
      </Grid>
    </Card>
  );
}
