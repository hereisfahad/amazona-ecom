import { Heading, Stack, Link, Flex, SimpleGrid } from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import NextLink from 'next/link';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import AdminDashboard from '@/components/AdminDashboard';
import MonthlyUsers from '@/components/charts/MonthlyUsers';
import MonthlyOrders from '@/components/charts/MonthlyOrders';
import TopSellerSlider from '@/components/TopSellerSlider';
import ProductCardSkeleton from '@/skeletons/ProductCardSkeleton';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/providers/auth';

const Home = () => {
    const { user } = useAuth()
    const { data } = useSWR(`/api/products?limit=3&currentPage=1`, fetcher);

    return (
        <>
            {
                user?.isAdmin ? (
                    <AdminDashboard>
                        <Stack spacing={8}>
                            <MonthlyUsers />
                            <MonthlyOrders />
                        </Stack>
                    </AdminDashboard>
                ) : (
                        <DashboardShell>
                            <Heading mt={{base: "0", sm: "-2rem"}} mb={2} size="md">Top Sellers</Heading>
                            <TopSellerSlider />
                            <Flex direction="row" justifyContent="space-between" alignItems="baseline">
                                <Heading mt={10} mb={2} size="md">Featured Products</Heading>
                                <NextLink href='/products' passHref>
                                    <Link>
                                        View All Products
                                    </Link>
                                </NextLink>
                            </Flex>
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
                        </DashboardShell>
                    )
            }
        </>
    )
}

const HomePage = () => (
    <Page name="Home" path="/">
        <Home />
    </Page>
);

export default HomePage
