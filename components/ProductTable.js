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
import { useCart } from '@/providers/cart';

const ProductTable = (props) => {
  const { cartItems, addItem, clearItemFromCart } = useCart()
  return (
    <Box overflowX="scroll" {...props}>
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
          {cartItems.map((item, index) => (
            <Box as="tr" key={index}>
              <Td>
                <Img src={item.image} alt="Segun Adebayo" maxWidth="4rem" width="100%" rounded="md" />
              </Td>
              <Td>{item.name}</Td>
              <Td>
                <NumberInput
                  size="sm"
                  w="65px"
                  step={1}
                  defaultValue={item.quantity}
                  min={1}
                  max={item.countInStock}
                  onChange={(value) => addItem(item, Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
              <Td>{item.price}</Td>
              <Td onClick={() => clearItemFromCart(item)}>
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
