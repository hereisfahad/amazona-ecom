import { Heading, Stack, Link, SimpleGrid } from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import NextLink from 'next/link';
import jwt from 'jsonwebtoken'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import AdminDashboard from '@/components/AdminDashboard';
import MonthlyUsers from '@/components/charts/MonthlyUsers';
import MonthlyOrders from '@/components/charts/MonthlyOrders';
import TopSellerSlider from '@/components/TopSellerSlider';
import ProductCardSkeleton from '@/skeletons/ProductCardSkeleton';
import ProductCard from '@/components/ProductCard';

const Home = () => {
    let user = undefined
    if (process.browser) {
        user = JSON.parse(localStorage.getItem('user'));
        jwt.verify(user?.token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, _) => {
            if (err) {
                localStorage.removeItem('user')
            }
        })
    }
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
                            <Heading mt={10} mb={2} size="md">Featured Products</Heading>
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
                                                        <Link>
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
