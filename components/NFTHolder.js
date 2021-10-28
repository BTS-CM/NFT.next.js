import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import Chip  from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.25)
  }
}));

const fetcher = (url) => fetch(url, {method: "GET", mode: "cors"}).then((res) => res.json())

export default function NFTHolder(properties) {
  const classes = useStyles();
  const { t } = useTranslation('nft');
  const id = properties.id;

  const { data, error } = useSWR(
    `https://api.bitshares.ws/openexplorer/asset_holders?asset_id=${id}&start=0&limit=1`,
    fetcher
  );

  if (error) {
    return null
  };

  if (!data) {
    return null;
  };

  return (
    <Chip className={classes.chip} label={`${t('asset.owner')}: ${data && data.length ? data[0].name : '???'}`} />
  );
}
