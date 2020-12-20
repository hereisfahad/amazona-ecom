import {
    Text,
    SimpleGrid,
    Img,
    Flex,
    Icon,
    List,
    ListItem,
    Button
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const Product = () => {
    return (
        <DashboardShell>
            <Text as="h1" color="secondary" textAlign="center" fontSize="4xl">
                Product Detail
            </Text>
            <SimpleGrid
                columns={[2, null, 3]}
                spacing={10} mt={2}>
                <Img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
                <Flex direction="column">
                    <Text fontWeight="bold" mb={4} fontSize="lg">Nike Slim Shirt</Text>
                    <Flex mb={1} alignItems="center">
                        <Flex mr={2}>
                            <Icon as={FaStar} color="yellow.500" />
                            <Icon as={FaStar} color="yellow.500" />
                            <Icon as={FaStar} color="yellow.500" />
                            <Icon as={FaStar} color="yellow.500" />
                            <Icon as={FaStarHalfAlt} color="yellow.500" />
                        </Flex>
                        <Text fontWeight="500">10 reviews</Text>
                    </Flex>
                    <Text mb={1} fontWeight="500">Price: $120</Text>
                    <Text fontWeight="500">Description: start at new line Lorem ipsum</Text>
                </Flex>
                <Flex direction="column" bg="gray.100" rounded="md" p={4} h="9rem" border="1px solid" borderColor="gray.300">
                    <List mb={2}>
                        <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                            <Text>Price</Text> <Text fontSize="lg">$120</Text>
                        </ListItem>
                        <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                            <Text>Status</Text> <Text color="green.500">In Stock</Text>
                        </ListItem>
                    </List>
                    <Button bg="yellow.400" rounded="md">
                        Add to Cart
                    </Button>
                </Flex>
            </SimpleGrid>
        </DashboardShell>
    )
}

const ProductPage = () => (
    <Page name="Product" path="/product">
        <Product />
    </Page>
);

export default ProductPage