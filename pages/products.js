import { Text, SimpleGrid } from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import ProductCard from '@/components/ProductCard'

const Products = () => {
    const { data } = useSWR(`/api/products`, fetcher);
    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                List of products
            </Text>
            <SimpleGrid
                columns={[2, null, 3]}
                spacing={10} mt={2}
            >
                {
                    data && data?.products.map(product => {
                        return <ProductCard key={product._id} product={product} />
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