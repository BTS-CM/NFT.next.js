import Chip from '@mui/material/Chip';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';

const axios = require('axios');

const fetcher = async (url) => await axios.get(url);

export default function MarketOrders(properties) {

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
    `https://api.bitshares.ws/openexplorer/order_book?base=${id}&quote=${approvedMarket}`,
    fetcher
  );

  if (error) {
    return null
  };

  if (!data) {
    return null;
  };

  let marketOrders = data.data;

  let bids = marketOrders
              ? marketOrders["bids"]
              : undefined;

  let bidRows = bids && bids.length
                    ? bids.map((bid) => {
                        return (
                          <TableRow key={`tr bid ${bid.price}`}>
                              <TableCell component="th" scope="row">
                                {1/bid.price} {approvedMarket}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {bid.quote}
                              </TableCell>
                              <TableCell>
                                {bid.base}
                              </TableCell>
                          </TableRow>
                        );
                      })
                    : [];

    let asks = marketOrders
                ? marketOrders["asks"]
                : undefined;

    let askRows = asks && asks.length
                      ? asks.map((ask) => {
                          return (
                            <TableRow key={`tr ask ${ask.price}`}>
                                <TableCell component="th" scope="row">
                                  {ask.price}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {ask.quote}
                                </TableCell>
                                <TableCell>
                                  {ask.base}
                                </TableCell>
                            </TableRow>
                          );
                        })
                      : [];

    let bidContents = !bids || !bids.length
      ? <Chip key="bid chip" label="No bids" disabled />
      : <TableContainer key="bid container" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Quote
                </TableCell>
                <TableCell>
                  Base
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bidRows}
            </TableBody>
          </Table>
        </TableContainer>;

    let askContents = !asks || !asks.length
      ? <Chip key="ask chip" label="No asks" disabled />
      : <TableContainer key="ask table" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Quote
                </TableCell>
                <TableCell>
                  Base
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {askRows}
            </TableBody>
          </Table>
        </TableContainer>

    return ([
      <Typography key="bid header" variant="body1" gutterBottom style={{'paddingTop': '5px'}}>
        Bids
      </Typography>,
      bidContents,
      <Typography key="ask header"  variant="body1" gutterBottom style={{'paddingTop': '5px'}}>
        Asks
      </Typography>,
      askContents
    ])

}
