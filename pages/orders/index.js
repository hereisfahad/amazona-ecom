import {
    Text,
    Alert,
    Link
} from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/router'
import NextLink from 'next/link';
import jwt from 'jsonwebtoken'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import OrdersTable from '@/components/OrdersTable'

const Orders = () => {
    let orders = []
    const router = useRouter()

    if (process.browser) {
        let user = JSON.parse(localStorage.getItem('user'));
        jwt.verify(user?.token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, _) => {
            if (err) {
                localStorage.removeItem('user')
                router.push('/signin?redirect=orders')
            }
            const { data } = useSWR(`/api/orders?createdBy=${user?._id}`, fetcher);
            orders = data?.orders ?? []
        })
    }

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Orders History
            </Text>
            {
                orders.length < 1 ? (
                    <Alert status="info">
                        You have'nt placed any orders yet.
                        <NextLink href="/products" passHref>
                            <Link ml={2}>
                                Go Shopping
                            </Link>
                        </NextLink>
                    </Alert>
                ) : (
                        <OrdersTable orders={orders} flex="auto" mb={4} />
                    )
            }
        </DashboardShell>
    )
}

const OrdersPage = () => (
    <Page name="Orders" path="/orders">
        <Orders />
    </Page>
);

export default OrdersPage
