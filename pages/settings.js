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

  const prodConnection = useAppStore((state) => state.prodConnection);
  const setProdConnection = useAppStore((state) => state.setProdConnection);
  const testnetConnection = useAppStore((state) => state.testnetConnection);
  const setTestnetConnection = useAppStore((state) => state.setTestnetConnection);

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
                <Button leftIcon={<IoCellularOutline />} variant="outline" color="gray"> Change IPFS</Button>
              </Menu.Target>
              <Menu.Dropdown>
                {ipfsJSON.map((key, value) => (
                  <Menu.Item
                    locale={query && query.lang ? query.lang : 'en'}
                    key={`ipfs gateway ${value}`}
                    icon={key === gateway ? <IoCheckmark /> : null}
                    onClick={() => { setGateway(key); }}
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
                <Button leftIcon={<IoSettingsOutline />} variant="outline" color="gray"> Change Environment</Button>
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
              size="lg"
              shadow="xl"
            >
              <Menu.Target>
                <Button leftIcon={<IoWifiOutline />} variant="outline" color="gray"> BTS DEX connection</Button>
              </Menu.Target>
              <Menu.Dropdown>
                {network.map((key, value) => (
                  <Menu.Item
                    locale={query && query.lang ? query.lang : 'en'}
                    key={`BTS network ${value}`}
                    icon={key === (environment === 'production' ? prodConnection : testnetConnection) ? <IoCheckmark /> : null}
                    onClick={() => {
                      environment === 'production'
                        ? setProdConnection(key)
                        : setTestnetConnection(key);
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
