import {
    Text,
    Flex,
    List,
    ListItem,
    Button
} from "@chakra-ui/react";

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import ProductTable from '@/components/ProductTable';

const Cart = () => {
    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Shopping Cart
            </Text>
            <Flex
                mt={2}
                w="1100px"
            >
                <ProductTable products={[1, 2]} flex="auto"/>
                <Flex
                    direction="column"
                    bg="gray.100"
                    rounded="md"
                    p={4}
                    h="9rem"
                    ml={8}
                    border="1px solid"
                    borderColor="gray.300"
                >
                    <List mb={2}>
                        <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                            <Text>SubTotal ( items): </Text> <Text fontSize="lg">$598</Text>
                        </ListItem>
                    </List>
                    <Button bg="yellow.400" rounded="md" mt="auto">
                        Proceed To Checkout
                    </Button>
                </Flex>
            </Flex>
        </DashboardShell>
    )
}

const CartPage = () => (
    <Page name="Cart" path="/cart">
        <Cart />
    </Page>
);

export default CartPage
