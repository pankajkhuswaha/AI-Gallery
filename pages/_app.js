import Footer from '@/layouts/Footer'
import Navbar from '@/layouts/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (<>
    <Navbar/>
    <Component {...pageProps} />
    {/* <Footer/> */}
  </>)
}
