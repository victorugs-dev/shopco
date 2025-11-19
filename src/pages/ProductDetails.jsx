import React from 'react'
import { useParams } from "react-router";
import { data } from '../../data';
import { useState, useReducer } from 'react';
// import Button from '../components/ui/Button'


function ProductDetails() {

    const [total, setTotal] = useState(0); // we may need local storage for this?? 
    const [isAddedToCart, setIsAddedToCart] = useState(false); // we may need local storage for this?? 
    const [outfitSize,setOutfitSize] = useState('');

    let params = useParams();
    console.log('params: ',params);

    let productDetails = data.find(item => item.slug === params.slug);
    console.log(productDetails);

    const discountAmount = productDetails.price * (productDetails.percentageDiscount / 100);
    const newPrice = productDetails.price - discountAmount;
    // console.log(productDetails.price)
    // console.log(productDetails.percentageDiscount)
    // console.log('discountAmount: ',discountAmount)
    // console.log('newPrice:', newPrice)

    // we may have to use the useContext for the cart button so that every product can corresponding to it rather than having individual state for the cart total ???

    function handleColorPicked(){
        console.log("user wants to change the color of cloth selected")
    }

    // button must not be used more than once
    function handleAddToCart(){
        console.log("Added to cart");
        
        if(isAddedToCart === false){
            setTotal((prev) => (
                prev + 1
            ));
            console.log('total: ',total)
            setIsAddedToCart(true);
           
        }else{
            return <p>This item has been added already</p>
        }
    }
    
    // user must add to cart before increasing quantity
    const handleIncreaseTotal = () => {
        if(isAddedToCart){
            setTotal((prev) => (
                prev + 1
            ));
        }
    };


    const handleDecreaseTotal = () => {
        if(total > 0){
            setTotal((prev) => (
                prev - 1
            ));
        }
    };

    const handleOutfitSize = (e) => {
        console.log(e.target.textContent);
        // outfitSize !== '': 
        setOutfitSize(e.target.textContent);
        console.log(outfitSize);
    }

    return (

        <div className='md:grid grid-cols-[2fr_3fr] m-4 md:gap-x-5 w-full'>
         
            <div className='flex flex-col md:flex-row-reverse space-y-1  md:space-y-0 md:gap-x-5 '>
                <div className=''>
                    <img className='' src={productDetails.images[0]} alt={productDetails.title} />
                </div>
                <div className='flex md:flex-col gap-1'>
                    <img className='w-30' src={productDetails.images[0]} alt={productDetails.title} />
                    <img className='w-30' src={productDetails.images[0]} alt={productDetails.title} />
                    <img className='w-30' src={productDetails.images[0]} alt={productDetails.title} />
                </div>
            </div> 

          <div className=''>
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
                    <div className='flex gap-x-1'>
                        <button onClick={handleColorPicked} className='bg-green-400 text-green-400 rounded-full'>circle</button>
                        <button onClick={handleColorPicked} className='bg-blue-400 text-blue-400 rounded-full'>circle</button>
                        <button onClick={handleColorPicked} className='bg-yellow-400 text-yellow-400 rounded-full'>circle</button>
                    </div>
                </div>

                <div className='border-b pb-3 space-y-3'>
                    <p>Choose Size</p>
                    <div className='grid grid-cols-4 gap-x-2 '>
                        {/* <Button children={"Small"} />
                        <Button children={"Medium"} />
                        <Button children={"Large"} />
                        <Button children={"X-Large"} /> */}
                        <button onClick={handleOutfitSize} className='rounded-3xl px-2  py-3 bg-black text-white'>Small</button>
                        <button onClick={handleOutfitSize} className='rounded-3xl px-2  py-3 bg-black text-white'>Medium</button>
                        <button onClick={handleOutfitSize} className='rounded-3xl px-2  py-3 bg-black text-white'>Large</button>
                        <button onClick={handleOutfitSize} className='rounded-3xl px-2  py-3 bg-black text-white'>X-Large</button>
                    </div>
                </div>
                <div className='flex mb-10'>
                    <div className='flex items-center bg-gray-400 rounded-3xl px-4 py-3'>
                        <button className='hover:bg-blue-300 text-3xl' onClick={handleDecreaseTotal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19 12.998H5v-2h14z" /></svg>
                        </button>
                        <div>{total}</div>
                        <button className='hover:bg-blue-300 text-3xl' onClick={handleIncreaseTotal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg>
                        </button>
                    </div>
                    {isAddedToCart === true ? (
                    <button className={`rounded-3xl p-2 w-1/2 text-white bg-gray-300`} 
                    children={"Add to Cart"} 
                    disabled
                    />
                    ):(
                    <button className={`rounded-3xl p-2 w-1/2 bg-black text-white`} 
                        onClick={handleAddToCart } 
                        children={"Add to Cart"} 
                    />
                    )}

                    {/* {isAddedToCart === true &&   <p>this item has been added already</p>} */}
                </div>
          </div>
        </div>
    );

}

export default ProductDetails
