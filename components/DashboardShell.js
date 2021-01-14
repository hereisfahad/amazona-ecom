import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import {
    Box,
    Flex,
    Link,
    Button,
    Badge
} from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiAmazonLine } from 'react-icons/ri';

import { useCart } from '@/providers/cart';
import Footer from './Footer';

const DashboardShell = ({ children }) => {
    const { cartItems, setCartItems } = useCart()
    const router = useRouter();
    let user = undefined
    if (process.browser) {
        user = localStorage.getItem('user');
        user = JSON.parse(user)
    }
    const signOut = () => {
        setCartItems([])
        localStorage.removeItem('user')
        localStorage.removeItem('cartItems')
        localStorage.removeItem('shippingAddress')
        localStorage.removeItem('paymentMethod')
        router.push('/signin')
    }

    return (
        <Box>
            <Flex
                backgroundColor="gray.100"
                mb={[8, 16]}
                w="full"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    pt={4}
                    pb={4}
                    maxW="100vw"
                    margin="0 auto"
                    w="full"
                    px={8}
                    h="60px"
                >
                    <Flex align="center">
                        <NextLink href="/" passHref>
                            <Link
                                mr={4}
                                fontWeight={router.pathname === "/" ? 'semibold' : 'normal'}
                            >
                                <RiAmazonLine />
                            </Link>
                        </NextLink>
                        <NextLink href="/products" passHref>
                            <Link
                                mr={4}
                                fontWeight={router.pathname === "/products" ? 'semibold' : 'normal'}
                            >
                                Products
                            </Link>
                        </NextLink>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <NextLink href="/cart" passHref>
                            <Link
                                mr={4}
                                fontWeight={router.pathname === "/cart" ? 'semibold' : 'normal'}
                            >
                                <Flex>
                                    <AiOutlineShoppingCart />
                                    {
                                        cartItems.length > 0 && <Badge ml="1" colorScheme="green">{Number(cartItems.length)}</Badge>
                                    }
                                </Flex>
                            </Link>
                        </NextLink>
                        {
                            user ? (
                                <Button onClick={() => signOut()}>Sign Out</Button>
                            ) :
                                (
                                    <NextLink href="/signin" passHref>
                                        <Link
                                            fontWeight={router.pathname === "/signin" ? 'semibold' : 'normal'}
                                        >
                                            Sign In
                                </Link>
                                    </NextLink>
                                )
                        }
                    </Flex>
                </Flex>
            </Flex>
            <Flex pos="relative" minHeight="80vh">
                <Flex margin="0 auto" mb={16} direction="column" maxW="1250px" px={[4, 8, 8]}>
                    {children}
                </Flex>
                <Footer />
            </Flex>
        </Box>
    );
};

export default DashboardShell;
