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
import { GoChevronDown } from 'react-icons/go';

const AdminDashboard = ({ children }) => {
    const router = useRouter();
    let user = undefined
    if (process.browser) {
        user = localStorage.getItem('user');
        user = JSON.parse(user)
    }
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
                    maxW="100vw"
                    margin="0 auto"
                    w="full"
                    px={8}
                    h="60px"
                >
                    <Flex align="center" />
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
                                            <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
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
                <Flex margin="0 auto" mb={16} direction="column" width="100%" maxW="1250px" px={[4, 8, 8]}>
                    {children}
                </Flex>
            </Flex>
        </Box>
    );
};

export default AdminDashboard;
