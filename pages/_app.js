// import '../styles/globals.css'; // Revist when we can get tailwind to work
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet }                        from 'wagmi/chains';
import { createPublicClient, http }       from 'viem';
import { InjectedConnector }              from 'wagmi/connectors';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    ({ chain }) =>
     createPublicClient({
        chain,
       transport: http(),
     }),
  ]
);

connectors: [new InjectedConnector({ chains })],
publicClient,
webSocketPublicClient,
});

export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
