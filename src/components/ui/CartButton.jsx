import { useContext } from 'react'
import { useCart } from '../../context/CartContext';
import { useState } from  'react'

function CartButton({ children, newStyling, addedToCart, productDetails, total}){

    const {
        isAddedToCart,
        setIsAddedToCart,
        cart,
        setCart,
        cartTotal,
        setCartTotal,
        addToCart
    } = useCart();

    const [isCurrProductAddedToCart, setIsProductCurrAddedToCart] = useState(false);
    const [currProduct, setCurrProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1); // we may need local storage for this?? 
    

    const defaultStyling = 'rounded-3xl p-2 w-1/2';

    const handleAddToCart = (event) =>{
        console.log(productDetails);
        setCurrProduct(productDetails);
        // setCart((prevCart) => [...prevCart, product]);
        setCartTotal((prevCartTotal) => prevCartTotal + total);
            
        setIsProductCurrAddedToCart(true);

        addToCart(productDetails)

        
        // console.log(event)
        console.log('added to cart!')
    };

    return (
        // <button className={`${defaultStyling} ${newStyling}`}
        //     newStyling={newStyling}
        //     onClick={(e) => handleAddToCart(product)}
        // >Add to Cart</button>
        // <button className={defaultStyling}
        // <button
        //     onClick={(e) => handleAddToCart(product)}
        // >Add to Cart</button>
        
        <>

            {isAddedToCart === false ? (
                <button 
                    onClick={(e) => handleAddToCart(e)}
                    className={`rounded-3xl p-2 w-1/2 bg-black text-white`}
                    // product={product}
                    productDetails={productDetails}
                >Add To Cart</button>
                
            ):(
                
                
            <button 
                disabled 
                className={`rounded-3xl p-2 w-1/2 text-white bg-gray-300`}
            >Add To Cart</button>
        )}
        </>
    );
}
export default CartButton