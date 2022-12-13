const config = require('./config/config.json');

module.exports = {
  siteUrl: process.env.SITE_URL || `https://${config.domain}`,
  generateRobotsTxt: true,
};
