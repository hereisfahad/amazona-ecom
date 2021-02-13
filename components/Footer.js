import NextLink from 'next/link';
import { Link, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex my={4} justify="center" pos="absolute" width="100%" bottom="0" >
      <NextLink href="https://twitter.com/hereisfahad" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Twitter
        </Link>
      </NextLink>
      <NextLink href="/" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Home
        </Link>
      </NextLink>
    </Flex>
  );
};

export default Footer;
