import { Text, Stack, Button } from '@mantine/core';
import useSWR from 'swr';
import {
  useTranslation,
} from 'next-export-i18n';
import axios from 'axios';
import { useAppStore } from './states';

// eslint-disable-next-line no-return-await
const fetcher = async (url) => await axios.get(url);

export default function MarketOrders(properties) {
  const { t } = useTranslation();

  const environment = useAppStore((state) => state.environment);
  const prodConnection = useAppStore((state) => state.prodConnection);
  const testnetConnection = useAppStore((state) => state.testnetConnection);

  const wsURL = environment === 'production'
    ? prodConnection
    : testnetConnection;

  const { symbol } = properties;
  const env = process.env.NODE_ENV;

  /*
  function GetID(assetName) {
    const { data, error } = useSWR(
      env === 'development'
        ? `http://localhost:8082/proxy/openexplorer/asset?asset_id=${assetName}`
        : `https://${environment === 'staging' ? 'api.testnet' : 'api'}.bitshares.ws/openexplorer/asset?asset_id=${assetName}`,
      fetcher
    );
    if (data && !error) {
      return data.data.id;
    }
  }
  */

  const id = properties && properties.id ? properties.id : null;
  const market = properties && properties.market ? properties.market : null;
  const whitelist_markets = properties && properties.whitelist_markets
    ? properties.whitelist_markets
    : null;

  let approvedMarket;
  if (market) {
    approvedMarket = market;
  } else if (whitelist_markets && (whitelist_markets.length > 0)) {
    [approvedMarket] = whitelist_markets;
  } else {
    approvedMarket = 'BTS';
  }

  const { data, error } = useSWR(
    env === 'development'
      ? `http://localhost:8082/proxy/openexplorer/order_book?base=${id}&quote=${approvedMarket}`
      : `https://${environment === 'staging' ? 'api.testnet' : 'api'}.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    fetcher
  );

  if (error || !data) {
    return (<Text>{t('marketorders.market_data_fail')}</Text>);
  }

  const marketOrders = data.data;

  const bids = marketOrders
    ? marketOrders.bids
    : undefined;

  const bidText = bids && bids.length
    ? <Text>{`${t('marketorders.buy_now')}: ${bids[0].quote} ${approvedMarket}`}</Text>
    : <Text>{t('marketorders.not_for_sale')}</Text>;

  return (
      <Stack position="center" sx={{ marginTop: '5px', paddingTop: '5px' }}>
        {bidText}
      </Stack>
  );
}
