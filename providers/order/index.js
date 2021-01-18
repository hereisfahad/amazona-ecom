import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

export const orderContext = createContext({
    shippingAdress: {
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    },
    paymentMethod: 'payPal',
});

export const useOrder = () => {
    return useContext(orderContext);
};

const OrderProvider = ({ children }) => {

    let tempShippingAdress = {
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    }
    let tempPaymentMethod = ''
    if (process.browser) {
        tempShippingAdress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
        tempPaymentMethod = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'payPal';
    }
    const [shippingAddress, setShippingAddress] = useState(tempShippingAdress);
    const [paymentMethod, setPaymentMethod] = useState(tempPaymentMethod);

    useEffect(() => {
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
    }, [shippingAddress, paymentMethod]);

    return (
        <orderContext.Provider
            value={{
                shippingAddress,
                setShippingAddress,
                paymentMethod,
                setPaymentMethod,
            }}
        >
            {children}
        </orderContext.Provider>
    );
};

export default OrderProvider;
