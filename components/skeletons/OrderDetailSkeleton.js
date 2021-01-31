import {
    Text,
    Flex,
    List,
    ListItem,
    Button,
    Box,
    Alert,
    Skeleton
} from "@chakra-ui/react";

import { Table, Tr, Th, Td } from '@/components/Table';

const OrderDetailSkeleton = () => {
    return (
        <>
            <Flex direction="column">
                {/* shipping*/}
                <Flex
                    direction="column"
                    bg="gray.100"
                    rounded="md"
                    p={[2, 4, 4]}
                    mb={2}
                    border="1px solid"
                    borderColor="gray.300"
                >
                    <Skeleton width="50%" height="15px" mb={2}>Shipping</Skeleton>
                    <List mb={2}>
                        <ListItem display="flex" flexDirection="column" justifyContent="space-between" mb={1}>
                            <Flex>
                                <Text fontWeight="bold" mr={2}><Skeleton>Name:</Skeleton> </Text> <Text fontSize="lg"><Skeleton>Name:</Skeleton></Text>
                            </Flex>
                            <br />
                            <Flex>
                                <Text fontWeight="bold" mr={2}><Skeleton>Address: </Skeleton></Text> <Text fontSize="lg"><Skeleton>First address, Lahore, 66666, Pakistan</Skeleton></Text>
                            </Flex>
                        </ListItem>
                    </List>
                    <Skeleton><Alert status="info">Not delivered</Alert></Skeleton>
                </Flex>

                {/* payment*/}
                <Flex
                    direction="column"
                    bg="gray.100"
                    rounded="md"
                    p={[2, 4, 4]}
                    mb={2}
                    border="1px solid"
                    borderColor="gray.300"
                >
                    <Skeleton width="45%" height="20px" mb={2}>Payment</Skeleton>
                    <List mb={2}>
                        <ListItem display="flex" flexDirection="column" justifyContent="space-between" mb={1}>
                            <Flex justifyContent="space-between">
                                <Text fontWeight="bold" mr={2}><Skeleton>Method: </Skeleton> </Text> <Text fontSize="lg"><Skeleton>Stripe</Skeleton></Text>
                            </Flex>
                        </ListItem>
                    </List>
                    <Skeleton><Alert status="info">Not paid</Alert></Skeleton>
                </Flex>

                {/* order items*/}
                <Flex
                    direction="column"
                    bg="gray.100"
                    rounded="md"
                    p={[2, 4, 4]}
                    mb={2}
                    border="1px solid"
                    borderColor="gray.300"
                >
                    <Skeleton width="55%" height="20px" mb={2}>Order Items</Skeleton>
                    <Box overflowX="scroll">
                        <Table w="full">
                            <thead>
                                <Tr>
                                    <Th><Skeleton height="16px">Image</Skeleton></Th>
                                    <Th><Skeleton height="16px">Name</Skeleton></Th>
                                    <Th><Skeleton height="16px">Price</Skeleton></Th>
                                </Tr>
                            </thead>
                            <tbody>
                                <Box as="tr">
                                    <Td><Skeleton height="16px">Image</Skeleton></Td>
                                    <Td><Skeleton height="16px">Name</Skeleton></Td>
                                    <Td><Skeleton height="16px">$1200</Skeleton></Td>
                                </Box>
                                <Box as="tr">
                                    <Td><Skeleton height="16px">Image</Skeleton></Td>
                                    <Td><Skeleton height="16px">Name</Skeleton></Td>
                                    <Td><Skeleton height="16px">$1200</Skeleton></Td>
                                </Box>
                            </tbody>
                        </Table>
                    </Box>
                </Flex>
            </Flex>

            {/* order summary*/}
            <Flex
                direction="column"
                bg="gray.100"
                rounded="md"
                p={[2, 4, 4]}
                h="14rem"
                border="1px solid"
                borderColor="gray.300"
            >
                <Skeleton width="50%" height="15px" mb={2}>Order Summary</Skeleton>
                <List mb={2}>
                    <ListItem display="flex" flexDirection="column" justifyContent="space-between" mb={1}>
                        <Flex justifyContent="space-between" mb={1}>
                            <Text><Skeleton>Items: </Skeleton></Text> <Text fontSize="lg"><Skeleton>$1200.00</Skeleton></Text>
                        </Flex>
                        <Flex justifyContent="space-between" mb={1}>
                            <Text><Skeleton>Shipping: </Skeleton></Text> <Text fontSize="lg"><Skeleton>$0.00</Skeleton></Text>
                        </Flex>
                        <Flex justifyContent="space-between" mb={1}>
                            <Text><Skeleton>Tax: </Skeleton></Text> <Text fontSize="lg"><Skeleton>$180.00</Skeleton></Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="semibold">
                            <Text><Skeleton>Order Total:</Skeleton> </Text> <Text fontSize="lg"><Skeleton>$1380.00</Skeleton></Text>
                        </Flex>
                    </ListItem>
                </List>
                <Skeleton>
                    <Button
                        bg="yellow.400"
                        role="link"
                        rounded="md"
                        mt="auto"
                    >
                        Pay with stripe
                    </Button>
                </Skeleton>
            </Flex>
        </>
    )
}

export default OrderDetailSkeleton
