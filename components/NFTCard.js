import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import Image from 'next/image';

const Card = dynamic(() => import('@mui/material/Card'));
const CardContent = dynamic(() => import('@mui/material/CardContent'));
const CardMedia = dynamic(() => import('@mui/material/CardMedia'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Button = dynamic(() => import('@mui/material/Button'));
const Menu = dynamic(() => import('@mui/material/Menu'));
const Grid = dynamic(() => import('@mui/material/Grid'));

import { CardActionArea, CardActions } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';

import CustomLink from './CustomLink';
import { useLanguage } from './states';

export default function NFTCard(properties) {

  let visible = properties && properties.visible ? properties.visible : null;
  let nearby = properties && properties.nearby ? properties.nearby : null;
  let isMobile = properties && properties.isMobile ? properties.isMobile : false;
  let isApple = properties && properties.isApple ? properties.isApple : false;

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const { t } = useTranslation('gallery');
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
  if (visible || inView) {
    media = isApple
              ? <img
                  sx={{width: '100%', height: '100%'}}
                  alt={`${symbol} NFT apple image`}
                  src={!media_json ? `/images/${symbol}/0${isMobile ? '_gallery' : ''}.webp` : "/images/placeholders/0.webp"}
                />
              : <CardMedia
                  component="img"
                  sx={{width: '100%', height: '100%'}}
                  image={!media_json ? `/images/${symbol}/0${isMobile ? '_gallery' : ''}.webp` : "/images/placeholders/0.webp"}
                  alt={`${symbol} NFT image`}
                />;
  } else if (nearby) {
    media = isApple
              ? <img
                  sx={{width: '100%', height: '100%'}}
                  alt={`${symbol} NFT apple image`}
                  src={!media_json ? `/images/${symbol}/0_thumb.webp` : "/images/placeholders/0.webp"}
                />
              : <CardMedia
                  component="img"
                  sx={{width: '100%', height: '100%'}}
                  image={!media_json ? `/images/${symbol}/0_thumb.webp` : "/images/placeholders/0.webp"}
                  alt={`${symbol} NFT image`}
                />
  }


  return (
    <Grid item xs={12} sm={12} key={"Right info"}>
        <Card
          sx={{
            p: 3,
            textAlign: 'center',
            m: 0.75
          }}
        >
          <CardActionArea ref={ref} href={address + "/nft/" + symbol}>
            {media}
          </CardActionArea>
          <CardActionArea href={address + "/nft/" + symbol}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" sx={{color: 'text.secondary'}}>
                {t('created_text', {artist: artist})}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid item xs={6} key={"left button"}>
            </Grid>
            <Grid item xs={6} key={"right button"}>

            </Grid>
          </CardActions>
        </Card>
    </Grid>
  );
}
