import { Text } from "@chakra-ui/react";
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Home = () => {
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