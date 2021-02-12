import { useState } from 'react';
import { useRouter } from 'next/router'
import {
    Text,
    Input,
    Button,
    Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useOrder } from '@/providers/order'
import jwt from 'jsonwebtoken'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import InputWrapper from '@/components/InputWrapper';

const Shipping = () => {
    const router = useRouter()
    const { shippingAddress, setShippingAddress } = useOrder()
    if (process.browser) {
        let user = JSON.parse(localStorage.getItem('user'));
        jwt.verify(user?.token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                localStorage.removeItem('user')
                router.push('/signin?redirect=shipping')
            }
        })
    }
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);

    const onSaveShipingAddress = shippingDetail => {
        setLoading(true);
        setShippingAddress(shippingDetail)
        setLoading(false);
        router.push('/payment-method')
    }

    return (
        <DashboardShell>
            <Stack
                as="form"
                backgroundColor="white"
                borderRadius={[0, 8]}
                border="1px solid"
                borderColor="gray.100"
                errors={errors}
                minWidth={["auto", "400px", "450px"]}
                mx="auto"
                size="lg"
                onSubmit={handleSubmit((data) => onSaveShipingAddress(data))}
                px={8}
                py={12}
                shadow={['md', 'lg']}
                spacing={4}
            >
                <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                    Shipping Address
                </Text>
                <InputWrapper label="Full Name" htmlFor="fullName" error={errors.fullName}>
                    <Input
                        autoFocus
                        aria-label="Full Name"
                        defaultValue={shippingAddress.fullName}
                        id="fullName"
                        name="fullName"
                        ref={register({
                            required: 'Please enter your full name.',
                        })}
                        placeholder="Enter full name"
                    />
                </InputWrapper>
                <InputWrapper label="Address" htmlFor="address" error={errors.address}>
                    <Input
                        defaultValue={shippingAddress.address}
                        aria-label="Address"
                        name="address"
                        id="address"
                        ref={register({
                            required: 'Please enter your address.'
                        })}
                        placeholder="Enter address"
                    />
                </InputWrapper>
                <InputWrapper label="City" htmlFor="city" error={errors.city}>
                    <Input
                        defaultValue={shippingAddress.city}
                        aria-label="city"
                        name="city"
                        id="city"
                        ref={register({
                            required: 'Please enter your city.'
                        })}
                        placeholder="Enter city"
                    />
                </InputWrapper>
                <InputWrapper label="Postal Code" htmlFor="postalCode" error={errors.postalCode}>
                    <Input
                        defaultValue={shippingAddress.postalCode}
                        aria-label="postalCode"
                        name="postalCode"
                        id="postalCode"
                        ref={register({
                            required: 'Please enter your postal code.'
                        })}
                        placeholder="Enter postal adress"
                    />
                </InputWrapper>
                <InputWrapper label="Country" htmlFor="country" error={errors.country}>
                    <Input
                        defaultValue={shippingAddress.country}
                        aria-label="country"
                        name="country"
                        id="country"
                        ref={register({
                            required: 'Please enter your country.'
                        })}
                        placeholder="Enter country"
                    />
                </InputWrapper>
                <Button
                    id="shippingAddress"
                    type="submit"
                    bg="yellow.400"
                    isLoading={loading}
                    loadingText="saving..."
                    fontWeight="medium"
                    mt={4}
                    h="50px"
                    fontSize="lg"
                    _active={{
                        transform: 'scale(0.95)'
                    }}
                >
                    Continue
                </Button>
            </Stack>
        </DashboardShell>
    )
}

const ShippingPage = () => (
    <Page name="Shipping" path="/shipping">
        <Shipping />
    </Page>
);

export default ShippingPage