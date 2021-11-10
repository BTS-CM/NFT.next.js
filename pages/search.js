import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper, Button, Group, TextInput } from '@mantine/core'

const SEO = dynamic(() => import('../components/SEO'));

import { useEnvironment, useAnalytics, useTheme } from '../components/states';

function SearchPanel (properties) {
  const { t } = useTranslation('search');
  const [overlay, setOverlay] = useState();

  const config = properties.config;
  const art = properties.art;

  const [colorScheme, setColorScheme] = useTheme();
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';

  const searchData = art && art[env] ? art[env] : [];
  if (!searchData || !searchData.length) {
    return <p>loading search...</p>;
  }

  const eraseSearch = (event) => {
    setOverlay();
  };

  const updateSearchValue = async (event) => {
    setOverlay();
    const Fuse = (await import('fuse.js')).default
    const fuse = new Fuse(
      searchData,
      {
        includeScore: true,
        keys: ['name', 'id']
      }
    );

    const result = fuse.search(event.target.value);
    if (result && result.length > 0) {
      setOverlay(
        result.slice(0,5).map(crypto => {
          if (crypto.item && crypto.item.id) {
            return (
              <Button align="left" variant={colorScheme === "dark" ? "filled" : "light"} color={'gray'}>
                <Text component={Link} href={`/nft/${crypto.item.name}`} key={crypto.item.name}>
                  {`${crypto.item.id}: ${crypto.item.name}`}
                </Text>
              </Button>
            )
          } else {
            return null;
          }
        }).filter(x => x)
      );
    } else {
      eraseSearch(event);
    }
  };

  return (
    <SEO
      description={t('header_description')}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <Grid grow key={"Search Window"}>
      <Col span={12} key={"Search row"}>
        <Paper padding="md" shadow="xs">
          <Text size="lg">
            {t('header')}
          </Text>
          <Text>
            {t('body')}
          </Text>
          <TextInput
            key="searchInput"
            label="NFT name"
            onChange={updateSearchValue}
            sx={{marginBottom: '20px', marginTop: '10px'}}
          />
            <Group direction="column" aria-label="search result list">
              {
                overlay
              }
            </Group>
        </Paper>
      </Col>
      <Col span={12} key={"Info row"}>
        <Paper padding="md" shadow="xs">
          <Text size="lg">
            {t('help_header')}
          </Text>
          <Text>
            {t('not_all')}
          </Text>
          <Text>
            {t('pre_a')}<Link href="/viewers">{t('a1')}</Link> & <Link href="/viewers">{t('a2')}</Link>!
          </Text>
        </Paper>
      </Col>
    </Grid>
  );
}

function Search(properties) {
  let [analytics, setAnalytics] = useAnalytics();
  let config = properties.config;

  useEffect(() => {
    async function sendAnalytics() {
      if (analytics && config.google_analytics.length) {
        const ReactGA = (await import('react-ga4')).default
        ReactGA.initialize(config.google_analytics);
        ReactGA.pageview('Search')
      }
    }
    sendAnalytics();
  }, [analytics]);

  return (
    <SearchPanel {...properties} />
  );
}

export const getStaticProps = async ({ locale }) => {

  const art = require('../components/art.json');
  const config = require('../components/config.json');
  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      art: art,
      config: config,
      ...(await serverSideTranslations(locale, ['search', 'nav'])),
    }
  };
}

export default Search
