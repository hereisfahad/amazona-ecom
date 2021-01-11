import { Box, Img, Text, Flex} from '@chakra-ui/react';

import Rating from '@/components/Rating';

const ProductCard = ({ product }) => {
    const { name, image, rating, numReviews, price } = product
    return (
        <Box borderWidth="1px" borderColor="gray.200" rounded="md" bg="gray.50">
            <Img src={image} alt="product image" maxWidth="16rem" width="100%" rounded="md" borderBottomRadius="none"/>
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
