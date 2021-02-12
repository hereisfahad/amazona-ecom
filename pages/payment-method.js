import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Text,
    FormControl,
    Button,
    Stack,
    Radio,
    RadioGroup
} from "@chakra-ui/react";
import _keys from 'lodash/keys';
import { useForm } from "react-hook-form";
import { useOrder } from '@/providers/order';
import jwt from 'jsonwebtoken'

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Payment = () => {
    const router = useRouter()
    const { shippingAddress, paymentMethod, setPaymentMethod } = useOrder()
    const [tempPaymentMethod, setTempPaymentMethod] = useState(paymentMethod)
    if (process.browser) {
        let user = JSON.parse(localStorage.getItem('user'));
        jwt.verify(user?.token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
            if (err) {
                localStorage.removeItem('user')
                router.push('/signin?redirect=payment-method')
            }
        })
    }
    if (_keys(shippingAddress).length === 0) router.push('/shipping')

    const { handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSavePaymentMethod = () => {
        setLoading(true);
        setPaymentMethod(tempPaymentMethod)
        setLoading(false);
        router.push('/placeorder');
    }

    return (
        <DashboardShell>
            <Stack
                as="form"
                backgroundColor="white"
                borderRadius={[0, 8]}
                border="1px solid"
                borderColor="gray.100"
                minWidth={["auto", "400px", "450px"]}
                size="lg"
                onSubmit={handleSubmit((data) => onSavePaymentMethod(data))}
                p={8}
                mx="auto"
                shadow={['md', 'lg']}
                spacing={4}
            >
                <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                    Payment Method
                </Text>
                <FormControl w="full">
                    <RadioGroup
                        onChange={setTempPaymentMethod}
                        defaultValue={paymentMethod}
                        name="paymentMethod"
                        aria-label="Payment Method"
                        id="paymentMethod"
                        name="paymentMethod"
                    >
                        <Stack>
                            {/* <Radio value="PayPal">PayPal</Radio> */}
                            <Radio value="Stripe">Stripe</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <Button
                    id="paymentMethod"
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

const PaymentPage = () => (
    <Page name="Payment" path="/payment-method">
        <Payment />
    </Page>
);

export default PaymentPage