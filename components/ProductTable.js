import React from 'react';
import { 
  Box,
  Img,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton
} from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa"

import { Table, Tr, Th, Td } from './Table';

const ProductTable = ({ products, ...rest }) => {
  return (
    <Box overflowX="scroll" {...rest}>
      <Table w="full">
        <thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th width="50px">{' '}</Th>
          </Tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Box as="tr" key={index}>
              <Td>
              <Img src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" maxWidth="4rem" width="100%" rounded="md" borderBottomRadius="none" />
              </Td>
              <Td>Nike Slim Shirt</Td>
              <Td>
                <NumberInput size="sm" w="65px" step={1} defaultValue={1} min={1} max={5}>
                  <NumberInputField />
                  <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
              <Td>$120</Td>
              <Td>
              <IconButton aria-label="delete product" icon={<FaTrash />} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default ProductTable;
