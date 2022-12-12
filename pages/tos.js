import {
  useTranslation,
} from 'next-export-i18n';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core';
import config from '../config/config.json';

const SEO = dynamic(() => import('../components/SEO'));

function TOS(properties) {
  const { t } = useTranslation();

  return ([
    <SEO
      description={t('license.header_description', { title: config.title })}
      title={t('license.header_title')}
      siteTitle={config.title}
      key="SEO"
    />,
    <Grid grow key="TOS">
      <Col span={12}>
        <Paper p="md" shadow="xs">
          <Text>
              Terms & Conditions
          </Text>
        </Paper>
      </Col>
    </Grid>,
  ]);
}

export default TOS;
