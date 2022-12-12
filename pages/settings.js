import {
  useTranslation,
  useLanguageQuery,
} from 'next-export-i18n';
import dynamic from 'next/dynamic';

import {
  IoSettingsOutline,
  IoCellularOutline,
  IoCheckmark,
  IoWifiOutline,
} from 'react-icons/io5';
import { Grid, Col, Paper, Group, Button, Menu } from '@mantine/core';

import configJSONImport from '../components/config.json' assert {type: 'json'};
import ipfsJSONImport from '../components/ipfsJSON.json' assert {type: 'json'};
import btsJSONImport from '../components/btsJSON.json' assert {type: 'json'};
import btsTestnetJSONImport from '../components/btsTestnetJSON.json' assert {type: 'json'};

import { useAppStore } from '../components/states';

const SEO = dynamic(() => import('../components/SEO'));

function Settings(properties) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const environment = useAppStore((state) => state.environment);
  const setEnvironment = useAppStore((state) => state.setEnvironment);
  const gateway = useAppStore((state) => state.gateway);
  const setGateway = useAppStore((state) => state.setGateway);

  const prodNetwork = useAppStore((state) => state.prodNetwork);
  const setProdNetwork = useAppStore((state) => state.setProdNetwork);
  const testNetwork = useAppStore((state) => state.testNetwork);
  const setTestNetwork = useAppStore((state) => state.setTestNetwork);

  const { config } = properties;
  const { ipfsJSON } = properties;
  const { btsJSON } = properties;
  const { btsTestnetJSON } = properties;

  const network = environment === 'production'
    ? btsJSON
    : btsTestnetJSON;

  return ([
    <SEO
      description={t('settings.header_description', { title: config.title })}
      title={t('settings.header_title')}
      siteTitle={config.title}
      key="SEO"
    />,
    <Grid grow key="Settings">
      <Col span={12}>
        <Paper p="md" shadow="xs" align="center">
          <Group position="center">
            <Menu
              id="long-menu"
              closeonscroll="false"
              size="sm"
              shadow="xl"
            >
              <Menu.Target>
                <Button leftIcon={<IoCellularOutline />} variant="outline" color="gray"> {t('settings.ipfs')}</Button>
              </Menu.Target>
              <Menu.Dropdown>
                {ipfsJSON.map((key, value) => (
                  <Menu.Item
                    locale={query && query.lang ? query.lang : 'en'}
                    key={`ipfs gateway ${value}`}
                    icon={key === gateway ? <IoCheckmark /> : null}
                    onClick={() => {
                      setGateway(key);
                    }}
                  >
                    {key}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

            <Menu
              id="long-menu"
              closeonscroll="false"
              size="sm"
              shadow="xl"
            >
              <Menu.Target>
                <Button leftIcon={<IoSettingsOutline />} variant="outline" color="gray"> {t('settings.environment')}</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  key="production button"
                  icon={environment === 'production' ? <IoCheckmark /> : null}
                  onClick={() => { setEnvironment('production'); }}
                >
                  Production
                </Menu.Item>
                <Menu.Item
                  key="staging button"
                  icon={environment === 'staging' ? <IoCheckmark /> : null}
                  onClick={() => { setEnvironment('staging'); }}
                >
                  Staging
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu
              id="long-menu"
              closeonscroll="false"
              size="sm"
              shadow="xl"
            >
              <Menu.Target>
                <Button leftIcon={<IoWifiOutline />} variant="outline" color="gray"> {t('settings.connection')}</Button>
              </Menu.Target>
              <Menu.Dropdown>
                {network.map((key, value) => (
                  <Menu.Item
                    locale={query && query.lang ? query.lang : 'en'}
                    key={`BTS network ${value}`}
                    icon={key === (environment === 'production' ? prodNetwork : testNetwork) ? <IoCheckmark /> : null}
                    onClick={() => {
                      environment === 'production'
                        ? setProdNetwork(key)
                        : setTestNetwork(key);
                    }}
                  >
                    {key}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

          </Group>
        </Paper>
      </Col>
    </Grid>,
  ]);
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    config: configJSONImport,
    ipfsJSON: ipfsJSONImport,
    btsJSON: btsJSONImport,
    btsTestnetJSON: btsTestnetJSONImport,
  },
});

export default Settings;
