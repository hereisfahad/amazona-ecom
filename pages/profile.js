import {
    Text,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Profile = () => {
    let user = undefined
    if (process.browser) {
        user = localStorage.getItem('user');
        user = JSON.parse(user)
    }

    const { register, errors } = useForm();

    return (
        <DashboardShell>
            <Stack
                as="form"
                backgroundColor="white"
                borderRadius={[0, 8]}
                errors={errors}
                minWidth={["auto", "400px", "600px"]}
                size="lg"
                px={8}
                py={12}
                shadow={['md', 'lg']}
                spacing={4}
                w="100%"
            >
                <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                    Account Information
            </Text>
                <FormControl isInvalid={errors.name && errors.name.message} w="full">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        autoFocus
                        aria-label="Name"
                        id="name"
                        name="name"
                        isReadOnly
                        defaultValue={user?.name}
                        ref={register({
                            required: 'Please enter your name.'
                        })}
                        placeholder="Duck"
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email && errors.email.message} w="full">
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                        aria-label="Email Address"
                        id="email"
                        name="email"
                        isReadOnly
                        defaultValue={user?.email}
                        ref={register({
                            required: 'Please enter your email.',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter correct email.'
                            }
                        })}
                        placeholder="email@site.com"
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
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
