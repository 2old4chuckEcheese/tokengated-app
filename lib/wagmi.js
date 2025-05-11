// lib/wagmi.js
import { http, createConfig, configureChains } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'

// 1. Set up chains + transports
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [http()]
)

// 2. Create the Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),  // injected (MetaMask) wallet
  ],
  publicClient,
  webSocketPublicClient,
})
