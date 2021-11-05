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
import { motion } from "framer-motion";

import CustomLink from './CustomLink';
import CurrentValue from './CurrentValue';
import { useLanguage, useTheme } from './states';

export default function GalleryCard(properties) {
  let isMobile = properties && properties.isMobile ? properties.isMobile : false;
  let isApple = properties && properties.isApple ? properties.isApple : false;

  const { t } = useTranslation('gallery');
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useLanguage();
  const [anchor, setAnchor] = useState(null);
  const [shadow, setShadow] = useState(2);

  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  let index = properties.index;

  let nft = properties.nft;
  let symbol = nft ? nft.symbol : undefined;
  let market = nft ? nft.market : undefined;
  let title = nft ? nft.title : undefined;
  let artist = nft ? nft.artist : undefined;
  let id = nft ? nft.id : undefined;

  let media_json = nft ? nft.media_json : undefined;

  let address = language && !language.includes("en") ? `/${language}` : ``;

  let media = isApple
                ? <img
                    sx={{width: '100%', height: '100%'}}
                    alt={`${symbol} NFT apple image`}
                    src={!media_json ? `/images/${symbol}/0_gallery.webp` : "/images/placeholders/0.webp"}
                  />
                : <CardMedia
                    component="img"
                    sx={{width: '100%', height: '100%'}}
                    image={!media_json ? `/images/${symbol}/0_gallery.webp` : "/images/placeholders/0.webp"}
                    alt={`${symbol} NFT image`}
                  />;

  return (
    <motion.div
      onHoverStart={e => {
        setShadow(5)
      }}
      onHoverEnd={e => {
        setShadow(2)
      }}
    >
      <Card
        sx={{
          p: 1,
          textAlign: 'center',
          ml: index > 0 ? 1.5 : 1,
          mr: index < 3 ? 1.5 : 1,
          borderRadius: 4,
        }}
        style={{boxShadow: `0 0 ${shadow * 2}px ${theme === 'dark' ? 'white' : 'grey'}`}}
      >
        <CardActionArea href={address + "/nft/" + symbol}>
          {media}
        </CardActionArea>
        <CardActionArea href={address + "/nft/" + symbol}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body1" sx={{color: 'text.secondary'}}>
              {t('created_text', {artist: artist})}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              <CurrentValue id={id} market={market} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
