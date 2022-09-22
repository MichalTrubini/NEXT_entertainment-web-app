import { SessionProvider } from 'next-auth/react'
import '../src/shared/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<SessionProvider session={pageProps.session}><Component {...pageProps} /></SessionProvider>)
}

export default MyApp
