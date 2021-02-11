import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Stack,
    center,
    Avatar
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
                border="1px solid"
                borderColor="gray.100"
                borderRadius={[0, 8]}
                errors={errors}
                minWidth={["auto", "400px", "600px"]}
                maxWidth="450px"
                size="lg"
                p={8}
                shadow={['md', 'lg']}
                spacing={4}
                marginX="auto"
            >
                <center>
                    <Avatar size="2xl" name={user?.name} src={user?.image} />
                </center>
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
