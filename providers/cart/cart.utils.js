export const addItemToCart = (cartItems, cartItemToAdd, quantity) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem._id === cartItemToAdd._id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem._id === cartItemToAdd._id
                ? { ...cartItem, quantity }
                : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity }];
};

export const filterItemFromCart = (cartItems, item) =>
    cartItems.filter(cartItem => cartItem._id !== item._id);

export const getCartItemsCount = cartItems =>
    cartItems.reduce(
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
        0
    );

export const getCartTotal = cartItems =>
    cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
            accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
    );
