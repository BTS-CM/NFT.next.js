import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic';

const Typography = dynamic(() => import('@mui/material/Typography'));
const Paper = dynamic(() => import('@mui/material/Paper'));

const Layout = dynamic(() => import('../components/Layout'));
const Button = dynamic(() => import('@mui/material/Button'));
const Menu = dynamic(() => import('@material-ui/core/Menu'));
const SettingsIcon = dynamic(() => import('@material-ui/icons/Settings'));
import MenuItem from '@material-ui/core/MenuItem';

import { useGateway, useLanguage, useEnvironment, useAnalytics } from '../components/states';
import CustomLink from '../components/CustomLink';

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

function License(properties) {
  const classes = useStyles();
  const router = useRouter();

  const { t } = useTranslation('settings');

  const [language, setLanguage] = useLanguage();
  const [environment, setEnvironment] = useEnvironment();
  const [analytics, setAnalytics] = useAnalytics();
  const [gateway, setGateway] = useGateway('cf-ipfs.com');

  const config = properties.config;
  const ipfsJSON = properties.ipfsJSON;

  const [anchorIPFS, setAnchorIPFS] = useState(null);
  const openIPFS = Boolean(anchorIPFS);
  const handleClickIPFS = (event) => {
    setAnchorIPFS(event.currentTarget);
  };
  const handleCloseIPFS = () => {
    setAnchorIPFS(null);
  };
  const handleGateway = (gateway) => {
    setGateway(gateway);
    handleCloseIPFS();
  }

  const [anchorEnv, setAnchorEnv] = useState(null);
  const openEnv = Boolean(anchorEnv);
  const handleClickEnvironment = (event) => {
    setAnchorEnv(event.currentTarget);
  };
  const handleCloseEnvironment = () => {
    setAnchorEnv(null);
  };
  const handleEnvironment = (newEnvironment) => {
    setEnvironment(newEnvironment);
    handleCloseEnvironment();
  }

  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const handle = (newPreference) => {
    setAnalytics(newPreference);
    handleClose();
  }

  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Settings')
    }
  }, [analytics]);

  return (
    <Layout
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    >
      <Paper className={classes.paper}>

        <Button
          aria-label="more"
          aria-controls="long-menu2"
          aria-haspopup="true"
          size="small"
          variant="contained"
          onClick={handleClickIPFS}
        >
          <SettingsIcon style={{margin: '2px'}} /> Change IPFS
        </Button>

        <Menu
          id="long-menu2"
          anchorEl={anchorIPFS}
          keepMounted
          open={openIPFS}
          onClose={handleCloseIPFS}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          {ipfsJSON.map((key, value) => (
            <MenuItem component={CustomLink} locale={language} href={`${router.asPath}`} key={`ipfs gateway ${value}`} selected={key === gateway} onClick={() => { handleGateway(key) }}>
              <a className={classes.a}>{key}</a>
            </MenuItem>
          ))}
        </Menu>

        <Button
          aria-label="more"
          aria-controls="long-menu3"
          aria-haspopup="true"
          size="small"
          variant="contained"
          style={{marginLeft: '5px'}}
          onClick={handleClickEnvironment}
        >
          <SettingsIcon style={{margin: '2px'}} /> Change Environment
        </Button>

        <Menu
          id="long-menu3"
          anchorEl={anchorEnv}
          keepMounted
          open={openEnv}
          onClose={handleCloseEnvironment}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem
            key={`production button`}
            selected={environment === 'production'}
            onClick={() => { handleEnvironment('production') }}
          >
            Production
          </MenuItem>
          <MenuItem
            key={`staging button`}
            selected={environment === 'staging'}
            onClick={() => { handleEnvironment('staging') }}
          >
            Staging
          </MenuItem>
        </Menu>

        <Button
          aria-label="more"
          aria-controls="long-menu4"
          aria-haspopup="true"
          size="small"
          variant="contained"
          style={{marginLeft: '5px'}}
          onClick={handleClick}
        >
          <SettingsIcon style={{margin: '2px'}} /> Analytics preferences
        </Button>

        <Menu
          id="long-menu4"
          anchorEl={anchor}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem
            key={`analytics option`}
            selected={analytics == true}
            onClick={() => { handle(true) }}
          >
            Enable
          </MenuItem>
          <MenuItem
            key={`no analytics option`}
            selected={analytics == false}
            onClick={() => { handle(false) }}
          >
            Disable
          </MenuItem>
        </Menu>

      </Paper>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');
  let ipfsJSON = require('../components/ipfsJSON.json');

  return {
    props: {
      config: config,
      ipfsJSON: ipfsJSON,
      ...await serverSideTranslations(locale, ['settings', 'nav']),
    }
  }
}

export default License;
