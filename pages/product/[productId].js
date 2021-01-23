import { useState } from 'react';
import {
    Text,
    SimpleGrid,
    Img,
    Flex,
    Spinner,
    List,
    ListItem,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/router';
import { useCart } from '@/providers/cart';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import Rating from '@/components/Rating';

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { addItem } = useCart()
    const { data } = useSWR(`/api/products?_id=${router.query.productId}`, fetcher);

    if(!data) return (
        <Flex minHeight="100vh" justifyContent="center" alignItems="center">
            <Spinner
                thickness="4px"
                speed=".65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Flex>
    )

    const { image, name, rating, numReviews, price, description, countInStock } = data?.products[0]

    const handleAddToCart = () => {
        setLoading(true)
        addItem(data?.products[0], Number(quantity))
        router.push('/cart')
    }

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Product Detail
            </Text>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={10}
                mt={2}
            >
                <Img src={image} alt="product image" />
                <Flex direction="column">
                    <Text fontWeight="bold" mb={4} fontSize="lg">{name}</Text>
                    <Flex mb={1} alignItems="center">
                        <Rating rating={rating} mr={2} />
                        <Text fontSize="lg" >{numReviews} reviews</Text>
                    </Flex>
                    <Text mb={1} fontWeight="500">Price: ${price}</Text>
                    <Text fontWeight="500">Description: {description}</Text>
                </Flex>
                <Flex direction="column" bg="gray.100" rounded="md" p={4} maxHeight="11rem" border="1px solid" borderColor="gray.300">
                    <List mb={2}>
                        <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                            <Text>Price</Text> <Text fontSize="lg">${price}</Text>
                        </ListItem>
                        <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                            <Text>Status</Text>
                            {
                                countInStock > 0 ? (
                                    <Text color="green.500">In Stock</Text>
                                ) : (
                                        <Text color="red.500">Not available</Text>
                                    )
                            }
                        </ListItem>
                        {
                            countInStock > 0 && (
                                <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                                    <Text>Quantity</Text>
                                    <NumberInput
                                        size="sm"
                                        w="65px"
                                        step={1}
                                        defaultValue={1}
                                        min={1}
                                        max={countInStock}
                                        onChange={(value) => setQuantity(value)}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </ListItem>
                            )
                        }
                    </List>
                    <Button
                        bg="yellow.400"
                        rounded="md"
                        disabled={countInStock === 0}
                        isLoading={loading}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </Flex>
            </SimpleGrid>
        </DashboardShell>
    )
}

const ProductPage = () => (
    <Page name="Product" path="/product">
        <Product />
    </Page>
);

export default ProductPage