import React from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link } from '@chakra-ui/react';
import Footer from './Footer';

const DashboardShell = ({ children }) => {
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
                            <Link>
                                Amazona Ecom
                            </Link>
                        </NextLink>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <NextLink href="/login" passHref>
                            <Link mr={4}>
                                Cart
                            </Link>
                        </NextLink>
                        <NextLink href="/login" passHref>
                            <Link>
                                SignIn
                            </Link>
                        </NextLink>
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