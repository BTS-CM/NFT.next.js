import create from 'zustand';
//import config from '../config/config.json';

const useAppStore = create((set) => ({
  theme: 'light',
  gateway: 'ipfs.io',
  environment: 'production',
  menuOpen: false,
  prodNetwork: 'wss://eu.nodes.bitshares.ws',
  testNetwork: 'wss://node.testnet.bitshares.eu',
  setTheme: (theme) => set({ theme }),
  setGateway: (gateway) => set({ gateway }),
  setEnvironment: (environment) => set({ environment }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setProdNetwork: (prodNetwork) => set({ prodNetwork }),
  setTestNetwork: (testNetwork) => set({ testNetwork }),
}));

export {
  useAppStore,
};
