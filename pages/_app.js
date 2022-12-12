import React, { useMemo, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

/*
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Image from 'next/image';
*/

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from 'next-export-i18n';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Menu,
  MantineProvider,
  NormalizeCSS,
  Grid,
  Col,
  Container,
  Divider,
  Text,
  ActionIcon,
  TypographyStylesProvider,
  Title,
  Group,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Analytics } from '@vercel/analytics/react';

import { IoLanguageOutline, IoSunnyOutline, IoMoonOutline, IoLogoTwitter } from 'react-icons/io5';
import { SiHiveBlockchain } from 'react-icons/si';

import '../components/noScrollbars.css';

import NavButton from '../components/NavButton';

import { useAppStore } from '../components/states';

import config from '../config/config.json';

const locales = [
  { language: 'en', aka: 'English' },
  { language: 'zhTW', aka: '臺灣的' },
  { language: 'ee', aka: 'Eestlane' },
  { language: 'da', aka: 'Dansk' },
  { language: 'de', aka: 'Deutsche' },
  { language: 'es', aka: 'Español' },
  { language: 'th', aka: 'ไทย' },
  { language: 'it', aka: 'Italiano' },
  { language: 'fr', aka: 'Français' },
  { language: 'ko', aka: '한국어' },
  { language: 'pt', aka: 'Português' },
  { language: 'ja', aka: '日本語' },
  { language: 'ukr', aka: 'Українська' },
];

function MyApp(props) {
  const { Component, pageProps } = props;
  const { hovered, ref } = useHover();

  const router = useRouter();
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  const toggleColorScheme = (value) => setTheme(value || (theme && theme === 'dark' ? 'light' : 'dark'));

  const environment = useAppStore((state) => state.environment);
  const menuOpen = useAppStore((state) => state.menuOpen);
  const setMenuOpen = useAppStore((state) => state.setMenuOpen);

  return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" key="twcard" />
      </Head>,
      <MantineProvider theme={{ colorScheme: theme }} withGlobalStyles withNormalizeCSS>
          <TypographyStylesProvider sx={{ textDecoration: 'none' }}>
            <AppShell
              navbarOffsetBreakpoint="sm"
              fixed
              navbar={
                <Navbar
                  p="md"
                  hiddenBreakpoint="sm"
                  hidden={!menuOpen}
                  width={{ sm: 125, lg: 200 }}
                  zIndex={1}
                >
                  <NavButton
                    url="/"
                    language={query && query.lang ? query.lang : 'en'}
                    inputText={t('nav.link1')}
                  />
                  <NavButton
                    url="/gallery"
                    language={query && query.lang ? query.lang : 'en'}
                    inputText={t('nav.link2')}
                  />
                  <NavButton
                    url="/search"
                    language={query && query.lang ? query.lang : 'en'}
                    inputText={t('nav.link4')}
                  />
                  <NavButton
                    url="/news"
                    language={query && query.lang ? query.lang : 'en'}
                    inputText={t('nav.link9')}
                  />
                  <NavButton
                    url="/viewers"
                    language={query && query.lang ? query.lang : 'en'}
                    inputText={t('nav.link7')}
                  />
                  <NavButton
                    url="/settings"
                    language={query && query.lang ? query.lang : 'en'}
                    inputText={t('nav.link8')}
                  />
                  <NavButton
                    url="/license"
                    language={query && query.lang ? query.lang : 'en'}
                    inputText={t('nav.link6')}
                  />
                </Navbar>
              }
              header={
                <Header height={70} p="sm">
                  {/* You can handle other responsive styles with MediaQuery component or createStyles function */}
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                      <Burger
                        opened={menuOpen}
                        // onclick flip the value of menuOpen
                        onClick={() => setMenuOpen(!menuOpen)}
                        size="sm"
                        color="grey"
                        mr="xl"
                      />
                    </MediaQuery>

                    <Title order={2}>
                      <Link
                        href={{
                          pathname: '/',
                          query: query && query.lang ? `lang=${query.lang}` : 'lang=en',
                        }}
                        style={{ color: theme && theme === 'light' ? 'black' : 'white' }}
                      >
                        {t('nav.header')}
                      </Link>
                    </Title>
                    <Title order={2} sx={{ flexGrow: 1, paddingLeft: '5px' }}>
                      <Link
                        href={{
                          pathname: '/',
                          query: query && query.lang ? `lang=${query.lang}` : 'lang=en',
                        }}
                        style={{ color: theme && theme === 'light' ? 'black' : 'white' }}
                      >
                        {environment && environment === 'staging' ? t('nav.staging') : null}
                      </Link>
                    </Title>

                    <Group position="center" spacing="xs">
                      <Menu
                        id="long-menu"
                        closeonscroll="false"
                        gutter={20}
                        size="md"
                        shadow="xl"
                        title="Translate"
                      >
                        <Menu.Target>
                          <ActionIcon variant="hover"><IoLanguageOutline /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          {locales.map((option) => (
                            <Menu.Item
                              component="a"
                              href={`?lang=${option.language}`}
                              locale={query && query.lang ? `lang=${query.lang}` : 'lang=en'}
                              key={option.language}
                              selected={option.language === query}
                              passHref
                            >
                              <LanguageSwitcher lang={option.language}>
                                {option.aka}
                              </LanguageSwitcher>
                            </Menu.Item>
                          ))}
                        </Menu.Dropdown>
                      </Menu>

                      <ActionIcon
                        onClick={() => toggleColorScheme()}
                        color={theme && theme === 'dark' ? 'yellow' : 'blue'}
                        variant="hover"
                        title="Toggle color scheme"
                      >
                        {
                          theme && theme === 'dark'
                            ? <IoSunnyOutline />
                            : <IoMoonOutline />
                        }
                      </ActionIcon>

                      <Link href={`https://twitter.com/${config.twitter}`} passHref>
                        <ActionIcon
                          variant="hover"
                          title="Twitter"
                        >
                          <IoLogoTwitter />
                        </ActionIcon>
                      </Link>

                      <Link href={`https://hive.blog/@${config.hive}`} passHref>
                        <ActionIcon
                          variant="hover"
                          color="red"
                          title="Hive"
                        >
                          <SiHiveBlockchain />
                        </ActionIcon>
                      </Link>
                    </Group>

                  </div>
                </Header>
              }
            >
              <NormalizeCSS />
              <Container fluid>
                <Component {...pageProps} />
                <Analytics />
                <Grid>
                  <Col span={12} xs={12} key="footer 0" sx={{ textAlign: 'center' }}>
                    <Divider style={{ marginTop: '15px' }} />
                  </Col>
                  <Col span={12} xs={12} sm={12} md={6} key="footer 1">
                    <Title order={4}>
                      {config.title}
                    </Title>
                    <Text size="md">
                      {t('nav.footer_1')}
                    </Text>
                    <Text size="sm">
                      {t('nav.footer_2')}
                    </Text>
                    <Text size="sm">
                      {t('nav.footer_3')}<Link style={{ color: 'primary' }} href="https://nextjs.org/" passHref>Next.js</Link>{t('nav.footer_4')}<Link href="https://vercel.com" passHref>Vercel</Link>
                    </Text>
                  </Col>
                  <Col span={12} xs={12} sm={12} md={2} key="footer 2">
                    <Text size="xl">
                      {t('nav.footer_links')}
                    </Text>
                    <Link href="https://github.com/bitshares" passHref>
                        GitHub
                    </Link>
                    <br />
                    <Link href="https://bitsharestalk.org/" passHref>
                        Forum
                    </Link>
                    <br />
                    <Link href="https://github.com/bitshares/awesome-bitshares" passHref>
                        Awesome-Bitshares
                    </Link>
                    <br />
                    <Link href="https://bitshares.build/" passHref>
                        Bitshares.Build
                    </Link>
                    <br />
                    <Link href="https://bitsharesgroup.org/" passHref>
                        Bitshares Group
                    </Link>
                  </Col>
                  <Col span={12} xs={12} sm={12} md={2} key="footer 3">
                    <Text size="xl">
                      {t('nav.footer_wallets')}
                    </Text>
                    <Link href="https://wallet.bitshares.org" passHref>
                        Bitshares.org
                    </Link>
                    <br />
                    <Link href="https://ex.xbts.io/" passHref>
                        XBTS.io
                    </Link>
                    <br />
                    <Link href="https://dex.iobanker.com/" passHref>
                        ioBanker DEX
                    </Link>
                    <br />
                    <Link href="https://wallet.btwty.com" passHref>
                        BTWTY.com
                    </Link>
                  </Col>
                  <Col span={12} xs={12} sm={12} md={2} key="footer 4">
                    <Text size="xl">
                      {t('nav.footer_markets')}
                    </Text>
                    <Link href="https://cryptoindex.org/coin/bitshares" passHref>
                        CryptoIndex
                    </Link>
                    <br />
                    <Link href="https://blocktivity.info/coin/bts_0" passHref>
                        Blocktivity
                    </Link>
                    <br />
                    <Link href="https://www.coingecko.com/en/coins/bitshares" passHref>
                        CoinGecko
                    </Link>
                    <br />
                    <Link href="https://coinmarketcap.com/currencies/bitshares/" passHref>
                        CoinMarketCap
                    </Link>
                    <br />
                    <Link href="https://www.worldcoinindex.com/coin/bitshares" passHref>
                        WorldCoinIndex
                    </Link>
                    <br />
                    <Link href="https://coincodex.com/crypto/bitshares/" passHref>
                        CoinCodex
                    </Link>
                    <br />
                    <Link href="https://nomics.com/assets/bts-bitshares" passHref>
                        Nomics
                    </Link>
                    <br />
                    <Link href="https://bitgur.com/coin/BTS" passHref>
                        Bitgur
                    </Link>
                    <br />
                    <Link href="https://messari.io/asset/bitshares" passHref>
                        Messari
                    </Link>
                  </Col>
                </Grid>
              </Container>
            </AppShell>
          </TypographyStylesProvider>
      </MantineProvider>
  );
}

export default MyApp;
