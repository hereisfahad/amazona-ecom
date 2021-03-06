import { useState } from 'react';
import { SimpleGrid, Link } from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import NextLink from 'next/link';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import ProductCardSkeleton from '@/skeletons/ProductCardSkeleton';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const { data } = useSWR(`/api/products?limit=${productsPerPage}&currentPage=${currentPage}`, fetcher);

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                    ) : (
                            data?.products.map(product => {
                                return (
                                    <NextLink key={product._id} href={`/product/${product._id}`} passHref>
                                        <Link _hover={{ textDecoration: 'none' }} >
                                            <ProductCard product={product} _hover={{ cursor: 'pointer' }} />
                                        </Link>
                                    </NextLink>
                                )
                            })
                        )

                }
            </SimpleGrid>
            {
                data?.products?.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        rowsPerPage={productsPerPage}
                        totalRows={data?.totalCount}
                        paginate={paginate}
                    />
                )
            }
        </DashboardShell>
    )
}

const ProductsPage = () => (
    <Page name="Products" path="/products">
        <Products />
    </Page>
);

export default ProductsPage