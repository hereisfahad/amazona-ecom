import {
    Text,
    Flex,
    List,
    ListItem,
    Button,
    Box,
    SimpleGrid,
    Img,
} from "@chakra-ui/react";
import { useRouter } from 'next/router'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import { Table, Tr, Th, Td } from '@/components/Table';
import { useOrder } from '@/providers/order';
import { useCart } from '@/providers/cart';

const TaxRate = 0.15

const PlaceOrder = () => {
    const router = useRouter()
    const { shippingAddress, paymentMethod } = useOrder()
    const { cartItems, cartTotal } = useCart()

    if (!shippingAddress) router.push('/shipping')
    if (!paymentMethod) router.push('/payment-method')

    if (process.browser) {
        let user = localStorage.getItem('user');
        if (!user) router.push('/signin?redirect=placeorder')
    }

    const handleSubmit = () => { }

    const { fullName, address, city, country, postalCode } = shippingAddress

    const taxCost = TaxRate * cartTotal
    const shippingCost = cartTotal > 100 ? 0 : 10
    const orderTotal = cartTotal + shippingCost + taxCost

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Order Detail
            </Text>
            <SimpleGrid
                columns={[1, 1, 2]}
                spacing={[0, 0, 10]}
            >
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
                        <Text fontWeight="bold" mb={2}>Shipping</Text>
                        <List mb={2}>
                            <ListItem display="flex" flexDirection="column" justifyContent="space-between" mb={1}>
                                <Flex>
                                    <Text fontWeight="bold" mr={2}>Name: </Text> <Text fontSize="lg">{fullName}</Text>
                                </Flex>
                                <Flex>
                                    <Text fontWeight="bold" mr={2}>Address: </Text> <Text fontSize="lg">{address}, {city}, {postalCode}, {country}</Text>
                                </Flex>
                            </ListItem>
                        </List>
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
                        <Text fontWeight="bold" mb={2}>Payment</Text>
                        <List mb={2}>
                            <ListItem display="flex" flexDirection="column" justifyContent="space-between" mb={1}>
                                <Flex justifyContent="space-between">
                                    <Text fontWeight="bold" mr={2}>Method: </Text> <Text fontSize="lg">{paymentMethod}</Text>
                                </Flex>
                            </ListItem>
                        </List>
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
                        <Text fontWeight="bold" mb={2}>Order Items</Text>
                        <Box overflowX="scroll">
                            <Table w="full">
                                <thead>
                                    <Tr>
                                        <Th>Image</Th>
                                        <Th>Name</Th>
                                        <Th>Price</Th>
                                    </Tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <Box as="tr" key={index}>
                                            <Td>
                                                <Img src={item.image} alt="Segun Adebayo" maxWidth="4rem" width="100%" rounded="md" />
                                            </Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.quantity} x ${item.price} = ${item.quantity * item.price}</Td>
                                        </Box>
                                    ))}
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
                    <Text fontWeight="bold" mb={2}>Order Summary</Text>
                    <List mb={2}>
                        <ListItem display="flex" flexDirection="column" justifyContent="space-between" mb={1}>
                            <Flex justifyContent="space-between">
                                <Text>Items: </Text> <Text fontSize="lg">${cartTotal.toFixed(2)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <Text>Shipping: </Text> <Text fontSize="lg">${shippingCost.toFixed(2)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <Text>Tax: </Text> <Text fontSize="lg">${taxCost.toFixed(2)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between" fontWeight="semibold">
                                <Text>Order Total: </Text> <Text fontSize="lg">${orderTotal.toFixed(2)}</Text>
                            </Flex>
                        </ListItem>
                    </List>
                    <Button
                        bg="yellow.400"
                        rounded="md"
                        mt="auto"
                        onClick={handleSubmit}
                    >
                        Place Order
                    </Button>
                </Flex>

            </SimpleGrid>

        </DashboardShell>
    )
}

const PlaceOrderPage = () => (
    <Page name="PlaceOrder" path="/placeorder">
        <PlaceOrder />
    </Page>
);

export default PlaceOrderPage
