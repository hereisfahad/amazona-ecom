import { ChakraProvider } from '@chakra-ui/react'
import CartProvider from '@/providers/cart'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}

export default MyApp
