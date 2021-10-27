import { createLocalStorageStateHook } from 'use-local-storage-state';
import config from './config.json';

const useLanguage = createLocalStorageStateHook('language', 'en');
const useTheme = createLocalStorageStateHook('theme', 'light');
const useGateway = createLocalStorageStateHook('gateway', 'cf-ipfs.com');
const useAnalytics = createLocalStorageStateHook('analytics', config && config.google_analytics ? true : false);
const useEnvironment = createLocalStorageStateHook('environment', 'production');

export {
  useLanguage,
  useTheme,
  useGateway,
  useAnalytics,
  useEnvironment
};
