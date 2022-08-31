import '../src/shared/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/shared/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
