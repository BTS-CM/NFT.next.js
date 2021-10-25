import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Fade } from "react-awesome-reveal";

import CustomLink from './CustomLink';

import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'next-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion"

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

import { useLanguage } from './states';


export default function NFTCard(properties) {

  let id = properties.id;
  let smSize = properties.smSize;
  const { t } = useTranslation('gallery');
  const classes = useStyles();
  const [language, setLanguage] = useLanguage();
  const [anchor, setAnchor] = useState(null);

  if (!id || !id.includes(".")) {
    return (<Typography gutterBottom variant="h6" component="h4">
            Loading NFT info...
          </Typography>);
  }

  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleGateway = (gateway) => {
    handleClose();
  }

  const asset = require(`./assets/${id}.json`);

  let issuer = asset ? asset.issuer : undefined;
  let precision = asset ? asset.precision : undefined;
  let symbol = asset ? asset.symbol : undefined;

  let description = asset && asset.description ? asset.description : undefined;
  let market = description ? description.market : undefined;

  let nft_object = description ? description.nft_object : undefined;
  let title = nft_object && nft_object.title ? nft_object.title : undefined;
  let artist = nft_object && nft_object.artist ? nft_object.artist : undefined;

  let address = language && !language.includes("en") ? `/${language}` : ``;

  return (
    <Grid item xs={12} sm={smSize} key={"Right info"}>
      <motion.div
        whileHover={{ scale: smSize > 4 ? 1 : 1.05 }}
        whileTap={{ scale: smSize > 4 ? 1 : 0.95 }}
      >
        <Fade triggerOnce={true}>
          <Card className={smSize > 4 ? classes.bigcard : classes.card}>
            <CardActionArea href={address + "/nft/" + symbol}>
              <CardMedia
                component="img"
                width="100%"
                height="100%"
                image={`/images/${id}/0.webp`}
                alt={`${symbol} NFT image`}
              />
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
        </Fade>
      </motion.div>
    </Grid>
  );
}
