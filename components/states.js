import { createLocalStorageStateHook } from 'use-local-storage-state'

const useLanguage = createLocalStorageStateHook('language', 'en');

const useTheme = createLocalStorageStateHook('light');

const useGateway = createLocalStorageStateHook('cf-ipfs.com');


export {
  useLanguage,
  useTheme,
  useGateway
};
