import { useState, useContext, createContext } from 'react'
import { useToast } from "@chakra-ui/react"

const authContext = createContext()

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

const useProvideAuth = () => {
    const toast = useToast()
    let tempUser = undefined
    if (process.browser) tempUser = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(tempUser)
    const [loading, setLoading] = useState(false)

    const signup = async userInfo => {
        setLoading(true)
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        })
        const data = await response.json()
        if (!data?.user) {
            toast({
                title: "Error",
                description: data.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } else {
            localStorage.setItem('user', JSON.stringify(data?.user))
            setUser(data?.user)
        }
        setLoading(false)
    }

    const signin = async userInfo => {
        setLoading(true)
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        })
        const data = await response.json()
        if (!data?.user) {
            toast({
                title: "Error",
                description: data.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        } else {
            localStorage.setItem('user', JSON.stringify(data?.user))
            setUser(data?.user)
        }
        setLoading(false)
    }

    const signout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('cartItems')
        localStorage.removeItem('shippingAddress')
        localStorage.removeItem('paymentMethod')
        setUser(null)
    }

    return {
        user,
        loading,
        signin,
        signup,
        signout
    }
}

export default AuthProvider