import {
    Text,
    SimpleGrid,
    Img,
    Flex,
    List,
    ListItem,
    Button
} from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/router';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import Rating from '@/components/Rating';

const Product = () => {
    const { query } = useRouter();
    const { data } = useSWR(`/api/products?_id=${query.productId}`, fetcher);
    if(!data) return 'loading...'
    const { image, name, rating, numReviews, price, description, countInStock } = data?.products[0]
    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Product Detail
            </Text>
            <SimpleGrid
                columns={[2, null, 3]}
                spacing={10} mt={2}>
                <Img src={image} alt="product image" />
                <Flex direction="column">
                    <Text fontWeight="bold" mb={4} fontSize="lg">{name}</Text>
                    <Flex mb={1} alignItems="center">
                        <Rating rating={rating} mr={2}/>
                        <Text fontSize="lg" >{numReviews} reviews</Text>
                    </Flex>
                    <Text mb={1} fontWeight="500">Price: ${price}</Text>
                    <Text fontWeight="500">Description: {description}</Text>
                </Flex>
                <Flex direction="column" bg="gray.100" rounded="md" p={4} h="9rem" border="1px solid" borderColor="gray.300">
                    <List mb={2}>
                        <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                            <Text>Price</Text> <Text fontSize="lg">${price}</Text>
                        </ListItem>
                        <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                            <Text>Status</Text> 
                            {
                                countInStock > 0 ? (
                                    <Text color="green.500">In Stock</Text>
                                ): (
                                    <Text color="red.500">Not available</Text>
                                )
                            }
                        </ListItem>
                    </List>
                    <Button bg="yellow.400" rounded="md" disabled={countInStock === 0}>
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