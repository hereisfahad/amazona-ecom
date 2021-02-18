import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../public/nprogress.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

import CartProvider from '@/providers/cart'
import OrderProvider from '@/providers/order'

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', (url) => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <CartProvider>
        <OrderProvider>
          <Component {...pageProps} />
        </OrderProvider>
      </CartProvider>
    </ChakraProvider>
  )
}

export default MyApp
