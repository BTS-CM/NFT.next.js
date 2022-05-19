import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import Head from 'next/head'
import Script from "next/script";
import Image from 'next/image';

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Menu,
  MantineProvider,
  NormalizeCSS,
  GlobalStyles,
  Grid,
  Col,
  Container,
  Divider,
  Text,
  Button,
  ActionIcon,
  TypographyStylesProvider,
  ColorSchemeProvider,
  Title
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

import { IoLanguageOutline, IoSunnyOutline, IoMoonOutline, IoLogoTwitter } from "react-icons/io5";

import '../components/noScrollbars.css';

import NavButton from "../components/NavButton";

import { useTheme, useEnvironment, useMenuOpen } from '../components/states';
import config from "../components/config.json";
const locales = [
  {'language': 'en', 'aka': 'English'},
  {'language': 'zhTW', 'aka': '臺灣的'},
  {'language': 'ru', 'aka': 'русский'},
  {'language': 'ee', 'aka': 'Eestlane'},
  {'language': 'da', 'aka': 'Dansk'},
  {'language': 'de', 'aka': 'Deutsche'},
  {'language': 'es', 'aka': 'Español'},
  {'language': 'th', 'aka': 'ไทย'},
  {'language': 'it', 'aka': 'Italiano'},
  {'language': 'fr', 'aka': 'Français'},
  {'language': 'ko', 'aka': '한국어'},
  {'language': 'pt', 'aka': 'Português'},
  {'language': 'ja', 'aka': '日本語'}
];

function MyApp(props) {
  const { Component, pageProps } = props;
  const { hovered, ref } = useHover();

  const router = useRouter();
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const [colorScheme, setColorScheme] = useTheme();
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [environment, setEnvironment] = useEnvironment();
  const [menuOpen, setMenuOpen] = useMenuOpen();

  return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" key="twcard" />
      </Head>,
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ colorScheme }}
          >
            <NotificationsProvider>
              <GlobalStyles />
              <TypographyStylesProvider sx={{textDecoration: "none"}}>
                <AppShell
                  navbarOffsetBreakpoint="sm"
                  fixed
                  navbar={
                    <Navbar
                      padding="md"
                      hiddenBreakpoint="sm"
                      hidden={!menuOpen}
                      width={{ sm: 300, lg: 400 }}
                      zIndex={1}
                    >
                      <NavButton
                        url={"/"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link1')}
                      />
                      <NavButton
                        url={"/gallery"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link2')}
                      />
                      <NavButton
                        url={"/search"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link4')}
                      />
                      <NavButton
                        url={"/news"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link9')}
                      />
                      <NavButton
                        url={"/about"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link5')}
                      />
                      <NavButton
                        url={"/viewers"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link7')}
                      />
                      <NavButton
                        url={"/settings"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link8')}
                      />
                      <NavButton
                        url={"/license"}
                        colorScheme={colorScheme}
                        language={query && query.lang ? query.lang : 'en'}
                        inputText={t('nav.link6')}
                      />
                      <center>
                        <a href="https://assistant.google.com/services/invoke/uid/000000a4cdd55f35/alm/CgT3HfYlEgIQAQ==?hl=en">
                          <Image
                            width={`169px`}
                            height={`169px`}
                            src={
                              colorScheme === 'dark'
                                ? "/images/Google/night.webp"
                                : "/images/Google/action.webp"
                            }
                            alt="Approved Google Assistant Action"
                          />
                        </a>
                      </center>
                    </Navbar>
                  }
                  header={
                    <Header height={70} padding="sm">
                      {/* You can handle other responsive styles with MediaQuery component or createStyles function */}
                      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                          <Burger
                            opened={menuOpen}
                            onClick={() => setMenuOpen((o) => !o)}
                            size="sm"
                            color={"grey"}
                            mr="xl"
                          />
                        </MediaQuery>

                        <Title order={2}>
                          <Link
                            href={{
                              pathname: "/",
                              query: query && query.lang ? `lang=${query['lang']}` : `lang=en`
                            }}
                          >
                            <a style={{color: colorScheme === 'light' ? 'black' : 'white'}}>
                              {t('nav.header')}
                            </a>
                          </Link>
                        </Title>
                        <Title order={2} sx={{flexGrow: 1, paddingLeft: '5px'}}>
                          <Link
                            href={{
                              pathname: "/",
                              query: query && query.lang ? `lang=${query['lang']}` : `lang=en`
                            }}
                          >
                            <a style={{color: colorScheme === 'light' ? 'black' : 'white'}}>
                              {environment && environment === 'staging' ? t('nav.staging'): null}
                            </a>
                          </Link>
                        </Title>

                        <Menu
                          id="long-menu"
                          trigger="click"
                          closeOnScroll={false}
                          gutter={20}
                          control={<ActionIcon variant="hover"><IoLanguageOutline/></ActionIcon>}
                          size="sm"
                          shadow="xl"
                          title="Translate"
                        >
                          {locales.map((option) => (
                            <Menu.Item
                              component="a"
                              href={`?lang=${option.language}`}
                              locale={query && query.lang ? `lang=${query['lang']}` : `lang=en`}
                              key={option.language}
                              selected={option.language === query}
                              passHref
                            >
                              <LanguageSwitcher lang={option.language}>
                                {option.aka}
                              </LanguageSwitcher>
                            </Menu.Item>
                          ))}
                        </Menu>

                        <ActionIcon
                          onClick={() => toggleColorScheme()}
                          color={colorScheme === 'dark' ? 'yellow' : 'blue'}
                          variant="hover"
                          title="Toggle color scheme"
                        >
                          {
                            colorScheme === 'dark'
                              ? <IoSunnyOutline/>
                              : <IoMoonOutline/>
                          }
                        </ActionIcon>

                        <Link href={`https://twitter.com/${config.twitter}`} passHref>
                          <ActionIcon
                            variant="hover"
                            title="Twitter"
                          >
                            <IoLogoTwitter/>
                          </ActionIcon>
                        </Link>

                      </div>
                    </Header>
                  }
                >
                  <NormalizeCSS />
                  <Container fluid>
                    <Component {...pageProps} />
                    <Grid>
                      <Col span={12} xs={12} key={"footer 0"} sx={{textAlign: 'center'}}>
                        <Divider style={{marginTop: '15px'}}/>
                      </Col>
                      <Col span={12} xs={12} sm={12} md={6} key={"footer 1"}>
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
                          {t('nav.footer_3')}<Link style={{color: 'primary'}} href={"https://nextjs.org/"} passHref><a>Next.js</a></Link>{t('nav.footer_4')}<Link href={"https://vercel.com"} passHref><a sx={{color: 'text.primary'}}>Vercel</a></Link>
                        </Text>
                      </Col>
                      <Col span={12} xs={12} sm={12} md={2} key={"footer 2"}>
                        <Text size="xl">
                          {t('nav.footer_links')}
                        </Text>
                        <Link href={"https://github.com/bitshares"} passHref>
                          <a>
                            GitHub
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://bitsharestalk.org/"} passHref>
                          <a>
                            Forum
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://github.com/bitshares/awesome-bitshares"} passHref>
                          <a>
                            Awesome-Bitshares
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://bitshares.build/"} passHref>
                          <a>
                            Bitshares.Build
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://bitsharesgroup.org/"} passHref>
                          <a>
                            Bitshares Group
                          </a>
                        </Link>
                      </Col>
                      <Col span={12} xs={12} sm={12} md={2} key={"footer 3"}>
                        <Text size="xl">
                          {t('nav.footer_wallets')}
                        </Text>
                        <Link href={"https://wallet.bitshares.org"} passHref>
                          <a>
                            Bitshares.org
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://ex.xbts.io/"} passHref>
                          <a>
                            XBTS.io
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://dex.iobanker.com/"} passHref>
                          <a>
                            ioBanker DEX
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://www.gdex.io/"} passHref>
                          <a>
                            GDEX.io
                          </a>
                        </Link>
                      </Col>
                      <Col span={12} xs={12} sm={12} md={2} key={"footer 4"}>
                        <Text size="xl">
                          {t('nav.footer_markets')}
                        </Text>
                        <Link href={"https://cryptoindex.org/coin/bitshares"} passHref>
                          <a>
                            CryptoIndex
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://blocktivity.info/coin/bts_0"} passHref>
                          <a>
                            Blocktivity
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://www.coingecko.com/en/coins/bitshares"} passHref>
                          <a>
                            CoinGecko
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://coinmarketcap.com/currencies/bitshares/"} passHref>
                          <a>
                            CoinMarketCap
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://www.worldcoinindex.com/coin/bitshares"} passHref>
                          <a>
                            WorldCoinIndex
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://coincodex.com/crypto/bitshares/"} passHref>
                          <a>
                            CoinCodex
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://nomics.com/assets/bts-bitshares"} passHref>
                          <a>
                            Nomics
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://bitgur.com/coin/BTS"} passHref>
                          <a>
                            Bitgur
                          </a>
                        </Link>
                        <br/>
                        <Link href={"https://messari.io/asset/bitshares"} passHref>
                          <a>
                            Messari
                          </a>
                        </Link>
                      </Col>
                    </Grid>
                  </Container>
                </AppShell>
              </TypographyStylesProvider>
            </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
  );
}

export default MyApp
