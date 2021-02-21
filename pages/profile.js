import {
    Stack,
    Avatar,
    Heading,
    Text
} from "@chakra-ui/react";

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Profile = () => {
    let user = undefined
    if (process.browser) {
        user = localStorage.getItem('user');
        user = JSON.parse(user)
    }

    return (
        <DashboardShell>
            <Stack
                backgroundColor="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius={[0, 8]}
                minWidth={["auto", "400px"]}
                maxWidth="400px"
                size="lg"
                p={6}
                shadow={['md', 'lg']}
                marginX="auto"
                alignItems="center"
            >
                <Avatar size="2xl" name={user?.name} src={user?.image} />
                <Heading size="md" mt={2}>{user?.name}</Heading>
                <Text>{user?.email}</Text>
            </Stack>
        </DashboardShell>
    )
}

const ProfilePage = () => (
    <Page name="Profile" path="/profile">
        <Profile />
    </Page>
);

export default ProfilePage
