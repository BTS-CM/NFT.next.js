import {useState} from 'react';
import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import {
  Card,
  Col,
  Paper,
  Grid,
  Tooltip,
  Text,
  Tabs,
  Tab,
  Divider,
  Badge,
  Button,
  Code,
  Group,
  Title
} from '@mantine/core';

import config from "./config.json";

const OBJT = dynamic(() => import('./three/OBJT'));
const GLTFT = dynamic(() => import('./three/GLTFT'));
const FBXT = dynamic(() => import('./three/FBXT'));
const VOXT = dynamic(() => import('./three/VOXT'));
const MP4T = dynamic(() => import('./three/MP4T'));

const IssuerDetails = dynamic(() => import('./IssuerDetails'));
const NFTHolder = dynamic(() => import('./NFTHolder'));
const IPFSCarouselElement = dynamic(() => import('./IPFSCarousel'));
const MarketOrders = dynamic(() => import('./MarketOrders'));

import { IoCheckmark, IoClose } from "react-icons/io5";

import {
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  HatenaIcon,
} from "react-share";

const { getImage, getPngDimensions } = require("./images");

export default function NFT (properties) {
  let individual = properties.individual;
  let initAsset = properties.initAsset;
  let id = properties.id;

  let isApple = properties.isApple;

  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const [asset, setAsset] = useState(initAsset ? initAsset : undefined);
  const [value, setValue] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [beet, setBeet] = useState(false);
  const [buyViaBeet, setViaBeet] = useState(false);
  const [account, setAccount] = useState(null);

  if (!id || !id.includes(".")) {
    return (<Text size="lg">
              Loading NFT info...
            </Text>);
  }

  let issuer = asset ? asset.issuer : undefined;
  let precision = asset ? asset.precision : undefined;
  let symbol = asset ? asset.symbol : undefined;

  let permissions = asset ? asset.permissions : undefined;
  let asset_flags = asset ? asset.flags : undefined;
  let dynamic_asset_data = asset ? asset.dynamic_asset_data : undefined;
  let current_supply = dynamic_asset_data ? dynamic_asset_data.current_supply : undefined;

  // Asset Description Langauge
  let description = asset && asset.description ? asset.description : undefined;
  let main = description ? description.main : undefined;
  let market = description ? description.market : undefined;
  let short_name = description ? description.short_name : undefined;

  // Keys expected for type NFT/ART:
  let nft_object = description ? description.nft_object : undefined;
  let nft_signature = description ? description.nft_signature : undefined;

  // NFT Object
  // Core keys:
  let type = nft_object && nft_object.type ? nft_object.type : undefined;
  let attestation = nft_object && nft_object.attestation ? nft_object.attestation : undefined;
  let sig_pubkey_or_address = undefined;
  if (nft_object && nft_object.sig_pubkey_or_address) {
    sig_pubkey_or_address = nft_object.sig_pubkey_or_address;
  } else  if (nft_object && nft_object.pubkeyhex) {
    sig_pubkey_or_address = nft_object.pubkeyhex;
  }

  let title = nft_object && nft_object.title ? nft_object.title : undefined;
  let artist = nft_object && nft_object.artist ? nft_object.artist : undefined;
  let narrative = nft_object && nft_object.narrative ? nft_object.narrative : undefined;
  let encoding = nft_object && nft_object.encoding ? nft_object.encoding : undefined;

  let { image, imgURL, fileType } = getImage(nft_object);

  // Optional and Proposed Keys:

  let tags = nft_object && nft_object.tags ? nft_object.tags.split(",") : undefined;
  let nft_flags = nft_object && nft_object.flags ? nft_object.flags.split(",") : undefined;

  let acknowledgments = nft_object && nft_object.acknowledgments ? nft_object.acknowledgments : undefined;
  if (!acknowledgments && nft_object && nft_object.acknowledgements) {
    acknowledgments = nft_object.acknowledgements;
  }

  let license = nft_object && nft_object.license ? nft_object.license : undefined;
  let holder_license = nft_object && nft_object.holder_license ? nft_object.holder_license : undefined;
  let password_multihash = nft_object && nft_object.password_multihash ? nft_object.password_multihash : undefined;

  let media_png_multihashes = nft_object && nft_object.media_png_multihashes ? nft_object.media_png_multihashes : undefined;

  // Helmet
  let helmet_title = title && artist
                      ? `"${title}" (${symbol}) by ${artist} - Bitshares NFT`
                      : "Loading an NFT from the Bitshares blockchain";

  let helmet_description = title && artist
                            ? `"${title}" (${symbol}) by ${artist} - Bitshares NFT`
                            : "Loading an NFT from the Bitshares blockchain";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const flagChips = asset_flags
    ? Object.keys(asset_flags).map(
        (flag) => {
          const flagValue = asset_flags[flag];
          return flagValue === true
            ? <Badge leftSection={flagValue ? <IoCheckmark/> : <IoClose/>}>{flag.replace(/_/g, ' ')}</Badge>
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
                  ? t('nft.permissionTips.enabled.' + permission)
                  : t('nft.permissionTips.disabled.' + permission)
              }
              key={permission + '_tooltip'}
            >
              <Badge
                leftSection={permissionValue ? <IoCheckmark/> : <IoClose/>}
                key={permission + '_chip'}
               >
                 {permission.replace(/_/g, ' ')}
               </Badge>
            </Tooltip>
          );

        }
      )
    : null;

  const tagChips = tags
    ? tags.map((tag) => {
      return <Badge key={`tag: ${tag}`}>{tag}</Badge>
      })
    : null;


  const nftFlagChips = nft_flags
    ? nft_flags.map((flag) => {
      return <Badge key={`flagchip: ${flag}`}>{flag}</Badge>
      })
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

    let height = null;
    let width = null;
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
                            key={short_name + " apple Image"}
                            src={imgURL}
                            alt={short_name + " apple image"}
                            sx={{maxWidth: '100%'}}
                          />
                        </a>
                      : <Image
                          key={short_name + " Image"}
                          src={imgURL}
                          height={height}
                          width={width}
                          alt={short_name + " image"}
                          sx={{maxWidth: '100%'}}
                        />

  } else if (asset && media_png_multihashes) {
    imageComponent = <IPFSCarouselElement
                        media_png_multihashes={media_png_multihashes}
                        asset={asset}
                        isApple={isApple}
                      />;
  } else if (nft_object.media_json) {
    imageComponent = <OBJT data={image} />
  } else if (nft_object.media_gltft) {
    imageComponent = <GLTFT data={image} symbol={symbol} />
  } else if (nft_object.media_fbx) {
    imageComponent = <FBXT symbol={symbol} />
  } else if (nft_object.media_vox) {
    imageComponent = <VOXT symbol={symbol} />
  } else if (nft_object.media_mp4) {
    imageComponent = <MP4T symbol={symbol} />
  }

  return (
    <Grid grow>
      <Col span={12} key={symbol + "NFT"}>
        <Paper padding="lg" withBorder shadow="md" align="center" id={id}>
          <Title order={2}>
            &quot;{title}&quot;{t('nft.by')}{artist}
          </Title>
          {
            imageComponent
          }

          <Script
            id="beet"
            src="../js/beet-js.js"
          />
          <Script
            id="btsJS"
            src="../js/bitsharesjs.min.js"
          />

          <Tabs
            initialTab={0}
            variant="pills"
            position="center"
            active={activeTab}
            onTabChange={setActiveTab}
            aria-label="nft tabs"
            sx={{paddingTop: '10px'}}
          >
            <Tab key="tabs.nft" label={t('nft.tabs.nft')}>
              <Text>
                <b>{t('nft.nft.attestation')}</b>: &quot;{attestation}&quot;
              </Text>
              <Text>
                <b>{t('nft.nft.narrative')}</b>: &quot;{narrative}&quot;
              </Text>
              <Text>
                <b>{t('nft.nft.acknowledgments')}</b>: &quot;{acknowledgments ? acknowledgments : 'N/A'}&quot;
              </Text>
            </Tab>

            <Tab key="tabs.asset" label={t('nft.tabs.asset')}>
              <Group position="center" sx={{marginTop: '5px'}}>
                <Badge>
                  {`${t('nft.asset.name')}: ${symbol ? symbol : '???'}`}
                </Badge>

                {holder}

                <Badge>
                  {`${t('nft.asset.quantity')}: ${current_supply ? current_supply : '???'}`}
                </Badge>

                <Badge>
                  {`${t('nft.asset.file_type')}: ${type ? type : '???'}`}
                </Badge>

                <Tooltip
                  withArrow
                  label={
                    encoding === "base64"
                      ? t('nft.asset.onchain')
                      : t('nft.asset.offchain')
                    }
                >
                  <Badge>
                    {`${t('nft.asset.encoding')}: ${encoding ? encoding : '???'}`}
                  </Badge>
                </Tooltip>

                <Tooltip
                  withArrow
                  label={
                    precision === 0
                      ? t('nft.asset.precision_good', {short_name: short_name})
                      : t('nft.asset.precision_bad')
                    }
                >
                  <Badge>
                    {`${t('nft.asset.precision')}: ${precision}`}
                  </Badge>
                </Tooltip>

                {detailsOfIssuer}
              </Group>
            </Tab>

            <Tab key="tabs.tags" label={t('nft.tabs.tags')}>
              {
                tagChips && tagChips.length
                  ? <Group sx={{marginTop: '5px'}} position="center">{tagChips}</Group>
                  : <Text>{t('nft.tags.no_tags')}</Text>
              }
              <br/>
              {
                nftFlagChips && nftFlagChips.length
                  ? <Group sx={{marginTop: '5px'}} position="center">{nftFlagChips}</Group>
                  : <Text>{t('nft.tags.no_nft_tags')}</Text>
              }
            </Tab>

            <Tab key="tabs.share" label={t('nft.tabs.share')}>
              <Text size="lg" sx={{paddingBottom: '10px'}}>
                {`Share "${title}" by ${artist} on social media!`}
              </Text>
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                sx={{m: 0.25}}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                title={helmet_description}
                sx={{m: 0.25}}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <TelegramShareButton
                url={shareUrl}
                title={title}
                sx={{m: 0.25}}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                sx={{m: 0.25}}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl} sx={{m: 0.25}} >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                sx={{m: 0.25}}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>

              <TumblrShareButton
                url={shareUrl}
                title={title}
                sx={{m: 0.25}}
              >
                <TumblrIcon size={32} round />
              </TumblrShareButton>

              <LivejournalShareButton
                url={shareUrl}
                title={title}
                description={shareUrl}
                sx={{m: 0.25}}
              >
                <LivejournalIcon size={32} round />
              </LivejournalShareButton>

              <MailruShareButton
                url={shareUrl}
                title={title}
                sx={{m: 0.25}}
              >
                <MailruIcon size={32} round />
              </MailruShareButton>

              <EmailShareButton
                url={shareUrl}
                subject={title}
                body="body"
                sx={{m: 0.25}}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>

              <ViberShareButton
                url={shareUrl}
                title={title}
                sx={{m: 0.25}}
              >
                <ViberIcon size={32} round />
              </ViberShareButton>

              <WorkplaceShareButton
                url={shareUrl}
                quote={title}
                sx={{m: 0.25}}
              >
                <WorkplaceIcon size={32} round />
              </WorkplaceShareButton>

              <LineShareButton
                url={shareUrl}
                title={title}
                sx={{m: 0.25}}
              >
                <LineIcon size={32} round />
              </LineShareButton>

              <PocketShareButton
                url={shareUrl}
                title={title}
                sx={{m: 0.25}}
              >
                <PocketIcon size={32} round />
              </PocketShareButton>

              <InstapaperShareButton
                url={shareUrl}
                title={title}
                sx={{m: 0.25}}
              >
                <InstapaperIcon size={32} round />
              </InstapaperShareButton>

              <HatenaShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                sx={{m: 0.25}}
              >
                <HatenaIcon size={32} round />
              </HatenaShareButton>
            </Tab>

            <Tab key="tabs.buy" label={t('nft.tabs.buy')}>
              <Text size="lg">
                {t('nft.buy.header', {title: title, symbol: symbol})}
              </Text>
              <Group position="center" sx={{marginTop: '5px', paddingTop: '5px'}}>
                <Button
                  component="a"
                  href={`https://wallet.bitshares.org/#/market/${symbol}_${market ? market : 'BTS'}`}
                  sx={{m: 0.25}}
                  variant="outline"
                >
                  Bitshares.org
                </Button>
                <Button
                  component="a"
                  href={`https://ex.xbts.io/market/${symbol}_${market ? market : 'BTS'}`}
                  sx={{m: 0.25}}
                  variant="outline"
                >
                  XBTS.io
                </Button>
                <Button
                  component="a"
                  href={`https://dex.iobanker.com/market/${symbol}_${market ? market : 'BTS'}`}
                  sx={{m: 0.25}}
                  variant="outline"
                >
                  ioBanker DEX
                </Button>
                <Button
                  component="a"
                  href={`https://wallet.btwty.com/market/${symbol}_${market ? market : 'BTS'}`}
                  sx={{m: 0.25}}
                  variant="outline"
                >
                  BTWTY
                </Button>
                <Tooltip
                  label={t('nft.buy.tooltip', {symbol: symbol})}
                  widthArrow
                >
                  <Button
                    component="a"
                    href={`https://github.com/bitshares/bitshares-ui/releases`}
                    sx={{m: 0.25}}
                    variant="outline"
                  >
                    {t('nft.buy.button')}
                  </Button>
                </Tooltip>
              </Group>


              <Text size="lg" style={{'paddingTop': '5px'}}>
                Bitshares explorers
              </Text>
              <Group position="center" sx={{marginTop: '5px', paddingTop: '5px'}}>
                <Button
                  component="a"
                  href={`https://cryptofresh.com/a/${symbol}`}
                  sx={{m: 0.25}}
                  variant="outline"
                >
                  cryptofresh
                </Button>
                <Button
                  sx={{m: 0.25}}
                  variant="outline"
                  href={`https://bts.ai/asset/${symbol}`}
                  component="a"
                >
                  bts.ai
                </Button>
                <Button
                  sx={{m: 0.25}}
                  variant="outline"
                  href={`https://blocksights.info/#/assets/${symbol}`}
                  component="a"
                >
                  blocksights.info
                </Button>
              </Group>
            </Tab>

            <Tab key="tabs.flags" label={t('nft.tabs.flags')}>
              {
                flagChips && flagChips.length
                  ? <Group position="center">{flagChips}</Group>
                  : <Text>{t('nft.flags.none')}</Text>
              }
            </Tab>

            <Tab key="tabs.permissions" label={t('nft.tabs.permissions')}>
              {
                permissionChips && permissionChips.length
                  ? <Group position="center">{permissionChips}</Group>
                  : <Text>{t('nft.permissions.none')}</Text>
              }
            </Tab>

            <Tab key="tabs.signature" label={t('nft.tabs.signature')}>
              <Text size="lg">
                <b>{t('nft.signature.header')}</b>
              </Text>
              <Text>
                {nft_signature ? nft_signature : 'N/A'}
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
            </Tab>

            <Tab key="tabs.license" label={t('nft.tabs.license')}>
              <Text>
                <b>{t('nft.license.header1')}: </b>
                {
                  license
                    ? license
                    : t('nft.license.none1')
                }
              </Text>
              <Text>
                <b>{t('nft.license.header2')}: </b>
                {
                  holder_license
                    ? holder_license
                    : t('nft.license.none2')
                }
              </Text>
            </Tab>

            <Tab key="tabs.json" label={t('nft.tabs.json')}>
              <Code block aria-label={"elasticSearchData"} style={{'maxWidth': '1000px'}}>
                {asset ? JSON.stringify(asset) : 'N/A'}
              </Code>
            </Tab>
          </Tabs>
        </Paper>
      </Col>
    </Grid>
  );
}
