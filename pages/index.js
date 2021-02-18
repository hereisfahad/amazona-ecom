import { Text, Stack } from "@chakra-ui/react";
import jwt from 'jsonwebtoken'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import AdminDashboard from '@/components/AdminDashboard';
import MonthlyUsers from '@/components/charts/MonthlyUsers';
import MonthlyOrders from '@/components/charts/MonthlyOrders';

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
                ): (
                    <DashboardShell marginBottom="0px" />
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
