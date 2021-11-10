import { Text } from '@mantine/core';
import useSWR from 'swr';

const axios = require('axios');
import { useEnvironment } from './states';

const fetcher = async (url) => await axios.get(url);

export default function CurrentValue(properties) {
  const [environment, setEnvironment] = useEnvironment();

  const env = process.env.NODE_ENV
  const id = properties.id ? properties.id : null;
  const market = properties.market ? properties.market : null;

  let approvedMarket = market ? market : "BTS";

  const { data, error } = useSWR(
    env === "development"
    ? ""
    : `https://${environment === "staging" ? `api.testnet` : `api`}.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    fetcher
  );

  if (error || !data || env === "development") {
    return null
  };

  let bids = data.data
              ? data.data["bids"]
              : undefined;

  return bids && bids.length
          ? `${bids[0].quote} ${market}`
          : null;
}
