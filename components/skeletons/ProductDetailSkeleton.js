import {
    Box,
    Flex,
    List,
    ListItem,
    Button,
    Skeleton
} from "@chakra-ui/react";

const ProductDetailSkeleton = () => {
    return (
        <>
            <Skeleton>
                <Box
                    width="300px"
                    height="300px"
                    rounded="md"
                    borderBottomRadius="none"
                />
            </Skeleton>
            <Flex direction="column">
                <Skeleton height="15px" width="37%" mb={2}/><br />
                <Skeleton height="15px" width="50%" /><br />
                <Skeleton height="15px" width="15%" /><br />
                <Skeleton height="15px" width="27%" /><br />
            </Flex>
            <Flex direction="column" bg="gray.100" rounded="md" p={4} maxHeight="11rem" border="1px solid" borderColor="gray.300">
                <List mb={4}>
                    <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={2}>
                        <Skeleton height="15px" width="23%" /> <Skeleton height="15px" width="13%" />
                    </ListItem>
                    <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={2}>
                        <Skeleton height="15px" width="27%" /> <Skeleton height="15px" width="17%" />
                    </ListItem>
                    <ListItem display="flex" fontWeight="bold" justifyContent="space-between" mb={1}>
                        <Skeleton height="15px" width="15%" /> <Skeleton height="15px" width="15%" />
                    </ListItem><br/>
                </List>
                <Skeleton>
                    <Button />
                </Skeleton>
            </Flex>
        </>
    )
}


export default ProductDetailSkeleton