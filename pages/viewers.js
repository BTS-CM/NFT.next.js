import {
  useTranslation,
} from 'next-export-i18n';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Text, Grid, Col, Paper, Group, Button } from '@mantine/core';

import configJSON from '../config/config.json' assert {type: 'json'};

const SEO = dynamic(() => import('../components/SEO'));

function Viewers(properties) {
  const { t } = useTranslation();
  const { config } = properties;

  return ([
    <SEO
      description={t('viewers.header_description')}
      title={t('viewers.header_title')}
      siteTitle={config.title}
      key="SEO"
    />,
    <Grid key="Viewer grid 1">
      <Col span={12}>
        <Paper p="lg" align="center">
          <Text size="lg">
            {t('viewers.nft.header')}
          </Text>
          <Text>
            {t('viewers.nft.body')}
          </Text>
          <Link href="https://artcasa.gallery/" passHref>
            <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline">ArtCASA</Button>
          </Link>
          <Link href="https://alguienalli.github.io/" passHref>
            <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline">Alguien&apos;s Bitshares NFT Explorer</Button>
          </Link>
          <Link href="https://github.com/BTS-CM/NFT_Viewer" passHref>
            <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline">Bitshares NFT Viewer</Button>
          </Link>
        </Paper>
      </Col>
      <Col span={12}>
        <Paper p="lg" align="center">
          <Text size="lg">
            {t('viewers.nft.tools')}
          </Text>
          <Link href="https://github.com/BTS-CM/Bitshares_NFT_Issuance_Tool" passHref>
            <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline">
              Bitshares NFT Issuance Tool
            </Button>
          </Link>
          <Link href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Creator" passHref>
            <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline">
              Bitshares NFT Creator
            </Button>
          </Link>
          <Link href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification" passHref>
            <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline">
              Bitshares NFT spec
            </Button>
          </Link>
        </Paper>
      </Col>
      <Col span={12}>
        <Paper p="lg" align="center">
          <Text size="lg">
            {t('viewers.blockchain.header')}
          </Text>
          <Text>
            {t('viewers.blockchain.body')}
          </Text>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://wallet.bitshares.org/#/explorer/assets">Bitshares.org</Button>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://ex.xbts.io/explorer/assets">XBTS.io</Button>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://dex.iobanker.com/explorer/assets">ioBanker DEX</Button>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://wallet.btwty.com/explorer/assets">BTWTY</Button>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://bts.ai/">BTS.AI</Button>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://api.testnet.bitshares.ws/docs">Insight</Button>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://cryptofresh.com">cryptofresh</Button>
          <Button sx={{ margin: '5px' }} component="a" size="sm" variant="outline" href="https://blocksights.info/">BlockSights.info</Button>
        </Paper>
      </Col>
    </Grid>,
  ]);
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    config: configJSON,
  },
});

export default Viewers;
