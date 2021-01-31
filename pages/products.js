import { SimpleGrid, Link } from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import NextLink from 'next/link';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import ProductCardSkeleton from '@/skeletons/ProductCardSkeleton';
import ProductCard from '@/components/ProductCard';

const Products = () => {
    const { data } = useSWR(`/api/products`, fetcher);

    return (
        <DashboardShell>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={10} mt={2}
            >
                {
                    !data ? (
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    ): (
                        data?.products.map(product => {
                            return (
                                <NextLink key={product._id} href={`/product/${product._id}`} passHref>
                                    <Link>
                                        <ProductCard product={product} _hover={{ cursor: 'pointer'}}/>
                                    </Link>
                                </NextLink>
                            )
                        })
                    )
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