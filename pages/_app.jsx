import { Provider } from 'next-auth/client'
import '../src/shared/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<Provider session={pageProps.session}><Component {...pageProps} /></Provider>)
}

export default MyApp
