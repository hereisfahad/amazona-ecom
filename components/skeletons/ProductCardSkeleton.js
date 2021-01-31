import { Box, Skeleton } from '@chakra-ui/react';

const ProductCardSkeleton = () => {
    return (
        <Box borderWidth="1px" borderColor="gray.200" rounded="md" bg="gray.50">
            <Skeleton>
                <Box 
                     width="300px"
                     height="300px"
                     rounded="md"
                     borderBottomRadius="none"
                />
            </Skeleton><br/>
            <Box display="flex" flexDirection="column" px={4}>
                <Skeleton height="15px" width="30%" /><br/>
                <Skeleton height="15px" width="50%" /><br/>
                <Skeleton height="15px" width="15%" /><br/>
            </Box>
        </Box>
    );
};

export default ProductCardSkeleton;
