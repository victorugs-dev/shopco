// import { useContext } from 'react'
// import { useCart } from '../../context/CartContext';
// import { useState } from  'react'

// function CartButton({ children, newStyling, productDetails, selectedData}){
//     const {isAddedToCart, setIsAddedToCart, cart, setCart, cartTotal, setCartTotal,addToCart} = useCart();
//     // const [isCurrProductAddedToCart, setIsProductCurrAddedToCart] = useState(false);
//     const [currProduct, setCurrProduct] = useState(null);
//     const [productQuantity, setProductQuantity] = useState(1); // we may need local storage for this?? 

//     const defaultStyling = 'rounded-3xl p-2 w-1/2';

//     const handleAddToCart = (event) =>{
//         console.log(productDetails);
//         setCurrProduct(productDetails);
//         // setCart((prevCart) => [...prevCart, product]);
//         setCartTotal((prevCartTotal) => prevCartTotal + selectedData.total);
//         // setCartTotal((prevCartTotal) => prevCartTotal + selectedData[2]);
//         // setIsProductCurrAddedToCart(true);
//         addToCart(productDetails)
//         // console.log(event)
//         // console.log('added to cart!')
//     };

//     return (
//         <>
//             {/* {isAddedToCart === false ? ( */}
//             {/* {isCurrProductAddedToCart === false ? ( */}
//             {selectedData.isAddedToCart === false ? (

//                 <button 
//                     onClick={(e) => handleAddToCart(e)}
//                     className={`rounded-3xl p-2 w-1/2 bg-black text-white`}
//                     productDetails={productDetails}
//                 >Add To Cart</button>
                
//             ):(
//             <button 
//                 disabled 
//                 className={`rounded-3xl p-2 w-1/2 text-white bg-gray-300`}
//             >Add To Cart</button>
//         )}
//         </>
//     );
// }
// export default CartButton

import React from 'react'

function CartButton() {
  return (
    <button 
      className={`rounded-3xl p-2 w-1/2 bg-black text-white`}
    >CartButton</button>
  )
}

export default CartButton