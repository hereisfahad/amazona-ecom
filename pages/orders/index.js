import {
    Text,
    Alert,
    Link,
} from "@chakra-ui/react";
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import NextLink from 'next/link';

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import OrdersTable from '@/components/OrdersTable';
import OrdersTableSkeleton from '@/skeletons/OrdersTableSkeleton';
import { useAuth } from '@/providers/auth';

const Orders = () => {
    const { user } = useAuth()
    const { data } = useSWR(`/api/orders?createdBy=${user?._id}`, fetcher);
    const orders = data?.orders

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl" mb={4}>
                Orders History
            </Text>
            {
                !orders ? <OrdersTableSkeleton /> : (
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
