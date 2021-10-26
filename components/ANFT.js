import React, {useState} from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

import OBJT from "./OBJT";
import config from "./config.json";

import IssuerDetails from "./IssuerDetails";
import NFTHolder from "./NFTHolder";
import IPFSCarouselElement from "./IPFSCarousel";

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
  let id = properties.id;
  const { t } = useTranslation('nft');

  if (!id || !id.includes(".")) {
    return (<Typography gutterBottom variant="h6" component="h4">
            Loading NFT info...
          </Typography>);
  }

  const initAssetData = require(`./assets/${id}.json`);
  const [asset, setAsset] = useState(initAssetData ? initAssetData : undefined);
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

  let { image, imgURL } = getImage(nft_object);

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

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginBottom: individual ? theme.spacing(0) : theme.spacing(2)
    },
    chip: {
      margin: theme.spacing(0.25)
    },
    media: {
      maxWidth: '100%'
    },
    root: {
      textAlign: 'center'
    },
    a: {
      color: theme.palette.text.Primary,
      textDecoration: 'none'
    },
    share: {
      margin: theme.spacing(0.25)
    },
    button: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const flagChips = asset_flags
    ? Object.keys(asset_flags).map(
        (flag) => {
          const flagValue = asset_flags[flag];
          return flagValue === true
            ? <Chip
                className={classes.chip}
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
          return <Tooltip
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
                    className={classes.chip}
                    avatar={<Avatar>{permissionValue === true || permissionValue === 'true'  ? '✔' : '❌'}</Avatar>}
                    label={permission.replace(/_/g, ' ')}
                    key={permission + '_chip'}
                   />
                </Tooltip>;

        }
      )
    : undefined;

  const tagChips = tags
    ? tags.map((tag) => {
      return <Chip
        className={classes.chip}
        label={tag}
        key={`tagchip: ${tag}`}
       />
      })
    : undefined;

  const nftFlagChips = nft_flags
    ? nft_flags.map((flag) => {
      return <Chip
        className={classes.chip}
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
  if (imgURL && !media_png_multihashes) {
    const dimensions = getPngDimensions(image);
    if (dimensions) {
      height = dimensions.height;
      width = dimensions.width;
    }
  }

  return (

      <span style={{'paddingBottom': '25px'}} key={symbol + "NFT"}>
        <Paper className={classes.paper} id={id}>
          <Typography gutterBottom variant="h4" component="h1">
            &quot;<Link href={`/nft/${symbol}`} className={classes.a} passHref><a>{short_name}</a></Link>&quot;{t('by')}{artist}
          </Typography>
          {
            imgURL && !media_png_multihashes
              ? <a href={imgURL}>
                  <Image
                    key={short_name + " Image"}
                    src={imgURL}
                    height={height}
                    width={width}
                    alt={short_name + " image"}
                    className={classes.media}
                  />
                </a>
              : <OBJT data={image} />
          }

          {
            asset && media_png_multihashes
              ? <IPFSCarouselElement media_png_multihashes={media_png_multihashes} asset={asset} />
              : undefined
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
            <Chip className={classes.chip} label={`${t('asset.name')}: ${symbol ? symbol : '???'}`} />
            {holder}
            <Chip className={classes.chip} label={`${t('asset.quantity')}: ${current_supply ? current_supply : '???'}`} />
            <Chip className={classes.chip} label={`${t('asset.file_type')}: ${type ? type : '???'}`} />

            <Tooltip
              TransitionComponent={Zoom}
              disableFocusListener
              title={
                encoding === "base64"
                  ? t('asset.onchain')
                  : t('asset.offchain')
                }
            >
              <Chip className={classes.chip} label={`${t('asset.encoding')}: ${encoding ? encoding : '???'}`} />
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
              <Chip className={classes.chip} label={`${t('asset.precision')}: ${precision}`} />
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
                className={classes.share}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                title={helmet_description}
                className={classes.share}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <TelegramShareButton
                url={shareUrl}
                title={title}
                className={classes.share}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className={classes.share}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl} className={classes.share} >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className={classes.share}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>

              <TumblrShareButton
                url={shareUrl}
                title={title}
                className={classes.share}
              >
                <TumblrIcon size={32} round />
              </TumblrShareButton>

              <LivejournalShareButton
                url={shareUrl}
                title={title}
                description={shareUrl}
                className={classes.share}
              >
                <LivejournalIcon size={32} round />
              </LivejournalShareButton>

              <MailruShareButton
                url={shareUrl}
                title={title}
                className={classes.share}
              >
                <MailruIcon size={32} round />
              </MailruShareButton>

              <EmailShareButton
                url={shareUrl}
                subject={title}
                body="body"
                className={classes.share}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>

              <ViberShareButton
                url={shareUrl}
                title={title}
                className={classes.share}
              >
                <ViberIcon size={32} round />
              </ViberShareButton>

              <WorkplaceShareButton
                url={shareUrl}
                quote={title}
                className={classes.share}
              >
                <WorkplaceIcon size={32} round />
              </WorkplaceShareButton>

              <LineShareButton
                url={shareUrl}
                title={title}
                className={classes.share}
              >
                <LineIcon size={32} round />
              </LineShareButton>

              <PocketShareButton
                url={shareUrl}
                title={title}
                className={classes.share}
              >
                <PocketIcon size={32} round />
              </PocketShareButton>

              <InstapaperShareButton
                url={shareUrl}
                title={title}
                className={classes.share}
              >
                <InstapaperIcon size={32} round />
              </InstapaperShareButton>

              <HatenaShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className={classes.share}
              >
                <HatenaIcon size={32} round />
              </HatenaShareButton>

          </TabPanel>

          <TabPanel value={value} index={4} id="Market">

            <Typography variant="body1" gutterBottom>
              {t('buy.header', {title: title, symbol: symbol})}
            </Typography>

            <a href={`https://wallet.bitshares.org/#/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button className={classes.button} variant="contained">Bitshares.org</Button>
            </a>
            <a href={`https://ex.xbts.io/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button className={classes.button} variant="contained">XBTS.io</Button>
            </a>
            <a href={`https://dex.iobanker.com/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button className={classes.button} variant="contained">ioBanker DEX</Button>
            </a>
            <a href={`https://www.gdex.io/market/${symbol}_${market ? market : 'BTS'}`}>
              <Button className={classes.button} variant="contained">GDEX.io</Button>
            </a>
            <Tooltip
              TransitionComponent={Zoom}
              disableFocusListener
              title={t('buy.tooltip', {symbol: symbol})}
            >
              <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
                <Button className={classes.button} variant="contained">{t('buy.button')}</Button>
              </a>
            </Tooltip>

            <Typography variant="body1" gutterBottom style={{'paddingTop': '5px'}}>
              Bitshares explorers
            </Typography>
            <a href={`https://cryptofresh.com/a/${symbol}`}>
              <Button className={classes.button} variant="contained">cryptofresh</Button>
            </a>
            <a href={`https://bts.ai/asset/${symbol}`}>
              <Button className={classes.button} variant="contained">bts.ai</Button>
            </a>
            <a href={`https://blocksights.info/#/assets/${symbol}`}>
              <Button className={classes.button} variant="contained">blocksights.info</Button>
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
