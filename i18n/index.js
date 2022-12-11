const languages = ['en', 'fr', 'da', 'de', 'ee', 'es', 'it', 'ja', 'ko', 'pt', 'th', 'ukr', 'zhTW'];
const pages = [
  'carousel',
  'common',
  'gallery',
  'license',
  'listings',
  'mainpage',
  'marketorders',
  'nav',
  'news',
  'nft',
  'search',
  'settings',
  'viewers',
];

const translations = {};
languages.forEach((language) => {
  const localPages = {};
  pages.forEach((page) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const pageContents = require(`./locales/${language}/${page}.json`);
    localPages[page] = pageContents;
  });
  translations[language] = localPages;
});

const i18n = {
  translations,
  defaultLang: 'en',
};

module.exports = i18n;
