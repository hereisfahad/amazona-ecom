import { Text, SimpleGrid, Link, Flex, Spinner } from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import NextLink from 'next/link';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import ProductCard from '@/components/ProductCard'

const Products = () => {
    const { data } = useSWR(`/api/products`, fetcher);
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
    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                List of products
            </Text>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={10} mt={2}
            >
                {
                    data && data?.products.map(product => {
                        return (
                            <NextLink key={product._id} href={`/product/${product._id}`} passHref>
                                <Link>
                                    <ProductCard product={product} _hover={{ cursor: 'pointer'}}/>
                                </Link>
                            </NextLink>
                        )
                    })
                }
            </SimpleGrid>
        </DashboardShell>
    )
}

const ProductsPage = () => (
    <Page name="Products" path="/products">
        <Products />
    </Page>
);

export default ProductsPage