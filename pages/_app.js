// import '../styles/globals.css'; // Revist when we can get tailwind to work
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet }                        from '@wagmi/chains';
import { publicProvider }                 from '@wagmi/core/providers/public';
import { InjectedConnector }              from '@wagmi/connectors';

const { publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector()],
  publicClient
});

export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
