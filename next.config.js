const ipfsJSON = require('./components/ipfsJSON.json');
const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ipfsJSON,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['react-is'] = path.resolve(
      __dirname,
      'node_modules',
      'react-is'
    )
    config.resolve.alias['regenerator-runtime'] = path.resolve(
      __dirname,
      'node_modules',
      'regenerator-runtime'
    )
    config.resolve.alias['strip-ansi'] = path.resolve(
      __dirname,
      'node_modules',
      'strip-ansi'
    )
    return config
  },
};
