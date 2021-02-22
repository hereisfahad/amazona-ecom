import { useState } from 'react'
import {
    Text,
    Flex,
    List,
    ListItem,
    Button,
    Box,
    SimpleGrid,
    Img,
    Alert,
    useToast
} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { format } from 'date-fns'
import { loadStripe } from "@stripe/stripe-js";

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import { Table, Tr, Th, Td } from '@/components/Table';
import OrderDetailSkeleton from '@/skeletons/OrderDetailSkeleton';
import { useAuth } from '@/providers/auth';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const OrderDetail = () => {
    const { user } = useAuth()
    const router = useRouter()
    const toast = useToast()
    const [loading, setLoading] = useState(false);

    const { orderId } = router.query
    const { data } = useSWR(`/api/orders?_id=${orderId}`, fetcher);

    if (!data?.orders) return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl" mb={4}>
                Order Detail
            </Text>
            <SimpleGrid
                columns={[1, 1, 2]}
                spacing={[0, 0, 10]}
            >
                <OrderDetailSkeleton />
            </SimpleGrid>
        </DashboardShell>
    )
    const Order = data?.orders?.[0]
    console.log(Order)

    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
        createdBy
    } = Order
    const { fullName, address, city, country, postalCode } = shippingAddress

    const handleClick = async () => {
        setLoading(true)
        const stripe = await stripePromise;
        const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                totalPrice,
                email: createdBy.email,
            }),
        });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            toast({
                title: "Redirect Error",
                description: result.error.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }
        setLoading(false)
    }

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl" mb={4}>
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
                        {
                            isDelivered ? (
                                <Alert status="info">Delivered at {format(new Date(deliveredAt), 'yyyy-MM-dd')}</Alert>
                            ) : (
                                    <Alert status="info">Not delivered</Alert>
                                )
                        }
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
                        {
                            isPaid ? (
                                <Alert status="info">Paid at {format(new Date(paidAt), 'yyyy-MM-dd')}</Alert>
                            ) : (
                                    <Alert status="info">Not paid</Alert>
                                )
                        }
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
                                    {orderItems.map((item, index) => (
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
                                <Text>Items: </Text> <Text fontSize="lg">${itemsPrice.toFixed(2)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <Text>Shipping: </Text> <Text fontSize="lg">${shippingPrice.toFixed(2)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <Text>Tax: </Text> <Text fontSize="lg">${taxPrice.toFixed(2)}</Text>
                            </Flex>
                            <Flex justifyContent="space-between" fontWeight="semibold">
                                <Text>Order Total: </Text> <Text fontSize="lg">${totalPrice.toFixed(2)}</Text>
                            </Flex>
                        </ListItem>
                    </List>
                    <Button
                        bg="yellow.400"
                        role="link"
                        rounded="md"
                        mt="auto"
                        isLoading={loading}
                        onClick={handleClick}
                        disabled={isPaid}
                    >
                        Pay with stripe
                    </Button>
                </Flex>

            </SimpleGrid>

        </DashboardShell>
    )
}

const OrderDetailPage = () => (
    <Page name="OrderDetail" path="/orderdetail">
        <OrderDetail />
    </Page>
);

export default OrderDetailPage
