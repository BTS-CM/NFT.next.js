import { createLocalStorageStateHook } from 'use-local-storage-state'

const useLanguage = createLocalStorageStateHook('language', 'en');

const useTheme = createLocalStorageStateHook('light');

const useGateway = createLocalStorageStateHook('cf-ipfs.com');

const useAnalytics = createLocalStorageStateHook(false);

const useEnvironment = createLocalStorageStateHook('production');

export {
  useLanguage,
  useTheme,
  useGateway,
  useAnalytics,
  useEnvironment
};
