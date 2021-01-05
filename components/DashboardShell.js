import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import {
    Box,
    Flex,
    Link,
    Button
} from '@chakra-ui/react';
import Footer from './Footer';

const DashboardShell = ({ children }) => {
    const router = useRouter();
    let user = localStorage.getItem('user');
    user = JSON.parse(user)

    const signOut = () => {
        localStorage.removeItem('user')
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
                    maxW="1250px"
                    margin="0 auto"
                    w="full"
                    px={8}
                    h="60px"
                >
                    <Flex align="center">
                        <NextLink href="/" passHref>
                            <Link mr={4}>Amazona Ecom</Link>
                        </NextLink>
                        <NextLink href="/products" passHref>
                            <Link mr={4}>Products</Link>
                        </NextLink>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <NextLink href="/cart" passHref>
                            <Link mr={4}>
                                Cart
                            </Link>
                        </NextLink>
                        {
                            user ? (
                                <Button onClick={() => signOut()}>Sign Out</Button>
                            ) : (
                                    <NextLink href="/signin" passHref>
                                        <Link>
                                            Sign In
                                    </Link>
                                    </NextLink>
                                )
                        }
                    </Flex>
                </Flex>
            </Flex>
            <Flex pos="relative" minHeight="80vh">
                <Flex margin="0 auto" mb={16} direction="column" maxW="1250px" px={[0, 8, 8]}>
                    {children}
                </Flex>
                <Footer/>
            </Flex>
        </Box>
    );
};

export default DashboardShell;
