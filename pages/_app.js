//import '../styles/globals.css' // revisit tailwinds
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '../lib/wagmi'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
