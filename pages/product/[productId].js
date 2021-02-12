import { useState } from 'react';
import {
    Text,
    SimpleGrid,
    Img,
    Flex,
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
import ProductDetailSkeleton from '@/skeletons/ProductDetailSkeleton';

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { addItem } = useCart()
    const { data } = useSWR(`/api/products?_id=${router.query.productId}`, fetcher);

    const product = data ? data?.products?.[0] : {}

    const handleAddToCart = () => {
        setLoading(true)
        addItem(data?.products[0], Number(quantity))
        router.push('/cart')
    }

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl" mb={4}>
                Product Detail
            </Text>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={10}
                mt={2}
            >
                {
                    !data?.products?.[0] ? <ProductDetailSkeleton /> : (
                        <>
                            <Img src={product.image} alt="product image" />
                            <Flex direction="column">
                                <Text fontWeight="bold" mb={4} fontSize="lg">{product.name}</Text>
                                <Flex mb={1} alignItems="center">
                                    <Rating rating={product.rating} mr={2} />
                                    <Text fontSize="lg" >{product.numReviews} reviews</Text>
                                </Flex>
                                <Text mb={1} fontWeight="500">Price: ${product.price}</Text>
                                <Text fontWeight="500">Description: {product.description}</Text>
                            </Flex>
                            <Flex direction="column" bg="gray.100" rounded="md" p={4} maxHeight="11rem" border="1px solid" borderColor="gray.300">
                                <List mb={2}>
                                    <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                                        <Text>Price</Text> <Text fontSize="lg">${product.price}</Text>
                                    </ListItem>
                                    <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                                        <Text>Status</Text>
                                        {
                                            product.countInStock > 0 ? (
                                                <Text color="green.500">In Stock</Text>
                                            ) : (
                                                    <Text color="red.500">Not available</Text>
                                                )
                                        }
                                    </ListItem>
                                    {
                                        product.countInStock > 0 && (
                                            <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                                                <Text>Quantity</Text>
                                                <NumberInput
                                                    size="sm"
                                                    w="65px"
                                                    step={1}
                                                    defaultValue={1}
                                                    min={1}
                                                    max={product.countInStock}
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
                                    disabled={product.countInStock === 0}
                                    isLoading={loading}
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                            </Flex>
                        </>
                    )
                }
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