import { Box, Text, Flex } from '@chakra-ui/react';
import Image from "next/image";

import Rating from '@/components/Rating';

const ProductCard = ({ product }) => {
    const { name, image, rating, numReviews, price } = product
    return (
        <Box borderWidth="1px" borderColor="gray.200" rounded="md" bg="gray.50">
            <Image 
                src={image}
                alt="product image"
                width="auto"
                height="350px"
            />
         <Box display="flex" flexDirection="column" p={4}>
            <Text as="h2" fontSize="lg" mb={3}>{name}</Text>
            <Flex alignItems="center">
                <Rating rating={rating} mr={2}/>
                <Text fontSize="lg" >{numReviews} reviews</Text>
            </Flex>
            <Text fontSize="lg" mb={1}>${price}</Text>
         </Box>
        </Box>
    );
};

export default ProductCard;
