import { useState } from 'react';
import dynamic from 'next/dynamic';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
// requires a loader
const Carousel = dynamic(() => import('react-responsive-carousel').then((module) => module.Carousel));
const NFTCard = dynamic(() => import('./NFTCard'));

export default function CarouselElement(properties) {
  const { nfts } = properties;
  const [index, setIndex] = useState(0);

  return (
    <Carousel
      showIndicators={false}
      showThumbs={false}
      stopOnHover
      useKeyboardArrows
      autoFocus
      autoPlay
      infiniteLoop
      interval={5000}
      onChange={(newIndex) => setIndex(newIndex)}
      statusFormatter={(current, total) => `NFT ${current} of ${total}`}
    >
      {
        nfts && nfts.length > 0
          ? nfts.map((nft, i) => <NFTCard
              nft={nft}
              smSize={12}
              key={`${nft.symbol}_card`}
              index={index}
              visible={index === i}
              nearby={index === i - 1 || index === i + 1}
              {...properties}
          />).filter(x => x)
          : []
      }
    </Carousel>
  );
}
