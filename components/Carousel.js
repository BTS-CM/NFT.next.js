import React, {useState} from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

import { useGateway } from './states';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useInView } from 'react-intersection-observer';
import NFTCard from "./NFTCard";

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const { getImage } = require("./images");

const useStyles = makeStyles((theme) => ({
  a: {
    textDecoration: "none",
    color: theme.palette.text.secondary
  }
}));

function CarouselItem (properties) {
  const classes = useStyles();

  let id = properties.id;

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (<NFTCard ref={ref} id={id} smSize={12} key={id + "_card"} />);
}

export default function CarouselElement(properties) {
  let art = properties.art;
  let featured = properties.featured;

  let artIds = featured
                ? art
                  .filter(x => x.featured === true)
                  .map(nft => nft.name)
                : art
                  .map(nft => nft.name);

  let carouselItems = artIds && artIds.length > 0
    ? artIds.map(id => {
        return <CarouselItem id={id} key={`CarouselItem: ${id}`} />;
      }).filter(x => x)
    : [];

  return (
    <Carousel
      showIndicators={false}
      showThumbs={false}
      stopOnHover={true}
      useKeyboardArrows={true}
      autoFocus={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      statusFormatter={(current, total) => `NFT ${current} of ${total}`}
    >
      {carouselItems}
    </Carousel>
  );
}
