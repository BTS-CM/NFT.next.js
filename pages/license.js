import { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';

import ReactGA from 'react-ga4';
ReactGA.initialize('G-CTZ1V9EXWY');

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
      description={`Learn about the license behind the NFTEA Gallery software.`}
      title={`License`}
      siteTitle={'NFTEA Gallery'}
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
        <Typography variant="body1" gutterBotto color="textPrimary"m>
          <a className={classes.a} href="https://github.com/BTS-CM/NFT">{t('repo')}</a>
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
