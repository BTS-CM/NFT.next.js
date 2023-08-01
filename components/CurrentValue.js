import useSWR from 'swr';
import { useAppStore } from './states';

const axios = require('axios');

// eslint-disable-next-line no-return-await
const fetcher = async (url) => await axios.get(url);

export default function CurrentValue(properties) {
  const environment = useAppStore((state) => state.environment);

  const env = process.env.NODE_ENV;
  const id = properties.id ? properties.id : null;
  const market = properties.market ? properties.market : null;

  const approvedMarket = market || 'BTS';

  const { data, error } = useSWR(
    env === 'development'
      ? ''
      : `https://${environment === 'staging' ? 'api.testnet' : 'api'}.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    fetcher
  );

  if (error || !data || env === 'development') {
    return null;
  }

  const bids = data.data
    ? data.data.bids
    : undefined;

  return bids && bids.length
    ? `${1 / bids[0].price} ${market}`
    : null;
}
