import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { IoSettingsOutline, IoCellularOutline, IoAnalyticsOutline, IoCheckmark } from "react-icons/io5";
import { Text, Grid, Col, Paper, Group, Button, Menu, ActionIcon } from '@mantine/core'

const SEO = dynamic(() => import('../components/SEO'));
import { useGateway, useTheme, useLanguage, useEnvironment, useAnalytics } from '../components/states';

function Settings(properties) {
  const { t } = useTranslation('settings');

  const [language, setLanguage] = useLanguage();
  const [environment, setEnvironment] = useEnvironment();
  const [analytics, setAnalytics] = useAnalytics();
  const [theme, setTheme] = useAnalytics();
  const [gateway, setGateway] = useGateway('cf-ipfs.com');

  const config = properties.config;
  const ipfsJSON = properties.ipfsJSON;

  useEffect(() => {
    async function sendAnalytics() {
      if (analytics && config.google_analytics.length) {
        const ReactGA = (await import('react-ga4')).default
        ReactGA.initialize(config.google_analytics);
        ReactGA.pageview('Settings')
      }
    }
    sendAnalytics();
  }, [analytics]);

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <Grid grow key={"Search Window"}>
      <Col span={12} key={"Search row"}>
        <Paper padding="md" shadow="xs" align="center">
          <Group position="center">
            <Menu
              id="long-menu"
              trigger="click"
              closeOnScroll={false}
              control={<Button leftIcon={<IoCellularOutline />} variant='outline' color={'gray'}> Change IPFS</Button>}
              size="sm"
              shadow="xl"
            >
              {ipfsJSON.map((key, value) => (
                <Menu.Item
                  locale={language}
                  key={`ipfs gateway ${value}`}
                  icon={key === gateway ? <IoCheckmark /> : null}
                  onClick={() => { setGateway(key) }}
                >
                  {key}
                </Menu.Item>
              ))}
            </Menu>

            <Menu
              id="long-menu"
              trigger="click"
              closeOnScroll={false}
              control={<Button leftIcon={<IoSettingsOutline />} variant='outline' color={'gray'}> Change Environment</Button>}
              size="sm"
              shadow="xl"
            >
              <Menu.Item
                key={`production button`}
                icon={environment === 'production' ? <IoCheckmark /> : null}
                onClick={() => { setEnvironment('production') }}
              >
                Production
              </Menu.Item>
              <Menu.Item
                key={`staging button`}
                icon={environment === 'staging' ? <IoCheckmark /> : null}
                onClick={() => { setEnvironment('staging') }}
              >
                Staging
              </Menu.Item>
            </Menu>

            <Menu
              id="long-menu"
              trigger="click"
              closeOnScroll={false}
              control={<Button leftIcon={<IoAnalyticsOutline />} variant='outline' color={'gray'}> Analytics preferences</Button>}
              size="sm"
              shadow="xl"
            >
              <Menu.Item
                key={`analytics option`}
                icon={analytics == true ? <IoCheckmark /> : null}
                onClick={() => { setAnalytics(true) }}
              >
                Enable
              </Menu.Item>
              <Menu.Item
                key={`no analytics option`}
                icon={analytics == false ? <IoCheckmark /> : null}
                onClick={() => { setAnalytics(false) }}
              >
                Disable
              </Menu.Item>
            </Menu>
          </Group>
        </Paper>
      </Col>
    </Grid>
  );
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');
  let ipfsJSON = require('../components/ipfsJSON.json');
  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      config: config,
      ipfsJSON: ipfsJSON,
      ...(await serverSideTranslations(locale, ['settings', 'nav'])),
    }
  };
}

export default Settings;
