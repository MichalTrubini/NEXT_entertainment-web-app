import Layout from '../src/shared/layout/layout'
import '../src/shared/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
