import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ApolloProvider } from "@apollo/client";
import client from "./utils/apollo-client";

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { goerli } from '@wagmi/core'

const root = ReactDOM.createRoot(document.getElementById('root'));

const { chains, provider } = configureChains(
  [goerli],
  [
    publicProvider(),
    alchemyProvider({ apiKey: "-f1bNPxcDDQWWMLZ16JRG7aWTPmfNGYz" })
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Rambling App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains} theme={midnightTheme({accentColor:'orange', borderRadius:'none'})}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  </React.StrictMode>
);