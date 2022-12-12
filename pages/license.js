import { useEffect } from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from 'next-export-i18n';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core';
import config from '../config/config.json';

const SEO = dynamic(() => import('../components/SEO'));

function License(properties) {
  const { t } = useTranslation();

  return ([
    <SEO
      description={t('license.header_description', { title: config.title })}
      title={t('license.header_title')}
      siteTitle={config.title}
      key="SEO"
    />,
    <Grid grow key="License">
      <Col span={12}>
        <Paper p="md" shadow="xs">
          <Text>
            {t('license.type')}
          </Text>
          <Text>
            {t('license.copyright')}
          </Text>
          <Text>
            {t('license.permission')}
          </Text>
          <Text>
            {t('license.notice')}
          </Text>
          <Text>
            {t('license.disclaimer')}
          </Text>
          <Text>
            <a sx={{ color: 'text.secondary' }} href="https://github.com/BTS-CM/NFT.next.js">{t('license.repo')}</a>
          </Text>
        </Paper>
      </Col>
    </Grid>,
  ]);
}

export default License;
