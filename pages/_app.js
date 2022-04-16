import '../styles/globals.css'
import {UserContextProvider} from "../src/context/user-context";


function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider><Component {...pageProps} /></UserContextProvider>
  )
  
  
}

export default MyApp
