import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useNotifications } from '@mantine/notifications';

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";

import { Text, Center, Grid, Col, Divider, Paper, ActionIcon, Button } from '@mantine/core'

import { connect, link, checkBeet } from 'beet-esm';
import { useEnvironment, useProdConnection, useTestnetConnection } from '../components/states';
import Bid from '../components/beet/bid';
import GetAccount from '../components/beet/getAccount';
import SignMessage from '../components/beet/signMessage';
import Transfer from '../components/beet/transfer';
import Vote from '../components/beet/vote';

import { analyticsNotification } from '../lib/analyticsNotification';

const SEO = dynamic(() => import('../components/SEO'));
import { useAnalytics, useApproval, useBeetIdentity } from '../components/states';

function beetPage(properties) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const config = properties.config;
  const notifications = useNotifications();

  const [connection, setConnection] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [identity, setIdentity] = useBeetIdentity(null);

  let [analytics, setAnalytics] = useAnalytics();
  let [approval, setApproval] = useApproval();

  const [environment, setEnvironment] = useEnvironment();
  const [prodConnection, setProdConnection] = useProdConnection();
  const [testnetConnection, setTestnetConnection] = useTestnetConnection();
  let wsURL = environment === 'production'
                ? prodConnection
                : testnetConnection;

  async function ping() {
    let checkedBeet;
    try {
      checkedBeet = await checkBeet();
    } catch (error) {
      console.error(error)
    }
    console.log(checkedBeet);
  }

  async function connectToBeet() {
    let connected;
    try {
      connected = await connect(
        "NFTEA Gallery",
        "Firefox",
        "nftea.gallery",
        connection ? connection : null,
        connection && connection.identity ? connection.identity : null
      );
    } catch (error) {
      console.error(error)
    }

    if (!connected) {
      console.error("Couldn't connect to Beet");
      setConnection(null);
      return;
    }

    setConnection(connected);
    setAuthenticated(connected.authenticated);
  }

  /*
   * After connection attempt to link app to Beet client
   */
  async function linkToBeet() {
    if (!connection) {
      console.log("Missing Beet connection");
      return;
    }

    let linkAttempt;
    try {
      linkAttempt = await link("BTS", connection);
    } catch (error) {
      console.error(error)
      return;
    }

    if (connection.secret) {
      console.log('Successfully linked')
      setIsLinked(true);
      setIdentity(connection.identity);
    }
  }

  /*
   * For testing purposes - remove identity settings
   */
  function removeIdentity() {
    let adjustedConnection = connection;
    if (adjustedConnection) {
      delete adjustedConnection['isLinked'];
      delete adjustedConnection['identity'];
      delete adjustedConnection['identityhash'];
      delete adjustedConnection['app'];
      delete adjustedConnection['existing'];
    }
    setAuthenticated(false);
  }

  function disconnect() {
    setConnection(null);
    setAuthenticated(false);
  }

  return ([
    <SEO
      description={'beet test page'}
      title={'beet test page'}
      siteTitle={'beet test page'}
      key={'SEO'}
    />,
    <Grid key={"about"} grow>
      <Col span={12}>
        <Paper padding="md" shadow="xs">
          <Text size="lg">
            Beet test page!
          </Text>
          <Button
            sx={{marginTop: '15px'}}
            onClick={() => {
              ping()
            }}
           >
           Ping!
          </Button>
          <br/>
          <Button
            sx={{marginTop: '15px'}}
            onClick={() => {
              connectToBeet()
            }}
           >
            Connect to Beet
          </Button>
          <br/>
          <Button
            sx={{marginTop: '15px'}}
            onClick={() => {
              linkToBeet()
            }}
           >
            Link to Beet wallet
          </Button>
          <Text size="md">
            Connection: {connection && connection.connected ? 'true' : 'false'}<br/>
            Authenticated: {authenticated ? 'true' : 'false'}<br/>
            Connection link: {connection && connection.linked ? 'true' : 'false'}<br/>
            link state: {isLinked ? 'true' : 'false'}
          </Text>
          <br/>
          {
            connection
            ? <Button
                sx={{marginTop: '15px'}}
                onClick={() => {
                  disconnect()
                }}
               >
               Disconnect
              </Button>
            : null
          }
          <br/>
          {
            connection && isLinked
            ? [
                <Button
                  sx={{marginTop: '15px'}}
                  onClick={() => {
                    removeIdentity()
                  }}
                >
                  Remove link
                </Button>,
                <Divider style={{marginTop: '15px'}}/>,
                <br/>,
                <Bid
                  connection={connection}
                  wsURL={wsURL}
                />,
                <Divider style={{marginTop: '15px'}}/>,
                <br/>,
                <GetAccount
                  connection={connection}
                  wsURL={wsURL}
                />,
                <Divider style={{marginTop: '15px'}}/>,
                <br/>,
                <SignMessage
                  connection={connection}
                  wsURL={wsURL}
                />,
                <Divider style={{marginTop: '15px'}}/>,
                <br/>,
                <Transfer
                  connection={connection}
                  wsURL={wsURL}
                />,
                <Divider style={{marginTop: '15px'}}/>,
                <br/>,
                <Vote
                  connection={connection}
                  wsURL={wsURL}
                />,
              ]
            : null
          }
          <br/>
          {
            wsURL
          }
          <br/>
          {
            environment
          }
        </Paper>
      </Col>
    </Grid>
  ]);
}

export const getStaticProps = async ({ locale }) => {

  const config = require('../components/config.json');

  return {
    props: {
      config: config,
    }
  };
}

export default beetPage
