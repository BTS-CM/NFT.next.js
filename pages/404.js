import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core'
const SEO = dynamic(() => import('../components/SEO'));

import config from '../components/config.json';

function License(properties) {
  const { t } = useTranslation('license');

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <Grid grow>
      <Col span={12} key={"Index featured NFT"}>
        <Paper padding="md" shadow="xs">
          <Text size="lg">
            😧 404 - Page Not Found!
          </Text>
        </Paper>
      </Col>
    </Grid>
  );
}

export const getStaticProps = async ({ locale }) => {
  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      ...(await serverSideTranslations(locale, ['nav'])),
    }
  }
}

export default License;
