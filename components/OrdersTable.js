import React from 'react';
import {
  Box,
  IconButton,
  Link
} from '@chakra-ui/react';
import { FaEye } from "react-icons/fa"
import NextLink from 'next/link';
import { format } from 'date-fns'

import { Table, Tr, Th, Td } from './Table';

const OrdersTable = ({ orders, ...rest }) => {
  return (
    <Box overflowX="scroll" {...rest}>
      <Table w="full">
        <thead>
          <Tr>
            <Th>Created By</Th>
            <Th>Total</Th>
            <Th>Paid</Th>
            <Th>Delivered</Th>
            <Th>Date</Th>
            <Th width="50px">{' '}</Th>
          </Tr>
        </thead>
        <tbody>
          {orders.map(({ _id, createdBy, totalPrice, isPaid, isDelivered, createdAt }, index) => (
            <Box as="tr" key={index}>
              <Td>{createdBy.name}</Td>
              <Td>${totalPrice.toFixed(2)}</Td>
              <Td>{isPaid ? 'Yes': 'No'}</Td>
              <Td>{isDelivered ? 'Yes': 'No'}</Td>
              <Td>{format(new Date(createdAt), 'yyyy-MM-dd')}</Td>
              <Td>
                <NextLink href={`orders/${_id}`} passHref>
                  <Link ml={2}>
                    <IconButton aria-label="view order" icon={<FaEye />} />
                  </Link>
                </NextLink>
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default OrdersTable;
