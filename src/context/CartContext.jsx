import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// this is a container that will hold some shared data: cart items, addToCart function
// right now the container is empty
export const CartContext = createContext(null);

export function CartProvider({ children }){

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const [cartTotal, setCartTotal] = useState(() => {
        const saved = localStorage.getItem("cartTotal");
        return saved  ? JSON.parse(saved) : 0; 
    });

    // const [cart, setCart] = useState([]);
    // const [cartArr, setCartArr] = useState([]);
    const [cart, setCart] = useState(() => {
        // Lol what if i wrote this instead ????
        // const saved = localStorage.getItem("cart");
        try{
            const saved = localStorage.getItem("cart");
            console.log("saved:", saved)
            const parsed = saved ? JSON.parse(saved) : [];
            console.log("parsed: ", parsed)
            return Array.isArray(parsed) ? parsed : [];
            
        }catch(error){
            return [];
        }
        // const saved = localStorage.getItem("cartTotal");
        // return saved ? JSON.parse(saved) : [];
    });

    
    
    // useState keeps track of cart items 
    // setCart updates the cart when you add an item 
    // addToCart adds a product to cart
    /* useCallback ensures the addToCart function reference doesn't change unnecessarily.
        ensures the addToCart function doesn't get recreated on every render, which helps performance if passed too many times

    */
    // value = {{ cart, addToCart }} ... now every child can read the cart and add call addToCart
    
    const addToCart = (newProductDetails, newProductTotal, newProductSize, newProductColor, newCurrProduct) => {

        const cartItem = {
            productDetails: newProductDetails,
            productTotal: newProductTotal,
            productAddedToCart: true,
            productSize: newProductSize,
            productColor: newProductColor,
            currProduct: newCurrProduct
        };
        
        setCart((prevCart) => {
            if(!Array.isArray(prevCart)) return [cartItem];
            return [...prevCart, cartItem];
        });
        console.log("cart", cart);
    };

    const clearCart = () => {
        if(!cart.length) return console.log("cart is already empty");
        setCart([]);
        setCartTotal(0);
    };

    const removeFromCart = (product) => {
        console.log(product)
        setCart((prevCart) => {
            const filtered = prevCart.filter((c) =>
                product.productDetails.slug !== c.productDetails.slug
            )
            console.log("filter: ", filtered);
            return filtered;
        })

        // update cartTotal
        setCartTotal((prevCartTotal) => {
            const newCartTotal = prevCartTotal - product.productTotal;

            return newCartTotal;
        })
    };

    // setCartTotal((prevCartTotal) => prevCartTotal + productTotal);
        
    useEffect(() => {
        if(Array.isArray(cart)){
            localStorage.setItem("cart", JSON.stringify(cart));
        }else  console.log("cart is not an array");        

    }, [cart]);
    // }, [cart,cartTotal]);

    useEffect(() => {
        localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    },[cartTotal]);
        
    const value = 
    { isAddedToCart, setIsAddedToCart, cart, setCart, cartTotal, setCartTotal, addToCart, clearCart, removeFromCart };

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
        
        // <CartContext.Provider value={{cart, addToCart}}>
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(){
    return useContext(CartContext);
}