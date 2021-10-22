import { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ReactGA from 'react-ga4';

import { useGateway, useLanguage } from '../components/states';
const ipfsJSON = require('../components/ipfsJSON.json');
import CustomLink from '../components/CustomLink';
import config from '../components/config.json';

ReactGA.initialize(config.google_analytics);

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
  const [gateway, setGateway] = useGateway('cf-ipfs.com');
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

  useEffect(() => {
    ReactGA.pageview('Settings')
  }, []);

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
          <SettingsIcon /> Change IPFS
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

      </Paper>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['settings', 'nav']),
  },
})

export default License;
