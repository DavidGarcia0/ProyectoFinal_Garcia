import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: [],
    totalQuantity: 0,
    total: 0
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const totalQuantity = cart.reduce((acc, item) => acc + item.quatity, 0);

    const total = cart.reduce((acc, item) => acc + item.price * item.quatity, 0).toFixed(2);

    console.log("Total Quantity:", totalQuantity);
    console.log("Total:", total);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id)) {
            setCart(prev => [...prev, { ...item, quatity: quantity }]);
        } else {
            console.error("El producto ya fue agregado");
        }
    };

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
};