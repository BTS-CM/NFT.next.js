import { useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';

import List from '../components/List';
import Layout from '../components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from '../components/config.json';
import { useAnalytics } from '../components/states';

import ReactGA from 'react-ga4';

function Listings () {

  const { t } = useTranslation('listings');

  let [analytics, setAnalytics] = useAnalytics();
  useEffect(() => {
    if (analytics && config.google_analytics.length) {
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Listings')
    }
  }, [analytics]);

  return (
    <Layout
      description={t('header_description')}
      title={t('header_title')}
      siteTitle={config.title}
    >
      <List />
    </Layout>
  );
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['listings', 'nav']),
  },
})


export default Listings
