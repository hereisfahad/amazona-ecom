import { useState } from 'react';
import { Box, Img, Text, Flex, Skeleton } from '@chakra-ui/react';

import Rating from '@/components/Rating';

const ImageWithSkeleton = ({ image }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <Skeleton isLoaded={loaded}>
            <Img 
                src={image}
                alt="product image"
                width="300px"
                height="300px"
                rounded="md"
                borderBottomRadius="none"
                onLoad={() => setLoaded(true)}
            />
        </Skeleton>
    )
}

const ProductCard = ({ product }) => {
    const { name, image, rating, numReviews, price } = product
    return (
        <Box borderWidth="1px" borderColor="gray.200" rounded="md" bg="gray.50">
            <ImageWithSkeleton image={image} />
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
