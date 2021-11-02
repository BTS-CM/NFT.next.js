import {useState} from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('@mui/material/Grid'));
const Paper = dynamic(() => import('@mui/material/Paper'));
const Button = dynamic(() => import('@mui/material/Button'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Avatar = dynamic(() => import('@mui/material/Avatar'));
const AppBar = dynamic(() => import('@mui/material/AppBar'));
const Tabs = dynamic(() => import('@mui/material/Tabs'));
const Tab = dynamic(() => import('@mui/material/Tab'));
const TextareaAutosize = dynamic(() => import('@mui/material/TextareaAutosize'));
const Tooltip = dynamic(() => import('@mui/material/Tooltip'));
const Zoom = dynamic(() => import('@mui/material/Zoom'));

import config from "./config.json";

const OBJT = dynamic(() => import('./OBJT'));
const IssuerDetails = dynamic(() => import('./IssuerDetails'));
const NFTHolder = dynamic(() => import('./NFTHolder'));
const IPFSCarouselElement = dynamic(() => import('./IPFSCarousel'));
import Chip from '@mui/material/Chip';

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

const { TabPanel, a11yProps } = require("./tabs");
const { getImage, getPngDimensions } = require("./images");

export default function ANFT (properties) {
  let individual = properties.individual;
  let initAsset = properties.initAsset;
  let id = properties.id;

  let isApple = properties.isApple;

  const { t } = useTranslation('nft');

  if (!id || !id.includes(".")) {
    return (<Typography gutterBottom variant="h6" component="h4">
            Loading NFT info...
          </Typography>);
  }

  const [asset, setAsset] = useState(initAsset ? initAsset : undefined);
  const [value, setValue] = useState(0);

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
            ? <Chip
                sx={{m: 0.25}}
                avatar={<Avatar>{flagValue === true || flagValue === 'true'  ? '✔' : '❌'}</Avatar>}
                label={flag.replace(/_/g, ' ')}
               />
            : undefined;
        }
      ).filter(x => x)
    : undefined;

  const permissionChips = permissions
    ? Object.keys(permissions).map(
        (permission) => {
          const permissionValue = permissions[permission];
          return (
            <Tooltip
              TransitionComponent={Zoom}
              disableFocusListener
              title={
                permissionValue === true || permissionValue === 'true'
                  ? t('permissionTips.enabled.' + permission)
                  : t('permissionTips.disabled.' + permission)
              }
              key={permission + '_tooltip'}
            >
              <Chip
                sx={{m: 0.25}}
                avatar={<Avatar>{permissionValue === true || permissionValue === 'true'  ? '✔' : '❌'}</Avatar>}
                label={permission.replace(/_/g, ' ')}
                key={permission + '_chip'}
               />
            </Tooltip>
          );

        }
      )
    : undefined;

  const tagChips = tags
    ? tags.map((tag) => {
      return <Chip
        sx={{m: 0.25}}
        label={tag}
        key={`tagchip: ${tag}`}
       />
      })
    : undefined;

  const nftFlagChips = nft_flags
    ? nft_flags.map((flag) => {
      return <Chip
        sx={{m: 0.25}}
        label={flag}
        key={`flagchip: ${flag}`}
       />
      })
    : undefined;

  const shareUrl = `https://www.${config.domain}/nft/${symbol}`;

  const detailsOfIssuer = issuer
                ? <IssuerDetails issuer={issuer} />
                : undefined;

  const holder = id
                  ? <NFTHolder id={id} />
                  : undefined;

  let height = 500;
  let width = 500;
  let imageComponent = undefined;
  if (imgURL && !media_png_multihashes && fileType === 'png') {

    const dimensions = getPngDimensions(image);
    if (dimensions) {
      height = dimensions.height;
      width = dimensions.width;
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
                      : <a href={imgURL}>
                          <Image
                            key={short_name + " Image"}
                            src={imgURL}
                            height={height}
                            width={width}
                            alt={short_name + " image"}
                            sx={{maxWidth: '100%'}}
                          />
                        </a>
  } else if (asset && media_png_multihashes) {
    imageComponent = <IPFSCarouselElement media_png_multihashes={media_png_multihashes} asset={asset} isApple={isApple} />;
  } else if (nft_object.media_json) {
    imageComponent = <OBJT data={image} />
  }

  return (
      <span sx={{pb: '25px'}} key={symbol + "NFT"}>
        <Paper sx={{p: 2, textAlign: 'center', color: 'text.secondary', mb: individual ? 0 : 2}} id={id}>
          <Typography gutterBottom variant="h4" component="h1">
            &quot;<Link href={`/nft/${symbol}`} sx={{color: 'text.Primary', textDecoration: 'none'}} passHref><a>{title}</a></Link>&quot;{t('by')}{artist}
          </Typography>
          {
            imageComponent
          }
          <Typography gutterBottom variant="h6" component="h4">
            {main.replace(" To view this token and others, visit https://nftea.gallery", "")}
          </Typography>
          <br/>
          <AppBar position="static" color="inherit">
            <Tabs
              value={value}
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="scrollable nft tabs"
            >
              <Tab key="tabs.nft" label={t('tabs.nft')} {...a11yProps(0)} />
              <Tab key="tabs.asset" label={t('tabs.asset')} {...a11yProps(1)} />
              <Tab key="tabs.tags" label={t('tabs.tags')} {...a11yProps(2)} />
              <Tab key="tabs.share" label={t('tabs.share')} {...a11yProps(3)} />
              <Tab key="tabs.buy" label={t('tabs.buy')} {...a11yProps(4)} />
              <Tab key="tabs.flags" label={t('tabs.flags')} {...a11yProps(5)} />
              <Tab key="tabs.permissions" label={t('tabs.permissions')} {...a11yProps(6)} />
              <Tab key="tabs.signature" label={t('tabs.signature')} {...a11yProps(7)} />
              <Tab key="tabs.license" label={t('tabs.license')} {...a11yProps(8)} />
              <Tab key="tabs.json" label={t('tabs.json')} {...a11yProps(9)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0} id="NFT">
            <Typography variant="body1" gutterBottom>
              <b>{t('nft.attestation')}</b>: &quot;{attestation}&quot;
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>{t('nft.narrative')}</b>: &quot;{narrative}&quot;
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>{t('nft.acknowledgments')}</b>: &quot;{acknowledgments ? acknowledgments : 'N/A'}&quot;
            </Typography>
          </TabPanel>

          <TabPanel value={value} index={1} id="Asset">
            <Chip sx={{m: 0.25}} label={`${t('asset.name')}: ${symbol ? symbol : '???'}`} />
            {holder}
            <Chip sx={{m: 0.25}} label={`${t('asset.quantity')}: ${current_supply ? current_supply : '???'}`} />
            <Chip sx={{m: 0.25}} label={`${t('asset.file_type')}: ${type ? type : '???'}`} />

            <Tooltip
              TransitionComponent={Zoom}
              disableFocusListener
              title={
                encoding === "base64"
                  ? t('asset.onchain')
                  : t('asset.offchain')
                }
            >
              <Chip sx={{m: 0.25}} label={`${t('asset.encoding')}: ${encoding ? encoding : '???'}`} />
            </Tooltip>

            <Tooltip
              TransitionComponent={Zoom}
              disableFocusListener
              title={
                precision === 0
                  ? t('asset.precision_good', {short_name: short_name})
                  : t('asset.precision_bad')
                }
            >
              <Chip sx={{m: 0.25}} label={`${t('asset.precision')}: ${precision}`} />
            </Tooltip>
            {detailsOfIssuer}
          </TabPanel>

          <TabPanel value={value} index={2} id="Tags">
            {
              tagChips && tagChips.length
                ? tagChips
                : <Typography variant="body1" gutterBottom>{t('tags.no_tags')}</Typography>
            }
            <br/>
            {
              nftFlagChips && nftFlagChips.length
                ? nftFlagChips
                : <Typography variant="body1" gutterBottom>{t('tags.no_nft_tags')}</Typography>
            }
          </TabPanel>

          <TabPanel value={value} index={3} id="Share">

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

          </TabPanel>

          <TabPanel value={value} index={4} id="Market">
            <Typography variant="body1" gutterBottom>
              {t('buy.header', {title: title, symbol: symbol})}
            </Typography>

            <a href={`https://wallet.bitshares.org/#/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button sx={{m: 0.25}} variant="contained">Bitshares.org</Button>
            </a>
            <a href={`https://ex.xbts.io/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button sx={{m: 0.25}} variant="contained">XBTS.io</Button>
            </a>
            <a href={`https://dex.iobanker.com/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button sx={{m: 0.25}} variant="contained">ioBanker DEX</Button>
            </a>
            <a href={`https://www.gdex.io/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button sx={{m: 0.25}} variant="contained">GDEX.io</Button>
            </a>
            <Tooltip
              TransitionComponent={Zoom}
              disableFocusListener
              title={t('buy.tooltip', {symbol: symbol})}
            >
              <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
                <Button sx={{m: 0.25}} variant="contained">{t('buy.button')}</Button>
              </a>
            </Tooltip>

            <Typography variant="body1" gutterBottom style={{'paddingTop': '5px'}}>
              Bitshares explorers
            </Typography>
            <a href={`https://cryptofresh.com/a/${symbol}`}>
              <Button sx={{m: 0.25}} variant="contained">cryptofresh</Button>
            </a>
            <a href={`https://bts.ai/asset/${symbol}`}>
              <Button sx={{m: 0.25}} variant="contained">bts.ai</Button>
            </a>
            <a href={`https://blocksights.info/#/assets/${symbol}`}>
              <Button sx={{m: 0.25}} variant="contained">blocksights.info</Button>
            </a>
          </TabPanel>

          <TabPanel value={value} index={5} id="Flags">
            {
              flagChips && flagChips.length
                ? flagChips
                : t('flags.none')
            }
          </TabPanel>

          <TabPanel value={value} index={6} id="Permissions">
            {
              permissionChips && permissionChips.length
                ? permissionChips
                : t('permissions.none')
            }
          </TabPanel>

          <TabPanel value={value} index={7} id="Signature">
            <Typography variant="body1" gutterBottom>
              <b>{t('signature.header')}</b>
            </Typography>
            <TextareaAutosize aria-label={"signature"} minRows={5} style={{'minWidth': '100%'}} defaultValue={nft_signature ? nft_signature : 'N/A'} />
            <Typography variant="body1" gutterBottom>
              <b>{t('signature.signature')}</b>
            </Typography>
            <TextareaAutosize aria-label={"sig_pubkey_or_address"} minRows={5} style={{'minWidth': '100%'}} defaultValue={sig_pubkey_or_address} />
            <Typography variant="body1" gutterBottom>
              <b>{t('signature.password')}</b>
            </Typography>
            <TextareaAutosize aria-label={"password_multihash"} minRows={5} style={{'minWidth': '100%'}} defaultValue={password_multihash} />
          </TabPanel>

          <TabPanel value={value} index={8} id="License">
            <Typography variant="body1" gutterBottom>
              <b>{t('license.header1')}: </b>
              {
                license
                  ? license
                  : t('license.none1')
              }
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>{t('license.header2')}: </b>
              {
                holder_license
                  ? holder_license
                  : t('license.none2')
              }
            </Typography>

          </TabPanel>

          <TabPanel value={value} index={9} id="JSON">
            <TextareaAutosize aria-label={"elasticSearchData"} minRows={5} maxRows={20} style={{'minWidth': '100%'}} defaultValue={asset ? JSON.stringify(asset) : 'N/A'} />
          </TabPanel>
        </Paper>
      </span>
  );
}
