import {useState} from 'react';
import dynamic from 'next/dynamic';
import { useGateway } from './states';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const Carousel = dynamic(() => import('react-responsive-carousel').then((module) => module.Carousel));
const NFTCard = dynamic(() => import('./NFTCard'));

export default function CarouselElement(properties) {
  let nfts = properties.nfts;
  const [index, setIndex] = useState(0);

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
      onChange={(index) => setIndex(index)}
      statusFormatter={(current, total) => `NFT ${current} of ${total}`}
    >
      {
        nfts && nfts.length > 0
          ? nfts.map((nft, i) => {
              return <NFTCard
                        nft={nft}
                        smSize={12}
                        key={nft.symbol + "_card"}
                        index={index}
                        visible={index === i}
                        nearby={index === i - 1 || index === i + 1}
                        {...properties}
                      />
            }).filter(x => x)
          : []
      }
    </Carousel>
  );
}
