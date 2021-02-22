import { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    InputGroup,
    InputRightAddon,
    Input,
    useDisclosure,
} from "@chakra-ui/react"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from "react-hook-form";

import InputWrapper from '@/components/InputWrapper';
import { useAuth } from '@/providers/auth';

export default function AuthModal() {
    const { loading, signin, signup } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, reset, clearErrors, errors } = useForm();
    const [toggleLoginForm, setToggleLoginForm] = useState(true)
    const [showPassword, setShowPassword] = useState(false);

    const toggleFormState = () => {
        reset()
        clearErrors()
        setToggleLoginForm(!toggleLoginForm)
    }

    const hanldeAuth = userInfo => {
        toggleLoginForm ? signin(userInfo) : signup(userInfo)
    }

    const closeModal = () => {
        setToggleLoginForm(true)
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen}>Sign In</Button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent as="form" px={4} onSubmit={handleSubmit((data) => hanldeAuth(data))}>
                    <ModalHeader>{toggleLoginForm ? 'Sign In' : 'Create Account'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {
                            !toggleLoginForm && (
                                <InputWrapper label="Name" htmlFor="name" error={errors.name}>
                                    <Input
                                        autoFocus
                                        aria-label="Name"
                                        id="name"
                                        name="name"
                                        ref={register({
                                            required: 'Please enter your name.'
                                        })}
                                        placeholder="Duck"
                                    />
                                </InputWrapper>
                            )
                        }
                        <InputWrapper label="Email Address" htmlFor="email" error={errors.email}>
                            <Input
                                autoFocus={toggleLoginForm}
                                aria-label="Email Address"
                                id="email"
                                name="email"
                                ref={register({
                                    required: 'Please enter your email.',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter correct email.'
                                    }
                                })}
                                placeholder="email@site.com"
                            />
                        </InputWrapper>
                        <InputWrapper label="Password" htmlFor="password" error={errors.password}>
                            <InputGroup size="md">
                                <Input
                                    aria-label="Password"
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    ref={register({
                                        required: 'Please enter a password.'
                                    })}
                                />
                                <InputRightAddon
                                    onClick={() => setShowPassword(!showPassword)}
                                    _hover={{ cursor: 'pointer' }}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </InputRightAddon>
                            </InputGroup>
                        </InputWrapper>
                    </ModalBody>

                    <ModalFooter pt={0}>
                        <Button
                            id="login"
                            type="submit"
                            bg="yellow.400"
                            isLoading={loading}
                            loadingText="Submitting..."
                            mr={3}
                            _active={{
                                transform: 'scale(0.95)'
                            }}
                        >
                            {toggleLoginForm ? 'Sign In' : 'Register'}
                        </Button>
                        <Button onClick={toggleFormState}>
                            {toggleLoginForm ? 'New Customer?' : 'Already have an account?'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
