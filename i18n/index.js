const languages = ['en', 'fr', 'da', 'de', 'ee', 'es', 'it', 'ja', 'ko', 'pt', 'th', 'zhTW'];
const pages = [
  'about',
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
  'viewers'
];

let translations = {};
languages.forEach((language) => {
  let localPages = {}
  pages.forEach((page) => {
    let pageContents = require(`./locales/${language}/${page}.json`);
    localPages[page] = pageContents;
  })
  translations[language] = localPages;
});

const i18n = {
	translations: translations,
	defaultLang: 'en'
}

module.exports = i18n;
