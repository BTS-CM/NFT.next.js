import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from 'next-export-i18n';
import dynamic from 'next/dynamic';

import {
  Tooltip,
  Badge,
} from '@mantine/core';

import useSWR from 'swr';

const fetcher = (url) => fetch(url, { mode: 'cors' }).then((res) => res.json());

export default function IssuerDetails(properties) {
  const { t } = useTranslation();
  const { issuer } = properties;

  const { data, error } = useSWR(
    `https://api.bitshares.ws/openexplorer/object?object=${issuer}`,
    fetcher
  );

  if (error || !data) {
    return (<Badge>
              <b>{t('nft.asset.issuer')}</b>: ???
            </Badge>);
  }

  const issuerName = data && data.name ? data.name : undefined;

  return (
    <Tooltip
      withArrow
      label={
        issuerName && issuerName === 'null-account'
          ? t('nft.asset.asset_ownership_burned')
          : t('nft.asset.asset_ownership_warning')
      }
    >
      <Badge color={issuerName && issuerName === 'null-account' ? 'primary' : 'secondary'}>
        <b>{t('nft.asset.issuer')}</b>{`: ${issuerName}`}
      </Badge>
    </Tooltip>
  );
}
