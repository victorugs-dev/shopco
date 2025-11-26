// import React, {createContext, useReducer, useCallback, useMemo} from 'react';

// const cartContext = createContext();

// // const initialState = {
// //     items: [],
// // };

// // function cartReducer(state,action){

// // }


import { createContext, useState, useCallback } from 'react'

// this is a container that will hold some shared data: cart items, addToCart function
// right now the container is empty
export const CartContext = createContext(null);

export function CartProvider({ children }){

    const [cart, setCart] = useState([]);

    // useState keeps track of cart items 
    // setCart updates the cart when you add an item 
    // addToCart adds a product to cart
    /* useCallback ensures the addToCart function reference doesn't change unnecessarily.
        ensures the addToCart function doesn't get recreated on every render, which helps performance if passed too many times

    */
    // value = {{ cart, addToCart }} ... now every child can read the cart and add call addToCart
    

    const addToCart = useCallback((product) => {
        setCart((prevCart) => [...prevCart,product]);
    },[])

    return (
        // we wrap it so that any component inside the app can access the cart

        //... the .Provider is a container that holds your values and makes them available to all components inside it
        // only components inside the Provider can read the context
        //... {cart} is not destructuring the array. is it object literal
        // value={{cart}} is the same as value={{cart: cart}}
        // putting  the variable cart inside an object
        //... we have need to wrap it inside an object, {} because React Context can only pass one single value
        // we would want to pass multiple values: cart, addToCart, removeFromCart, totalItems, clearCart
        // value={{
        //  cart,
            // addedToCart,
            // removeFromCart
        // }}
        //... array can be allowed as value for the Context  but its bad practice to use
        // it will become messy, hard to read the contents of the array or add to it  
        <CartContext.Provider value={{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    );
}