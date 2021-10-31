import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const Tooltip = dynamic(() => import('@mui/material/Tooltip'));
const Zoom = dynamic(() => import('@mui/material/Zoom'));
import Chip  from '@mui/material/Chip';

import useSWR from 'swr';

const fetcher = (url) => fetch(url, {mode: "cors"}).then((res) => res.json())

export default function IssuerDetails(properties) {
  const { t } = useTranslation('nft');
  const issuer = properties.issuer;

  const { data, error } = useSWR(
    `https://api.bitshares.ws/openexplorer/object?object=${issuer}`,
    fetcher
  );

  if (error) {
    return null
  };

  if (!data) {
    return null;
  };

  let issuerName = data && data.name ? data.name : undefined;

  return (
    <Tooltip
      TransitionComponent={Zoom}
      disableFocusListener
      title={
        issuerName && issuerName === 'null-account'
          ? t('asset.asset_ownership_burned')
          : t('asset.asset_ownership_warning')
      }
    >
      <Chip color={issuerName && issuerName === 'null-account' ? 'primary' : 'secondary'} label={`${t('asset.issuer')}: ${issuerName}`} />
    </Tooltip>
  );
}
