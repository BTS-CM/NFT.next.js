import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import Image from 'next/image';

const Card = dynamic(() => import('@mui/material/Card'));
const CardContent = dynamic(() => import('@mui/material/CardContent'));
const CardMedia = dynamic(() => import('@mui/material/CardMedia'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Button = dynamic(() => import('@material-ui/core/Button'));
const Menu = dynamic(() => import('@material-ui/core/Menu'));
const Grid = dynamic(() => import('@material-ui/core/Grid'));

import { CardActionArea, CardActions } from '@mui/material';
import MenuItem from '@material-ui/core/MenuItem';

import { useTranslation } from 'next-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion"
import { useInView } from 'react-intersection-observer';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  bigcard: {
    padding: theme.spacing(3),
    textAlign: 'center',
    margin: theme.spacing(0.75)
  },
  a: {
    color: theme.palette.text.secondary
  }
}));

import CustomLink from './CustomLink';
import { useLanguage } from './states';

export default function NFTCard(properties) {

  let smSize = properties.smSize;
  let visible = properties && properties.visible ? properties.visible : null;
  let nearby = properties && properties.nearby ? properties.nearby : null;

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const { t } = useTranslation('gallery');
  const classes = useStyles();
  const [language, setLanguage] = useLanguage();
  const [anchor, setAnchor] = useState(null);

  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  let nft = properties.nft;
  let symbol = nft ? nft.symbol : undefined;
  let market = nft ? nft.market : undefined;
  let title = nft ? nft.title : undefined;
  let artist = nft ? nft.artist : undefined;
  let media_json = nft ? nft.media_json : undefined;

  let address = language && !language.includes("en") ? `/${language}` : ``;

  let media = null;
  if (visible || smSize === 4 && inView) {
    media = <CardMedia
        component="img"
        width="100%"
        height="100%"
        image={!media_json ? `/images/${symbol}/0${smSize === 4 ? '_gallery' : ''}.webp` : "/images/placeholders/0.webp"}
        alt={`${symbol} NFT image`}
      />
  } else if (nearby) {
    media = <CardMedia
        component="img"
        width="100%"
        height="100%"
        image={!media_json ? `/images/${symbol}/0_thumb.webp` : "/images/placeholders/0.webp"}
        alt={`${symbol} NFT image`}
      />
  }

  return (
    <Grid item xs={12} sm={smSize} key={"Right info"}>
      <motion.div
        whileHover={{ scale: smSize > 4 ? 1 : 1.05 }}
        whileTap={{ scale: smSize > 4 ? 1 : 0.95 }}
      >
          <Card className={smSize > 4 ? classes.bigcard : classes.card}>
            <CardActionArea ref={ref} href={address + "/nft/" + symbol}>
              {media}
            </CardActionArea>
            <CardActionArea href={address + "/nft/" + symbol}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" className={classes.a}>
                  {t('created_text', {artist: artist})}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid item xs={6} key={"left button"}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    color="success"
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="contained"
                  >
                    {t('button_buy')}
                  </Button>
                </motion.div>

                <Menu
                  id={"basic-menu-" + symbol}
                  anchorEl={anchor}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem component={CustomLink} href={`https://wallet.bitshares.org/#/market/${symbol}_${market ? market : 'BTS'}`} key={`bitshares.org buy ${symbol}`} onClick={handleClose}>
                    Bitshares.org
                  </MenuItem>
                  <MenuItem component={CustomLink} href={`https://ex.xbts.io/market/${symbol}_${market ? market : 'BTS'}`} key={`XBTS buy ${symbol}`} onClick={handleClose}>
                    XBTS.io
                  </MenuItem>
                  <MenuItem component={CustomLink} href={`https://dex.iobanker.com/market/${symbol}_${market ? market : 'BTS'}`} key={`ioBanker buy ${symbol}`} onClick={handleClose}>
                    ioBanker DEX
                  </MenuItem>
                  <MenuItem component={CustomLink} href={`https://www.gdex.io/market/${symbol}_${market ? market : 'BTS'}`} key={`GDEX buy ${symbol}`} onClick={handleClose}>
                    GDEX.io
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={6} key={"right button"}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    color="success"
                    href={address + "/nft/" + symbol}
                    variant="contained"
                  >
                    {t('button_info')}
                  </Button>
                </motion.div>
              </Grid>
            </CardActions>
          </Card>
      </motion.div>
    </Grid>
  );
}
