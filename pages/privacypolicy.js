import { useEffect } from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from 'next-export-i18n';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core';
import config from '../components/config.json';
import { useAppStore } from '../components/states';

const SEO = dynamic(() => import('../components/SEO'));

function PrivacyPolicy(properties) {
  const { t } = useTranslation();

  return ([
    <SEO
      description={t('license.header_description', { title: config.title })}
      title={t('license.header_title')}
      siteTitle={config.title}
      key="SEO"
    />,
    <Grid grow key="PrivacyPolicy">
      <Col span={12}>
        <Paper p="md" shadow="xs">
            <strong>Privacy Policy</strong>
            <Text>Privacy policy contents</Text>
        </Paper>
      </Col>
    </Grid>,
  ]);
}

export default PrivacyPolicy;
