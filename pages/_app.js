// pages/_app.js
//import '../styles/globals.css' // revisit tailwinds
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors'

// 1. Configure chains with a Viem-backed public client
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    ({ chain }) =>
      createPublicClient({
        chain,
        transport: http(),
      }),
  ]
)

// 2. Build your Wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,       // <-- make sure this matches the destructured 'chains' above
    }),
  ],
  publicClient,        // <-- comma here is required
  webSocketPublicClient
})

export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
