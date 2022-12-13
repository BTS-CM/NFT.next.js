import { useState } from 'react';
import {
  useTranslation,
  useLanguageQuery,
} from 'next-export-i18n';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import {
  Col,
  Paper,
  Grid,
  Tooltip,
  Text,
  Tabs,
  Tab,
  Badge,
  Button,
  Code,
  Group,
  Title,
  ScrollArea,
} from '@mantine/core';

import { IoCheckmark, IoClose } from 'react-icons/io5';

import {
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  PocketShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  EmailIcon,
  PocketIcon,
  InstapaperIcon,
} from 'react-share';
import config from '../config/config.json';

const OBJT = dynamic(() => import('./three/OBJT'));
const GLTFT = dynamic(() => import('./three/GLTFT'));
const FBXT = dynamic(() => import('./three/FBXT'));
const VOXT = dynamic(() => import('./three/VOXT'));
const MP4T = dynamic(() => import('./three/MP4T'));

const IssuerDetails = dynamic(() => import('./IssuerDetails'));
const NFTHolder = dynamic(() => import('./NFTHolder'));
const IPFSCarouselElement = dynamic(() => import('./IPFSCarousel'));
const MarketOrders = dynamic(() => import('./MarketOrders'));

const { getImage, getPngDimensions } = require('./images');

export default function NFT(properties) {
  const { individual } = properties;
  const { initAsset } = properties;
  const { id } = properties;

  const { isApple } = properties;

  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const [asset, setAsset] = useState(initAsset || undefined);
  const [value, setValue] = useState(0);
  //const [activeTab, setActiveTab] = useState(0);

  if (!id || !id.includes('.')) {
    return (<Text size="lg">
              Loading NFT info...
            </Text>);
  }

  const issuer = asset ? asset.issuer : undefined;
  const precision = asset ? asset.precision : undefined;
  const symbol = asset ? asset.symbol : undefined;

  const creation_block_num = asset ? asset.creation_block_num : undefined;
  const creation_time = asset ? asset.creation_time : undefined;

  const permissions = asset ? asset.permissions : undefined;
  const asset_flags = asset ? asset.flags : undefined;
  const dynamic_asset_data = asset ? asset.dynamic_asset_data : undefined;
  const current_supply = dynamic_asset_data ? dynamic_asset_data.current_supply : undefined;

  // Asset Description Langauge
  const description = asset && asset.description ? asset.description : undefined;
  const main = description ? description.main : undefined;
  const market = description ? description.market : undefined;
  const short_name = description ? description.short_name : undefined;

  // Keys expected for type NFT/ART:
  const nft_object = description ? description.nft_object : undefined;
  const nft_signature = description ? description.nft_signature : undefined;

  // NFT Object
  // Core keys:
  const type = nft_object && nft_object.type ? nft_object.type : undefined;
  const attestation = nft_object && nft_object.attestation ? nft_object.attestation : undefined;
  let sig_pubkey_or_address;
  if (nft_object && nft_object.sig_pubkey_or_address) {
    sig_pubkey_or_address = nft_object.sig_pubkey_or_address;
  } else if (nft_object && nft_object.pubkeyhex) {
    sig_pubkey_or_address = nft_object.pubkeyhex;
  }

  const title = nft_object && nft_object.title ? nft_object.title : undefined;
  const artist = nft_object && nft_object.artist ? nft_object.artist : undefined;
  const narrative = nft_object && nft_object.narrative ? nft_object.narrative : undefined;
  const encoding = nft_object && nft_object.encoding ? nft_object.encoding : undefined;

  const { image, imgURL, fileType } = getImage(nft_object);

  // Optional and Proposed Keys:

  const tags = nft_object && nft_object.tags ? nft_object.tags.split(',') : undefined;
  const nft_flags = nft_object && nft_object.flags ? nft_object.flags.split(',') : undefined;

  let acknowledgments = nft_object && nft_object.acknowledgments
    ? nft_object.acknowledgments
    : undefined;
  if (!acknowledgments && nft_object && nft_object.acknowledgements) {
    acknowledgments = nft_object.acknowledgements;
  }

  const license = nft_object && nft_object.license ? nft_object.license : undefined;
  const holder_license = nft_object && nft_object.holder_license
    ? nft_object.holder_license
    : undefined;
  const password_multihash = nft_object && nft_object.password_multihash
    ? nft_object.password_multihash
    : undefined;

  const media_png_multihashes = nft_object && nft_object.media_png_multihashes
    ? nft_object.media_png_multihashes
    : undefined;

  // Helmet
  const helmet_title = title && artist
    ? `"${title}" (${symbol}) by ${artist} - Bitshares NFT`
    : 'Loading an NFT from the Bitshares blockchain';

  const helmet_description = title && artist
    ? `"${title}" (${symbol}) by ${artist} - Bitshares NFT`
    : 'Loading an NFT from the Bitshares blockchain';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const flagChips = asset_flags
    ? Object.keys(asset_flags).map(
      (flag) => {
        const flagValue = asset_flags[flag];
        return flagValue === true
          ? <Badge leftSection={flagValue ? <IoCheckmark /> : <IoClose />}>{flag.replace(/_/g, ' ')}</Badge>
          : null;
      }
    ).filter(x => x)
    : null;

  const permissionChips = permissions
    ? Object.keys(permissions).map(
      (permission) => {
        const permissionValue = permissions[permission];
        return (
            <Tooltip
              withArrow
              label={
                permissionValue === true || permissionValue === 'true'
                  ? t(`nft.permissionTips.enabled.${permission}`)
                  : t(`nft.permissionTips.disabled.${permission}`)
              }
              key={`${permission}_tooltip`}
            >
              <Badge
                leftSection={permissionValue ? <IoCheckmark /> : <IoClose />}
                key={`${permission}_chip`}
              >
                 {permission.replace(/_/g, ' ')}
              </Badge>
            </Tooltip>
        );
      }
    )
    : null;

  const tagChips = tags
    ? tags.map((tag) => <Badge key={`tag: ${tag}`}>{tag}</Badge>)
    : null;

  const nftFlagChips = nft_flags
    ? nft_flags.map((flag) => <Badge key={`flagchip: ${flag}`}>{flag}</Badge>)
    : null;

  const shareUrl = `https://www.${config.domain}/nft/${symbol}`;

  const detailsOfIssuer = issuer
    ? <IssuerDetails issuer={issuer} />
    : null;

  const holder = id
    ? <NFTHolder id={id} />
    : null;

  let height = 500;
  let width = 500;
  let imageComponent = null;
  if (imgURL && !media_png_multihashes) {
    height = null;
    width = null;
    if (fileType === 'png') {
      const dimensions = getPngDimensions(image);
      if (dimensions) {
        height = dimensions.height;
        width = dimensions.width;
      }
    } else {
      height = 500;
      width = 500;
    }

    imageComponent = isApple
      ? <a href={imgURL}>
                          <img
                            key={`${short_name}_apple_image`}
                            src={imgURL}
                            alt={`${short_name} NFT media contents`}
                            sx={{ maxWidth: '100%' }}
                          />
        </a>
      : <Image
          key={`${short_name} Image`}
          src={imgURL}
          height={height}
          width={width}
          alt={`${short_name} image`}
          sx={{ maxWidth: '100%' }}
      />;
  } else if (asset && media_png_multihashes) {
    imageComponent = <IPFSCarouselElement
      media_png_multihashes={media_png_multihashes}
      asset={asset}
      isApple={isApple}
    />;
  } else if (nft_object.media_json) {
    imageComponent = <OBJT data={image} />;
  } else if (nft_object.media_gltft) {
    imageComponent = <GLTFT data={image} symbol={symbol} />;
  } else if (nft_object.media_fbx) {
    imageComponent = <FBXT symbol={symbol} />;
  } else if (nft_object.media_vox) {
    imageComponent = <VOXT symbol={symbol} />;
  } else if (nft_object.media_mp4) {
    imageComponent = <MP4T symbol={symbol} />;
  }

  return (
    <Grid grow>
      <Col span={12} key={`${symbol}NFT`}>
        <Paper p="lg" withBorder shadow="md" align="center" id={id}>
          <Title order={2}>
            &quot;{title}&quot;{t('nft.by')}{artist}
          </Title>
          {
            imageComponent
          }
          <Tabs defaultValue="nft">
            <Tabs.List>
              <Tabs.Tab key="nft" value="nft">{t('nft.tabs.nft')}</Tabs.Tab>
              <Tabs.Tab key="asset" value="asset">{t('nft.tabs.asset')}</Tabs.Tab>
              <Tabs.Tab key="tags" value="tags">{t('nft.tabs.tags')}</Tabs.Tab>
              <Tabs.Tab key="share" value="share">{t('nft.tabs.share')}</Tabs.Tab>
              <Tabs.Tab key="buy" value="buy">{t('nft.tabs.buy')}</Tabs.Tab>
              <Tabs.Tab key="flags" value="flags">{t('nft.tabs.flags')}</Tabs.Tab>
              <Tabs.Tab key="permissions" value="permissions">{t('nft.tabs.permissions')}</Tabs.Tab>
              <Tabs.Tab key="signature" value="signature">{t('nft.tabs.signature')}</Tabs.Tab>
              <Tabs.Tab key="license" value="license">{t('nft.tabs.license')}</Tabs.Tab>
              <Tabs.Tab key="json" value="json">{t('nft.tabs.json')}</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="nft" pt="xs">
              <Text>
                <b>{t('nft.nft.attestation')}</b>: &quot;{attestation}&quot;
              </Text>
              <Text>
                <b>{t('nft.nft.narrative')}</b>: &quot;{narrative}&quot;
              </Text>
              <Text>
                <b>{t('nft.nft.acknowledgments')}</b>: &quot;{acknowledgments || 'N/A'}&quot;
              </Text>
            </Tabs.Panel>

            <Tabs.Panel value="asset" pt="xs">
              <Group position="center" sx={{ marginTop: '5px' }}>
                <Badge>
                  <b>{`${t('nft.asset.name')}`}</b>{`: ${symbol || '???'}`}
                </Badge>

                {holder}

                <Badge>
                  <b>{`${t('nft.asset.quantity')}`}</b>{`: ${current_supply || '???'}`}
                </Badge>

                <Badge>
                  <b>{`${t('nft.asset.file_type')}`}</b>{`: ${type || '???'}`}
                </Badge>

                <Tooltip
                  withArrow
                  label={
                    encoding === 'base64'
                      ? t('nft.asset.onchain')
                      : t('nft.asset.offchain')
                    }
                >
                  <Badge>
                    <b>{`${t('nft.asset.encoding')}`}</b>{`: ${encoding || '???'}`}
                  </Badge>
                </Tooltip>

                <Tooltip
                  withArrow
                  label={
                    precision === 0
                      ? t('nft.asset.precision_good', { short_name })
                      : t('nft.asset.precision_bad')
                    }
                >
                  <Badge>
                  <b>{`${t('nft.asset.precision')}`}</b>{`: ${precision}`}
                  </Badge>
                </Tooltip>

                {detailsOfIssuer}

                <Badge>
                  <b>{t('nft.nft.creation_block')}</b>:  {creation_block_num}
                </Badge>
                <Badge>
                  <b>{t('nft.nft.creation_time')}</b>: {creation_time}
                </Badge>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="tags" pt="xs">
              {
                tagChips && tagChips.length
                  ? <Group sx={{ marginTop: '5px' }} position="center">{tagChips}</Group>
                  : <Text>{t('nft.tags.no_tags')}</Text>
              }
              <br />
              {
                nftFlagChips && nftFlagChips.length
                  ? <Group sx={{ marginTop: '5px' }} position="center">{nftFlagChips}</Group>
                  : <Text>{t('nft.tags.no_nft_tags')}</Text>
              }
            </Tabs.Panel>

            <Tabs.Panel value="share" pt="xs">
              <Text size="lg" sx={{ paddingBottom: '10px' }}>
                {`Share "${title}" by ${artist} on social media!`}
              </Text>
              <Group position="center" m="sm">
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  sx={{ m: 0.25 }}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton
                  url={shareUrl}
                  title={helmet_description}
                  sx={{ m: 0.25 }}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <TelegramShareButton
                  url={shareUrl}
                  title={title}
                  sx={{ m: 0.25 }}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>

                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  sx={{ m: 0.25 }}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <LinkedinShareButton url={shareUrl} sx={{ m: 0.25 }}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <RedditShareButton
                  url={shareUrl}
                  title={title}
                  windowWidth={660}
                  windowHeight={460}
                  sx={{ m: 0.25 }}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>

                <TumblrShareButton
                  url={shareUrl}
                  title={title}
                  sx={{ m: 0.25 }}
                >
                  <TumblrIcon size={32} round />
                </TumblrShareButton>

                <EmailShareButton
                  url={shareUrl}
                  subject={title}
                  body="body"
                  sx={{ m: 0.25 }}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="buy" pt="xs">
              <Text size="lg">
                {t('nft.buy.header', { title, symbol })}
              </Text>
              <Group position="center" sx={{ marginTop: '5px', paddingTop: '5px' }}>
                <Button
                  component="a"
                  href={`https://wallet.bitshares.org/#/market/${symbol}_${market || 'BTS'}`}
                  sx={{ m: 0.25 }}
                  variant="outline"
                >
                  Bitshares.org
                </Button>
                <Button
                  component="a"
                  href={`https://ex.xbts.io/market/${symbol}_${market || 'BTS'}`}
                  sx={{ m: 0.25 }}
                  variant="outline"
                >
                  XBTS.io
                </Button>
                <Button
                  component="a"
                  href={`https://dex.iobanker.com/market/${symbol}_${market || 'BTS'}`}
                  sx={{ m: 0.25 }}
                  variant="outline"
                >
                  ioBanker DEX
                </Button>
                <Button
                  component="a"
                  href={`https://wallet.btwty.com/market/${symbol}_${market || 'BTS'}`}
                  sx={{ m: 0.25 }}
                  variant="outline"
                >
                  BTWTY
                </Button>
                <Tooltip
                  label={t('nft.buy.tooltip', { symbol })}
                  widthArrow
                >
                  <Button
                    component="a"
                    href="https://github.com/bitshares/bitshares-ui/releases"
                    sx={{ m: 0.25 }}
                    variant="outline"
                  >
                    {t('nft.buy.button')}
                  </Button>
                </Tooltip>
              </Group>

              <Text size="lg" style={{ paddingTop: '5px' }}>
                Bitshares explorers
              </Text>
              <Group position="center" sx={{ marginTop: '5px', paddingTop: '5px' }}>
                <Button
                  component="a"
                  href={`https://cryptofresh.com/a/${symbol}`}
                  sx={{ m: 0.25 }}
                  variant="outline"
                >
                  cryptofresh
                </Button>
                <Button
                  sx={{ m: 0.25 }}
                  variant="outline"
                  href={`https://bts.ai/asset/${symbol}`}
                  component="a"
                >
                  bts.ai
                </Button>
                <Button
                  sx={{ m: 0.25 }}
                  variant="outline"
                  href={`https://blocksights.info/#/assets/${symbol}`}
                  component="a"
                >
                  blocksights.info
                </Button>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="flags" pt="xs">
              {
                flagChips && flagChips.length
                  ? <Group position="center">{flagChips}</Group>
                  : <Text>{t('nft.flags.none')}</Text>
              }
            </Tabs.Panel>

            <Tabs.Panel value="permissions" pt="xs">
              {
                permissionChips && permissionChips.length
                  ? <Group position="center">{permissionChips}</Group>
                  : <Text>{t('nft.permissions.none')}</Text>
              }
            </Tabs.Panel>

            <Tabs.Panel value="signature" pt="xs">
              <Text size="lg">
                <b>{t('nft.signature.header')}</b>
              </Text>
              <Text>
                {nft_signature || 'N/A'}
              </Text>
              <Text size="lg">
                <b>{t('nft.signature.signature')}</b>
              </Text>
              <Text>
                {sig_pubkey_or_address}
              </Text>
              <Text size="lg">
                <b>{t('nft.signature.password')}</b>
              </Text>
              <Text>
                {password_multihash}
              </Text>
            </Tabs.Panel>

            <Tabs.Panel value="license" pt="xs">
              <Text>
                <b>{t('nft.license.header1')}: </b>
                {
                  license || t('nft.license.none1')
                }
              </Text>
              <Text>
                <b>{t('nft.license.header2')}: </b>
                {
                  holder_license || t('nft.license.none2')
                }
              </Text>
            </Tabs.Panel>

            <Tabs.Panel value="json" pt="xs">
              <ScrollArea p="md">
                <Code block style={{ textAlign: 'left', maxWidth: '750px', wordBreak: 'break-all' }}>
                  {
                    asset
                      ? JSON.stringify(asset, undefined, 4)
                      : 'N/A'
                  }
                </Code>
              </ScrollArea>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Col>
    </Grid>
  );
}
