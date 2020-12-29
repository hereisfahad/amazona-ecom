import { Icon, Flex } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import _times from 'lodash/times'

const Rating = ({ rating, ...rest }) => {
    rating = String(rating).split('.')
    const fullStar = rating[0]
    const halfStar = rating[1] > 0
    return (
        <Flex mb={1} {...rest}>
            {
                _times(fullStar, (index) => {
                    return <Icon key={index} as={FaStar} color="yellow.500" />
                })
            }
            {
                halfStar && <Icon as={FaStarHalfAlt} color="yellow.500" />
            }
        </Flex>
    );
};

export default Rating;
