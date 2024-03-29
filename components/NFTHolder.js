import { useState } from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from 'next-export-i18n';
import useSWR from 'swr';

import { Badge } from '@mantine/core';
import { useAppStore } from './states';

const fetcher = (url) => fetch(url, { method: 'GET', mode: 'cors' }).then((res) => res.json());

export default function NFTHolder(properties) {
  const environment = useAppStore((state) => state.environment);
  const { t } = useTranslation();
  const { id } = properties;

  const { data, error } = useSWR(
    `https://${environment === 'staging' ? 'api.testnet' : 'api'}.bitshares.ws/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`,
    fetcher
  );

  if (error || !data) {
    <Badge>
      ???
    </Badge>;
  }

  return (
    <Badge>
      <b>{t('nft.asset.owner')}</b>{`: ${data && data.length ? data[0].name : '???'}`}
    </Badge>
  );
}
