import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import {
    Text,
    InputGroup,
    InputRightAddon,
    Input,
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
import InputWrapper from '@/components/InputWrapper';

const SignIn = () => {
    const router = useRouter()
    const { redirect } = router.query
    if (process.browser) {
        let user = localStorage.getItem('user');
        if (user) router.push('/')
    }
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()

    const onLogin = async userInfo => {
        setLoading(true);
        const response = await fetch('/api/auth/signin', {
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
            router.push(`/${redirect ? redirect : ''}`)
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
                onSubmit={handleSubmit((data) => onLogin(data))}
                px={8}
                py={12}
                shadow={['md', 'lg']}
                spacing={4}
                w="100%"
            >
                <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                    Sign In
                </Text>
                <InputWrapper label="Email Address" htmlFor="email" error={errors.email}>
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
                </InputWrapper>
                <InputWrapper label="Password" htmlFor="password" error={errors.password}>
                    <InputGroup size="md">
                        <Input
                            aria-label="Password"
                            name="password"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            ref={register({
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
                </InputWrapper>
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
                    Sign In
            </Button>
                <Flex
                    align={['flex-start', 'center']}
                    justifyContent="space-between"
                    mb={8}
                    width="full"
                    mt={1}
                    direction={['column', 'row']}
                >
                    <NextLink href={`/register${redirect ? `?redirect=${redirect}` : ''}`} passHref>
                        <Link
                            color='gray.900'
                            fontWeight="bold"
                            fontSize="sm"
                            mb={2}
                        >
                            New Customer?
                        </Link>
                    </NextLink>
                </Flex>
            </Stack>
        </DashboardShell>
    )
}

const SignInPage = () => (
    <Page name="SignIn" path="/signin">
        <SignIn />
    </Page>
);

export default SignInPage