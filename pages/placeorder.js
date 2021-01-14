import {
    Text,
    Flex,
    List,
    ListItem,
    Button,
    Grid,
    GridItem,
    Img,
} from "@chakra-ui/react";
import { useRouter } from 'next/router'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import { useOrder } from '@/providers/order';
import { useCart } from '@/providers/cart';

const ShippingCost = 10.00
const TaxCost = 11.70

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

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Order Detail
            </Text>
            <Grid
                w="80vw"
                maxW="90vw"
                templateRows="repeat(3, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >

                {/* shipping*/}
                <GridItem rowSpan={1} colSpan={[5, 5, 3]}>
                    <Flex
                        direction="column"
                        bg="gray.100"
                        rounded="md"
                        p={4}
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
                </GridItem>

                {/* payment*/}
                <GridItem rowSpan={1} colSpan={[5, 5, 3]}>
                    <Flex
                        direction="column"
                        bg="gray.100"
                        rounded="md"
                        p={4}
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
                </GridItem>

                {/* order items*/}
                <GridItem rowSpan={1} colSpan={[5, 5, 3]}>
                    <Flex
                        direction="column"
                        bg="gray.100"
                        rounded="md"
                        p={4}
                        border="1px solid"
                        borderColor="gray.300"
                    >
                        <Text fontWeight="bold" mb={2}>Order Items</Text>
                        <List mb={2}>
                            {cartItems.map((item, index) => (
                                <ListItem display="flex" justifyContent="space-between" mb={1}>
                                    <Img src={item.image} alt="Segun Adebayo" maxWidth="4rem" width="100%" rounded="md" />
                                    <Text>{item.name}</Text>
                                    <Text>{item.quantity} x ${item.price} = ${item.quantity * item.price}</Text>
                                </ListItem>
                            ))}
                        </List>
                    </Flex>
                </GridItem>

                {/* order summary*/}
                <GridItem rowSpan={2} colSpan={[5, 5, 2]} rowStart={["4", "4", "1"]} colStart={["1", "1", "4"]}>
                    <Flex
                        direction="column"
                        bg="gray.100"
                        rounded="md"
                        p={4}
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
                                    <Text>Shipping: </Text> <Text fontSize="lg">${ShippingCost.toFixed(2)}</Text>
                                </Flex>
                                <Flex justifyContent="space-between">
                                    <Text>Tax: </Text> <Text fontSize="lg">${TaxCost.toFixed(2)}</Text>
                                </Flex>
                                <Flex justifyContent="space-between" fontWeight="semibold">
                                    <Text>Order Total: </Text> <Text fontSize="lg">${(cartTotal + ShippingCost + TaxCost).toFixed(2)}</Text>
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
                </GridItem>

            </Grid>

        </DashboardShell>
    )
}

const PlaceOrderPage = () => (
    <Page name="PlaceOrder" path="/placeorder">
        <PlaceOrder />
    </Page>
);

export default PlaceOrderPage
