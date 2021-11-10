import {useState} from 'react';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import { Badge } from '@mantine/core';
import { useEnvironment } from './states';

const fetcher = (url) => fetch(url, {method: "GET", mode: "cors"}).then((res) => res.json())

export default function NFTHolder(properties) {
  const [environment, setEnvironment] = useEnvironment();
  const { t } = useTranslation('nft');
  const id = properties.id;

  const { data, error } = useSWR(
    `https://${environment === "staging" ? `api.testnet` : `api`}.bitshares.ws/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`,
    fetcher
  );

  if (error || !data) {
    <Badge>
      ???
    </Badge>
  };

  return (
    <Badge>
      {`${t('asset.owner')}: ${data && data.length ? data[0].name : '???'}`}
    </Badge>
  );
}
