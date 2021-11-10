import { Text, Group } from '@mantine/core';

import useSWR from 'swr';

const axios = require('axios');
import { useEnvironment } from './states';

const fetcher = async (url) => await axios.get(url);

export default function MarketOrders(properties) {

  const [environment, setEnvironment] = useEnvironment();

  const id = properties.id ? properties.id : null;
  const market = properties.market ? properties.market : null;
  const whitelist_markets = properties.whitelist_markets ? properties.whitelist_markets : null;

  let approvedMarket;
  if (market) {
    approvedMarket = market;
  } else if (whitelist_markets && (whitelist_markets.length > 0)) {
    approvedMarket = whitelist_markets[0];
  } else {
    approvedMarket = "BTS";
  }

  const { data, error } = useSWR(
    `https://${environment === "staging" ? `api.testnet` : `api`}.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    fetcher
  );

  if (error || !data) {
    return (<Text>Market data temporarily unavailable</Text>);
  };

  let marketOrders = data.data;

  let bids = marketOrders
              ? marketOrders["bids"]
              : undefined;

  let bidText = bids && bids.length
                  ? <Text>{`Buy it now price: ${1/bids[0].price} ${approvedMarket}`}</Text>
                  : <Text>Not currently for sale.</Text>;

    /*
    let asks = marketOrders
                ? marketOrders["asks"]
                : undefined;

    let askText = asks && asks.length
                    ? <Text>{`Highest bid: ${1/asks[0].price} ${approvedMarket}`}</Text>
                    : <Text>Not for sale.</Text>;
    */

    return (
      <Group position="center" sx={{marginTop: '5px', paddingTop: '5px'}}>
        {bidText}
      </Group>
    )

}
