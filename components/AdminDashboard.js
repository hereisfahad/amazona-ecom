import NextLink from 'next/link';
import { useRouter } from 'next/router'
import {
    Box,
    Flex,
    Link,
    Button,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { RiAmazonLine } from 'react-icons/ri';
import { GoChevronDown } from 'react-icons/go';

import { useAuth } from '@/providers/auth';
import AuthModal from './AuthModal';

const AdminDashboard = ({ children }) => {
    const router = useRouter();
    const { user, signout } = useAuth()

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
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        {
                            user ? (
                                <>
                                    <Menu autoSelect={false}>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<GoChevronDown />}
                                        >
                                            <Avatar size="sm" name={user.name} src={user.image} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={signout}>Sign Out</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
                            ) :
                                (
                                    <AuthModal bottonText="Sign In" />
                                )
                        }
                    </Flex>
                </Flex>
            </Flex>
            <Flex pos="relative" minHeight="80vh">
                <Flex margin="0 auto" mb={16} direction="column" width="100%" maxW="1250px" px={[4, 8, 8]}>
                    {children}
                </Flex>
            </Flex>
        </Box>
    );
};

export default AdminDashboard;
