import { UserContextProvider } from '../src/context/user-context'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
