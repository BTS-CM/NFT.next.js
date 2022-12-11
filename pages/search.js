import { useState } from 'react';
import {
  useTranslation,
  useLanguageQuery,
} from 'next-export-i18n';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Text, Grid, Col, Paper, Button, Stack, TextInput } from '@mantine/core';

import configJSON from '../components/config.json' assert {type: 'json'};
import artJSON from '../components/art.json' assert {type: 'json'};

import { useAppStore } from '../components/states';

const SEO = dynamic(() => import('../components/SEO'));

function SearchPanel(properties) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const [overlay, setOverlay] = useState();

  const { config } = properties;
  const { art } = properties;

  const colorScheme = useAppStore((state) => state.theme);
  const environment = useAppStore((state) => state.environment);
  const env = environment || 'production';

  const searchData = art && art[env] ? art[env] : [];
  if (!searchData || !searchData.length) {
    return <p>loading search...</p>;
  }

  const eraseSearch = (event) => {
    setOverlay();
  };

  const updateSearchValue = async (event) => {
    setOverlay();
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(
      searchData,
      {
        includeScore: true,
        keys: ['name', 'id'],
      }
    );

    const result = fuse.search(event.target.value);
    if (result && result.length > 0) {
      setOverlay(
        result.slice(0, 5).map(crypto => {
          if (crypto.item && crypto.item.id) {
            return (
              <Button
                align="left"
                variant={colorScheme === 'dark' ? 'filled' : 'light'}
                color="gray"
                key={`${crypto.item.id}_search`}
              >
                <Text component={Link} href={`/nft/${crypto.item.name}?lang=${query && query.lang ? query.lang : 'en'}`} key={crypto.item.name}>
                  {`${crypto.item.id}: ${crypto.item.name}`}
                </Text>
              </Button>
            );
          }
          return null;
        }).filter(x => x)
      );
    } else {
      eraseSearch(event);
    }
  };

  return ([
    <SEO
      description={t('search.header_description')}
      title={t('search.header_title')}
      siteTitle={config.title}
      key="SEO"
    />,
    <Grid grow key="Search Window">
      <Col span={12} key="Search row">
        <Paper p="md" shadow="xs">
          <Text size="lg">
            {t('search.header')}
          </Text>
          <Text>
            {t('search.body')}
          </Text>
          <TextInput
            key="searchInput"
            label="NFT name"
            onChange={updateSearchValue}
            sx={{ marginBottom: '20px', marginTop: '10px' }}
          />
            <Stack aria-label="search result list">
              {
                overlay
              }
            </Stack>
        </Paper>
      </Col>
      <Col span={12} key="Info row">
        <Paper p="md" shadow="xs">
          <Text size="lg">
            {t('search.help_header')}
          </Text>
          <Text>
            {t('search.not_all')}
          </Text>
          <Text>
            {t('search.pre_a')}<Link href="/viewers">{t('search.a1')}</Link> & <Link href="/viewers">{t('search.a2')}</Link>!
          </Text>
        </Paper>
      </Col>
    </Grid>,
  ]);
}

function Search(properties) {
  const { config } = properties;

  return (
    <SearchPanel {...properties} />
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    art: artJSON,
    config: configJSON,
  },
});

export default Search;
