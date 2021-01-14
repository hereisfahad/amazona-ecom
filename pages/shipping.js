import { useState } from 'react';
import { useRouter } from 'next/router'
import {
    Text,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useOrder } from '@/providers/order'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Shipping = () => {
    const router = useRouter()
    const { shippingAddress, setShippingAddress } = useOrder()
    if (process.browser) {
        let user = localStorage.getItem('user');
        if (!user) router.push('/signin?redirect=shipping')
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
                errors={errors}
                minWidth={["auto", "400px", "600px"]}
                size="lg"
                onSubmit={handleSubmit((data) => onSaveShipingAddress(data))}
                px={8}
                py={12}
                shadow={['md', 'lg']}
                spacing={4}
                w="100%"
            >
                <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                    Shipping Address
                </Text>
                <FormControl isInvalid={errors.fullName && errors.fullName.message} w="full">
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
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
                    <FormErrorMessage>
                        {errors.fullName && errors.fullName.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.address && errors.address.message}>
                    <FormLabel htmlFor="address">Address</FormLabel>
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
                    <FormErrorMessage>
                        {errors.address && errors.address.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.city && errors.city.message}>
                    <FormLabel htmlFor="city">City</FormLabel>
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
                    <FormErrorMessage>
                        {errors.city && errors.city.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.postalCode && errors.postalCode.message}>
                    <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
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
                    <FormErrorMessage>
                        {errors.postalCode && errors.postalCode.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.country && errors.country.message}>
                    <FormLabel htmlFor="country">Country</FormLabel>
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
                    <FormErrorMessage>
                        {errors.country && errors.country.message}
                    </FormErrorMessage>
                </FormControl>
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