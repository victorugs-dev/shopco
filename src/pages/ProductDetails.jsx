import React from 'react'
import { useParams } from "react-router";
import { data } from '../../data';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
// import CartButton from '../components/ui/CartButton';
// import Button from '../components/ui/Button'

import { useCart } from '../context/CartContext'


function ProductDetails() {
   const [theme,setTheme] = useTheme();
   let params = useParams();
   let productDetails = data.find(item => item.slug === params.slug);
   const { colors, sizes } = productDetails;
   const {isAddedToCart, setIsAddedToCart, cart, setCart, cartTotal, setCartTotal,addToCart} = useCart();
   const [productTotal, setProductTotal] = useState(1); 
   const [outfitSize,setOutfitSize] = useState('large');
   const [outfitColor,setOutfitColor] = useState('');
   const [currProduct, setCurrProduct] = useState(null);

   let isCurrProductAddedToCart = false;
   for (let i = 0; i < cart.length; i++) {
      if(cart[i].productDetails.slug === productDetails.slug){
         isCurrProductAddedToCart = cart[i].productAddedToCart;
      }
    }

    // NO CHANGES CAN BE MADE AFTER ADDING TO CART
    // REMOVE THE ADDED ITEM OR ADD A NEW ITEM TO CART

    const discountAmount = productDetails.price * (productDetails.percentageDiscount / 100);
    const newPrice = productDetails.price - discountAmount;
    console.log("newPrice", newPrice)

    console.log("discountAmount", discountAmount)
    console.log("newPrice", newPrice)

    console.log("productDetails.percentageDiscount", productDetails.percentageDiscount)

    useEffect(() => {
        colors.length && setOutfitColor(colors[Math.floor(Math.random() * colors.length)]);
    },[]);

    const handleColorPick = useCallback((color,event) => {
      if(!isCurrProductAddedToCart) setOutfitColor(color.toLowerCase());
    }, [isCurrProductAddedToCart]);

    function OutfitColorButtons(){
        return (
            <div className='flex gap-x-2'>{colors?.map((color) => (
               <button key={color} onClick={(e) => handleColorPick(color,e)}
                  className='flex justify-between cursor-pointer'
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16"><path fill={color} stroke={color === outfitColor && 'black'} strokeWidth='2' fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd" /></svg>
               </button>))}
            </div>
        )
    }

    // user must add to cart before increasing quantity
    const handleIncreaseTotal = () => {
        if(isCurrProductAddedToCart) return;
        setProductTotal((prev) => prev + 1)
    };

    const handleDecreaseTotal = () => {
        if(productTotal > 1 && !isCurrProductAddedToCart){
            setProductTotal((prev) => (
                prev - 1
            ));
        }
    };
    const handleOutfitSize = (event, size) => !isCurrProductAddedToCart ? setOutfitSize(event.target.textContent) : console.log('cannot select size after adding to cart!');

    // only one size can be selected
    function OutfitSizeButton(){
        return (
            <>{sizes?.map((size) => (
                    <button 
                        key={size}
                        onClick={(e) => handleOutfitSize(e,size)}
                    className={`rounded-3xl px-1  py-2 bg-black cursor-pointer my-2
                        ${outfitSize === size ? 'bg-gray-400 text-black' : 'text-white'}`}
                    >{size}</button>
            ))}</>
        );
    }

    const handleAddToCart = (event) => {
      if (!productTotal > 0) return;
      setCurrProduct(productDetails);
      setCartTotal((prevCartTotal) => prevCartTotal + productTotal);
      addToCart(productDetails, productTotal, outfitSize, outfitColor, currProduct, discountAmount, newPrice)
    };

    return (

        <div className='md:grid grid-cols-[2fr_3fr] m-4 md:gap-x-5 w-full'>
            {/* <div className='flex flex-col md:flex-row-reverse space-y-1  md:space-y-0 md:gap-x-5 '>
                <div className=''>
                    <img className='' src={productDetails.images[0]} alt={productDetails.title} />
                </div>
                <div className='flex md:flex-col gap-1'>
                    <img className='w-30' src={productDetails.images[0]} alt={productDetails.title} />
                    <img className='w-30' src={productDetails.images[0]} alt={productDetails.title} />
                    <img className='w-30' src={productDetails.images[0]} alt={productDetails.title} />
                </div>
            </div>  */}

          {/* <div className=''>
                <div className='border-b pb-3 h-fit space-y-1'>
                    <h3 className='text-bold text-3xl'>{productDetails.title}</h3>
                    <div className='flex items-center gap   -x-1'>
                        <div>STARS</div>
                        <p className='text-2xl'>{productDetails.rating}/<span className='text-gray-400'>5</span></p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-2xl  '>
                            ${newPrice}
                        </p>
                        {productDetails.percentageDiscount && (
                           <>
                              <p className='text-2xl '>
                                 <del>${productDetails.price}</del>
                              </p>
                              <p className='text-2xl bg-red-100 text-red-400 rounded-full px-6 py-3'>
                                 -{productDetails.percentageDiscount}%
                              </p>
                           </>    
                        )}
                    </div>  
                    <div >
                        <p className='text-2xl'>{productDetails.description}</p>
                    </div>
                </div>

                <div className='border-b pb-3 space-y-3'>
                    <p className='text-2xl '>Select Colors</p>
                    <OutfitColorButtons />
                </div>

                <div className='border-b pb-3 space-y-3'>
                    <p>Choose Size</p>
                    <div className='grid grid-cols-4 gap-x-2 '>
                        <OutfitSizeButton />
                    </div>
                </div>
                <div className='flex mb-10'>
                    <div className='flex items-center bg-gray-400 rounded-3xl px-4 py-3'>
                        <button className='hover:bg-blue-300 text-3xl' onClick={handleDecreaseTotal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19 12.998H5v-2h14z" /></svg>
                        </button>
                        <div>{productTotal}</div>
                        <button className='hover:bg-blue-300 text-3xl' onClick={handleIncreaseTotal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg>
                        </button>
                    </div>
                        {isCurrProductAddedToCart === false ? (
                            <button 
                                onClick={(e) => handleAddToCart(e)}
                                className={`rounded-3xl p-2 w-1/2 bg-black text-white`}
                            >Add To Cart</button>
                        ):(
                        <button 
                            disabled 
                            className={`rounded-3xl p-2 w-1/2 text-white bg-gray-300`}
                        >Add To Cart</button>
                    )}
                </div>
          </div> */}
        </div>
    );

}


export default ProductDetails