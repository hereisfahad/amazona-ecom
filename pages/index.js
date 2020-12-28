import { useEffect } from 'react';
import { Text } from "@chakra-ui/react";
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Home = () => {

    useEffect(() => {
        const seedProducts = async () => {
            await fetch('/api/seed-products')
        }
        seedProducts()
    }, [])

    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Welcome to Amazona Ecom
            </Text>
        </DashboardShell>
    )
}

const HomePage = () => (
    <Page name="Home" path="/">
        <Home />
    </Page>
);

export default HomePage