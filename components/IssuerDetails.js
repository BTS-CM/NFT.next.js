import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const Tooltip = dynamic(() => import('@material-ui/core/Tooltip'));
const Zoom = dynamic(() => import('@material-ui/core/Zoom'));
import Chip  from '@material-ui/core/Chip';

import useSWR from 'swr';

const fetcher = (url) => fetch(url, {mode: "cors"}).then((res) => res.json())

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  a: {
    color: theme.palette.text.secondary
  }
}));

export default function IssuerDetails(properties) {
  const classes = useStyles();
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
      <Chip className={classes.chip} color={issuerName && issuerName === 'null-account' ? 'primary' : 'secondary'} label={`${t('asset.issuer')}: ${issuerName}`} />
    </Tooltip>
  );
}
