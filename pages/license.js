import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import config from '../components/config.json';

import ReactGA from 'react-ga4';
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
  const { t } = useTranslation('license');

  useEffect(() => {
    ReactGA.pageview('License')
  }, []);

  return (
    <Layout
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    >
      <Paper className={classes.paper}>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t('type')}
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t('copyright')}
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t('permission')}
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t('notice')}
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          {t('disclaimer')}
        </Typography>
        <Typography variant="body1" gutterBottom color="textPrimary">
          <a className={classes.a} href="https://github.com/BTS-CM/NFT.next.js">{t('repo')}</a>
        </Typography>
      </Paper>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['license', 'nav']),
  },
})

export default License;
