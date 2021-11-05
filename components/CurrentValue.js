import Typography from '@mui/material/Typography';
import useSWR from 'swr';

const axios = require('axios');

const fetcher = async (url) => await axios.get(url);

export default function CurrentValue(properties) {

  const id = properties.id ? properties.id : null;
  const market = properties.market ? properties.market : null;

  let approvedMarket = market ? market : "BTS";

  const { data, error } = useSWR(
    `https://api.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    fetcher
  );

  if (error) {
    return null
  };

  if (!data) {
    return null;
  };

  let bids = data.data
              ? data.data["bids"]
              : undefined;

  return <Typography key={`${id} value`}  variant="body2" gutterBottom>
            {
              bids && bids.length
                ? `${bids[0].quote} ${market}`
                : <p>??? {market}</p>
            }
          </Typography>;
}
