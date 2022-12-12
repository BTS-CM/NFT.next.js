import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core';

import config from '../config/config.json';

const SEO = dynamic(() => import('../components/SEO'));

function License(properties) {
  return ([
    <Grid grow key="404 page">
      <Col span={12}>
        <Paper p="md" shadow="xs">
          <Text size="lg">
            😧 404 - Page Not Found!
          </Text>
        </Paper>
      </Col>
    </Grid>,
  ]);
}

export default License;
