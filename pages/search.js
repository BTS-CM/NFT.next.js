import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import art from '../components/art.json';
import config from '../components/config.json';

import ReactGA from 'react-ga4';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Layout from '../components/Layout';
import { useEnvironment, useAnalytics } from '../components/states';

import Fuse from 'fuse.js';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  searchResults: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SearchPanel (properties) {
  const { t } = useTranslation('search');
  const [overlay, setOverlay] = useState();
  const classes = useStyles();

  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';

  const searchData = art && art[env] ? art[env] : [];
  if (!searchData || !searchData.length) {
    return <p>loading search...</p>;
  }

  const eraseSearch = (event) => {
    setOverlay();
  };

  const updateSearchValue = (event) => {
    setOverlay();

    const fuse = new Fuse(
      searchData,
      {
        includeScore: true,
        keys: ['name', 'id']
      }
    );

    const result = fuse.search(event.target.value);
    if (result && result.length > 0) {
      setOverlay(
        result.slice(0,5).map(crypto => {
          if (crypto.item && crypto.item.id) {
            return (
              <ListItemLink href={`/nft/${crypto.item.name}`}>
                <ListItemText primary={`${crypto.item.id}: ${crypto.item.name}`} />
              </ListItemLink>
            )
          } else {
            return undefined;
          }
        }).filter(x => x)
      );
    } else {
      eraseSearch(event);
    }
  };

  return (
    <Layout
      description={t('header_description')}
      title={t('header_title')}
      siteTitle={config.title}
    >
      <Grid item xs={12} key={"Search Window"}>
        <Paper className={classes.paper} style={{'padding': '20px'}}>
            <Typography gutterBottom variant="h4" component="h1">
              {t('header')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('body')}
            </Typography>
            <TextField
              key="searchInput"
              id="outlined-basic"
              label="NFT name"
              onChange={updateSearchValue}
              variant="outlined"
              style={{'marginTop': '20px'}}
            />
            <div className={classes.root}>
              <List component="nav" aria-label="search result list">
                {
                  overlay
                }
              </List>
            </div>
        </Paper>
        <Paper className={classes.paper} style={{'padding': '20px', 'marginTop': '20px'}}>
            <Typography gutterBottom variant="h5" component="h5">
              {t('help_header')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('not_all')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('pre_a')}<Link href="/viewers">{t('a1')}</Link> & <Link href="/viewers">{t('a2')}</Link>!
            </Typography>
        </Paper>
      </Grid>
    </Layout>
  );
}

function Search() {
  let [analytics, setAnalytics] = useAnalytics();
  useEffect(() => {
    if (analytics && config.google_analytics.length) {
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Search')
    }
  }, [analytics]);

  return (
    <SearchPanel />
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['search', 'nav']),
  },
})

export default Search
