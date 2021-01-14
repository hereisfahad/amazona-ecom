import { ChakraProvider } from '@chakra-ui/react'
import CartProvider from '@/providers/cart'
import OrderProvider from '@/providers/order'

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
