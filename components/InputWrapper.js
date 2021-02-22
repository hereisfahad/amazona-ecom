import {
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react";

const InputWrapper = ({ label, htmlFor, error, children }) => (
    <FormControl isInvalid={error?.message} w="full" mb={2} >
        <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
        {children}
        <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
)

export default InputWrapper
