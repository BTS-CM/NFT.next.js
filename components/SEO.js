import Head from 'next/head'
import config from "./config.json";

function SEO({ description, title, siteTitle, imageURL }) {

  return <>
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="twitter:title" content={title} />
        <meta name="twitter:site" content={`@${config ? config.twitter : ''}`} />
        <meta name="twitter:creator" content={`@${config ? config.twitter : ''}`} />
        <meta property="twitter:description" content={description} />
        <meta name="twitter:image" content={imageURL} />
        <meta property="og:image" content={imageURL} />
      </Head>
  </>;
}

export default SEO;
