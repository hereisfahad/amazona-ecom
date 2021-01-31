import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from '../Table';

const OrdersTableSkeleton = () => {
    return (
        <Box overflowX="scroll">
            <Table w="full">
                <thead>
                    <Tr>
                        <Th><Skeleton height="16px">Created By</Skeleton></Th>
                        <Th><Skeleton height="16px">Total</Skeleton></Th>
                        <Th><Skeleton height="16px">Paid</Skeleton></Th>
                        <Th><Skeleton height="16px">Delivered</Skeleton></Th>
                        <Th><Skeleton height="16px">Date</Skeleton></Th>
                        <Th>{' '}</Th>
                    </Tr>
                </thead>
                <tbody>
                    <Box as="tr">
                        <Td><Skeleton height="16px">created By</Skeleton></Td>
                        <Td><Skeleton height="16px">$100</Skeleton></Td>
                        <Td><Skeleton height="16px">Yes</Skeleton></Td>
                        <Td><Skeleton height="16px">Yes</Skeleton></Td>
                        <Td><Skeleton height="16px">2021-01-29</Skeleton></Td>
                        <Td><Skeleton height="16px">view</Skeleton></Td>
                    </Box>
                    <Box as="tr">
                        <Td><Skeleton height="16px">created By</Skeleton></Td>
                        <Td><Skeleton height="16px">$100</Skeleton></Td>
                        <Td><Skeleton height="16px">Yes</Skeleton></Td>
                        <Td><Skeleton height="16px">Yes</Skeleton></Td>
                        <Td><Skeleton height="16px">2021-01-29</Skeleton></Td>
                        <Td><Skeleton height="16px">view</Skeleton></Td>
                    </Box>
                    <Box as="tr">
                        <Td><Skeleton height="16px">created By</Skeleton></Td>
                        <Td><Skeleton height="16px">$100</Skeleton></Td>
                        <Td><Skeleton height="16px">Yes</Skeleton></Td>
                        <Td><Skeleton height="16px">Yes</Skeleton></Td>
                        <Td><Skeleton height="16px">2021-01-29</Skeleton></Td>
                        <Td><Skeleton height="16px">view</Skeleton></Td>
                    </Box>
                </tbody>
            </Table>
        </Box>
    );
};

export default OrdersTableSkeleton;
