import { Text, Group, Button } from '@mantine/core';
import Script from 'next/script';
import useSWR from 'swr';
const axios = require('axios');
import { useTranslation } from 'next-i18next';

import { useEnvironment, useProdConnection, useTestnetConnection } from './states';
const fetcher = async (url) => await axios.get(url);

export default function MarketOrders(properties) {
  const { t } = useTranslation('marketorders');

  const [environment, setEnvironment] = useEnvironment();
  const [prodConnection, setProdConnection] = useProdConnection();
  const [testnetConnection, setTestnetConnection] = useTestnetConnection();
  let wsURL = environment === 'production'
                ? prodConnection
                : testnetConnection;

  let notifications = properties.notifications;
  let beet = properties.beet;
  let setBeet = properties.setBeet;
  let buyViaBeet = properties.buyViaBeet;
  let setViaBeet = properties.setViaBeet;
  let symbol = properties.symbol;
  const env = process.env.NODE_ENV;

  function attemptConnection() {
    var Socket = require('simple-websocket');
    let socket = new Socket('ws://localhost:60555');
    socket.on('error', function (error) {
      console.log("Beet not detected");

      const id = notifications.showNotification({
        title: t('connection_failure_title'),
        id: 'beetError',
        autoClose: 10000,
        message: (
          <>
            <div style={{ display: 'flex', paddingTop: 5 }}>
              <Group direction="column">
                <Text sx={{ flex: 1, marginRight: 15 }}>
                  {t('connection_failure_msg')}
                </Text>
                <a href="https://github.com/bitshares/beet/releases/latest" passHref>
                  <Button>
                    {t('connection_failure_button')}
                  </Button>
                </a>
              </Group>
            </div>
          </>
        )
      });

      setBeet(false);
      setViaBeet(false);
    })

    socket.on('close', function () {
      console.log("Beet check complete");
    })

    socket.on('connect', function () {
      // socket is connected!
      const id = notifications.showNotification({
        title: t('connection_valid_title'),
        id: 'beetValid',
        message: (
          <>
            <div style={{ display: 'flex', paddingTop: 5 }}>
              <Text size="sm" sx={{ flex: 1, marginRight: 15 }}>
                {t('connection_valid_msg')}
              </Text>
            </div>
          </>
        )
      });

      setBeet(true);
      setViaBeet(false);
      socket.destroy()
    })
  }

  function beetBuy() {
    setViaBeet(true);
    setBeet(false);

    const id = notifications.showNotification({
      title: t('beet_buy_title'),
      id: 'beetPurchase',
      autoClose: 10000,
      onClose: () => { setViaBeet(false) },
      message: (
        <>
          <div style={{ display: 'flex', paddingTop: 5 }}>
            <Text size="sm" sx={{ flex: 1, marginRight: 15 }}>
              {t('beet_buy_msg')}
            </Text>
          </div>
        </>
      )
    });

  }

  function GetID(assetName) {
    const { data, error } = useSWR(
      env === "development"
        ? `http://localhost:8082/proxy/openexplorer/asset?asset_id=${assetName}`
        : `https://${environment === "staging" ? `api.testnet` : `api`}.bitshares.ws/openexplorer/asset?asset_id=${assetName}`,
      fetcher
    );
    if (data && !error) {
      return data.data.id;
    }
  }

  const id = properties && properties.id ? properties.id : null;
  const market = properties && properties.market ? properties.market : null;
  const whitelist_markets = properties && properties.whitelist_markets ? properties.whitelist_markets : null;

  let approvedMarket;
  if (market) {
    approvedMarket = market;
  } else if (whitelist_markets && (whitelist_markets.length > 0)) {
    approvedMarket = whitelist_markets[0];
  } else {
    approvedMarket = "BTS";
  }

  const approvedMarketID = GetID(approvedMarket);
  const symbolID = GetID(symbol);

  const { data, error } = useSWR(
    env === "development"
      ? `http://localhost:8082/proxy/openexplorer/order_book?base=${id}&quote=${approvedMarket}`
      : `https://${environment === "staging" ? `api.testnet` : `api`}.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    fetcher
  );

  if (error || !data) {
    return (<Text>{t('market_data_fail')}</Text>);
  };

  let marketOrders = data.data;

  let bids = marketOrders
              ? marketOrders["bids"]
              : undefined;

  let bidText = null;
  let beetResponse = null;
  if (bids && bids.length) {
    bidText = <Text>{`${t('buy_now')}: ${bids[0].quote} ${approvedMarket}`}</Text>
    beetResponse = !beet && !properties.account
                    ? <Button
                        sx={{marginTop: '15px'}}
                        onClick={() => {
                          attemptConnection()
                        }}
                       >
                        {t('beet_connect_button')}
                      </Button>
                    : <Button
                        sx={{marginTop: '15px'}}
                        onClick={() => {
                          beetBuy()
                        }}
                       >
                       {t('beet_buy_button')}
                      </Button>
  } else {
    bidText = <Text>{t('not_for_sale')}</Text>;
  }

  window.setAccount = properties.setAccount;
  window.account = properties.account;

  function errorNotification () {
    notifications.showNotification({
      title: t('error_note_title'),
      id: 'beetTXError',
      autoClose: 10000,
      message: (
        <>
          <div style={{ display: 'flex', paddingTop: 5 }}>
            <Text size="sm" sx={{ flex: 1, marginRight: 15 }}>
              {t('error_note_msg')}
            </Text>
          </div>
        </>
      )
    });
  }

  window.errorNotification = errorNotification;

  let beetBuyScript = buyViaBeet
                        ? (
                            <Script
                              id="beet-buy"
                              dangerouslySetInnerHTML={{
                                __html: `
                                  let failure = async function(e) {
                                    console.log(e);
                                    errorNotification();
                                  }

                                  let init = async function() {
                                    beet.allowLocalhostFallback();
                                    let app;
                                    try {
                                      app = await beet.get("NFTEA Gallery", "BTS");
                                    } catch (e) {
                                      failure(e);
                                      return;
                                    }

                                    TransactionBuilder = app.BTS.inject(bitshares_js.TransactionBuilder, {sign: true, broadcast: false});
                                    let account = !window.account ? app.BTS.getAccount() : window.account;
                                    window.setAccount(account);

                                    TransactionBuilder = app.BTS.inject(bitshares_js.TransactionBuilder);

                                    try {
                                      await bitshares_js.bitshares_ws.Apis.instance(
                                          "${wsURL}",
                                          true,
                                          10000,
                                          {enableCrypto: false, enableOrders: false},
                                          (err) => console.log(err),
                                      ).init_promise;
                                    } catch (e) {
                                      failure(e);
                                      return;
                                    }

                                    let  tr = new TransactionBuilder();
                                    let transfer_op = tr.get_type_operation("limit_order_create", {
                                        fee: {
                                            amount: 0,
                                            asset_id: "1.3.0"
                                        },
                                        seller: account.id,
                                        amount_to_sell: {
                                          amount: ${bids[0].quote*100000},
                                          asset_id: "${approvedMarketID}"
                                        },
                                        min_to_receive: {
                                          amount: 1,
                                          asset_id: "${symbolID}"
                                        },
                                        fill_or_kill: true,
                                        expiration: 100000
                                    });

                                    tr.add_operation(transfer_op);

                                    try {
                                      await tr.set_required_fees();
                                    } catch (e) {
                                      failure(e);
                                      return;
                                    }

                                    try {
                                      await tr.update_head_block();
                                    } catch (e) {
                                      failure(e);
                                      return;
                                    }

                                    tr.add_signer("inject_wif");
                                    try {
                                      await tr.broadcast();
                                    } catch (e) {
                                      failure(e);
                                      return;
                                    }
                                  }
                                  init();
                                `
                              }}
                            />
                          )
                        : null;

    return (
      <Group direction="column" position="center" sx={{marginTop: '5px', paddingTop: '5px'}}>
        {bidText}
        {bids && bids.length ? beetResponse : null}
        {bids && bids.length ? beetBuyScript : null}
      </Group>
    )

}
