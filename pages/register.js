import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import {
    Text,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightAddon,
    Input,
    FormErrorMessage,
    Button,
    Stack,
    Flex,
    Link,
    useToast
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from "react-hook-form";

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Register = () => {
    const router = useRouter()
    if(process.browser){
        let user = localStorage.getItem('user');
        if(user) router.push('/')
    }

    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const onRegister = async userInfo => {
        setLoading(true);
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json()
        if (!data?.user) {
            toast({
                title: "Error",
                description: data.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } else {
            localStorage.setItem('user', JSON.stringify(data?.user));
            router.replace('/')
        }
        setLoading(false);
    }

    return (
        <DashboardShell>
            <Stack
                as="form"
                backgroundColor="white"
                borderRadius={[0, 8]}
                errors={errors}
                minWidth={["auto", "400px", "600px"]}
                size="lg"
                onSubmit={handleSubmit((data) => onRegister(data))}
                px={8}
                py={12}
                shadow={['md', 'lg']}
                spacing={4}
                w="100%"
            >
                <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                    Create Account
            </Text>
            <FormControl isInvalid={errors.name && errors.name.message} w="full">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        autoFocus
                        aria-label="Name"
                        id="name"
                        name="name"
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
                        autoFocus
                        aria-label="Email Address"
                        id="email"
                        name="email"
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
                <FormControl isInvalid={errors.password && errors.password.message}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            aria-label="Password"
                            name="password"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            ref={register({
                                minLength: {
                                    value: 8,
                                    message: 'Password should be at least 8 characters.'
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Password can only be 16 characters long.'
                                }, 
                                required: 'Please enter a password.'
                            })}
                        />
                        <InputRightAddon
                            onClick={() => setShowPassword(!showPassword)}
                            _hover={{ cursor: 'pointer' }}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    id="login"
                    type="submit"
                    bg="yellow.400"
                    isLoading={loading}
                    loadingText="submitting..."
                    fontWeight="medium"
                    mt={4}
                    h="50px"
                    fontSize="lg"
                    _active={{
                        transform: 'scale(0.95)'
                    }}
                >
                    Register
                </Button>
                <Flex
                    align={['flex-start', 'center']}
                    justifyContent="space-between"
                    mb={8}
                    width="full"
                    mt={1}
                    direction={['column', 'row']}
                >

                    <NextLink href="/signin" passHref>
                        <Link
                            color='gray.900'
                            fontWeight="bold"
                            fontSize="sm"
                        >
                            Already have an account?
                        </Link>
                    </NextLink>
                </Flex>
            </Stack>
        </DashboardShell>
    )
}

const RegisterPage = () => (
    <Page name="Register" path="/register">
        <Register />
    </Page>
);

export default RegisterPage