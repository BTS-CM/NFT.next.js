import { createLocalStorageStateHook } from 'use-local-storage-state';
import config from './config.json';

const useLanguage = createLocalStorageStateHook('language', 'en');
const useTheme = createLocalStorageStateHook('theme', 'light');
const useGateway = createLocalStorageStateHook('gateway', 'cf-ipfs.com');
const useAnalytics = createLocalStorageStateHook('analytics', config && config.google_analytics ? true : false);
const useEnvironment = createLocalStorageStateHook('environment', 'production');
const useMenuOpen = createLocalStorageStateHook('menuOpen', false);
const useApproval = createLocalStorageStateHook('consent', "request");
const useProdConnection = createLocalStorageStateHook('prodNetwork', "wss://eu.nodes.bitshares.ws");
const useTestnetConnection = createLocalStorageStateHook('testNetwork', "wss://node.testnet.bitshares.eu");

export {
  useLanguage,
  useTheme,
  useGateway,
  useAnalytics,
  useEnvironment,
  useMenuOpen,
  useApproval,
  useProdConnection,
  useTestnetConnection
};
