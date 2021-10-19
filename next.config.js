const { i18n } = require('./next-i18next.config');
const ipfsJSON = require('./components/ipfsJSON.json');

module.exports = {
  i18n,
  images: {
    domains: ipfsJSON,
  },
};
