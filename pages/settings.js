import { useEffect, useState } from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import dynamic from 'next/dynamic';
import Link from 'next/link';

import {
  IoSettingsOutline,
  IoCellularOutline,
  IoAnalyticsOutline,
  IoCheckmark,
  IoWifiOutline
} from "react-icons/io5";
import { Text, Grid, Col, Paper, Group, Button, Menu, ActionIcon } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';
import { analyticsNotification } from '../lib/analyticsNotification';

const SEO = dynamic(() => import('../components/SEO'));
import {
  useGateway,
  useEnvironment,
  useAnalytics,
  useApproval,
  useProdConnection,
  useTestnetConnection
 } from '../components/states';

function Settings(properties) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const [environment, setEnvironment] = useEnvironment();
  const [analytics, setAnalytics] = useAnalytics();
  let [approval, setApproval] = useApproval();
  const [gateway, setGateway] = useGateway('cf-ipfs.com');
  const [prodConnection, setProdConnection] = useProdConnection();
  const [testnetConnection, setTestnetConnection] = useTestnetConnection();
  const notifications = useNotifications();

  const config = properties.config;
  const ipfsJSON = properties.ipfsJSON;
  const btsJSON = properties.btsJSON;
  const btsTestnetJSON = properties.btsTestnetJSON;

  let network = environment === 'production'
                  ? btsJSON
                  : btsTestnetJSON;

  useEffect(() => {
    async function sendAnalytics() {
      if (approval === "request") {
        analyticsNotification(notifications, setApproval, setAnalytics)
      }
      if (analytics && config.google_analytics.length) {
        const ReactGA = (await import('react-ga4')).default
        ReactGA.initialize(config.google_analytics);
        ReactGA.pageview('Settings')
      }
    }
    sendAnalytics();
  }, [analytics]);

  return ([
    <SEO
      description={t('settings.header_description', {title: config.title})}
      title={t('settings.header_title')}
      siteTitle={config.title}
      key={'SEO'}
    />,
    <Grid grow key={"Settings"}>
      <Col span={12}>
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
                  locale={query && query.lang ? query.lang : 'en'}
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

            <Menu
              id="long-menu"
              trigger="click"
              closeOnScroll={false}
              control={<Button leftIcon={<IoWifiOutline />} variant='outline' color={'gray'}> BTS DEX connection</Button>}
              size="lg"
              shadow="xl"
            >
            {network.map((key, value) => (
              <Menu.Item
                locale={query && query.lang ? query.lang : 'en'}
                key={`BTS network ${value}`}
                icon={key === (environment === 'production' ? prodConnection : testnetConnection) ? <IoCheckmark /> : null}
                onClick={() => {
                  environment === 'production'
                    ? setProdConnection(key)
                    : setTestnetConnection(key)
                }}
              >
                {key}
              </Menu.Item>
            ))}
            </Menu>

          </Group>
        </Paper>
      </Col>
    </Grid>
  ]);
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');
  let ipfsJSON = require('../components/ipfsJSON.json');
  let btsJSON = require('../components/btsJSON.json');
  let btsTestnetJSON = require('../components/btsTestnetJSON.json');

  return {
    props: {
      config: config,
      ipfsJSON: ipfsJSON,
      btsJSON: btsJSON,
      btsTestnetJSON: btsTestnetJSON,
    }
  };
}

export default Settings;
