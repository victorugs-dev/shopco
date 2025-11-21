import React from 'react'
import { useParams } from "react-router";
import { data } from '../../data';
import { useState, useEffect, useReducer } from 'react';
import { useTheme } from '../context/ThemeContext';
// import Button from '../components/ui/Button'


function ProductDetails() {
    const [theme,setTheme] = useTheme();
    let params = useParams();
    let productDetails = data.find(item => item.slug === params.slug);
    const { colors, sizes } = productDetails;

    const [total, setTotal] = useState(1); // we may need local storage for this?? 
    const [isAddedToCart, setIsAddedToCart] = useState(false); // we may need local storage for this?? 
    const [outfitSize,setOutfitSize] = useState('large');
    const [outfitColor,setOutfitColor] = useState('');

    // NO CHANGES CAN BE MADE AFTER ADDING TO CART
    // REMOVE THE ADDED ITEM OR ADD A NEW ITEM TO CART

    const discountAmount = productDetails.price * (productDetails.percentageDiscount / 100);
    const newPrice = productDetails.price - discountAmount;

    useEffect(() => {
        colors.length && setOutfitColor(colors[Math.floor(Math.random() * colors.length)]);
    },[]);
    console.log(outfitColor);

    const handleColorPick = (color,event) => {
        if(!isAddedToCart){
            setOutfitColor(color.toLowerCase());
            console.log(color);
            console.log("user wants to change the color of outfit selected")
        }
    }
    
    function OutfitColorButtons(){
        return (
            <div className='flex gap-x-2'>{colors?.map((color) => (
                // <span key={color}>
                    <button key={color} onClick={(e) => handleColorPick(color,e)}
                        className='flex gap-x-1 cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16"><path fill={color} stroke={color === outfitColor && 'black'} strokeWidth='2' fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd" /></svg>
                    </button>
                // </span>
            ))}
            </div>
        )
    }

    // function OutfitColorButtons(){
    //     // return (
    //         <>{colors.map((color) => {
    //             return (
    //                 <div key={color}
    //                     className={`flex gap-x-1 bg-${color}-100`}>
    //                     <button onClick={handleColorPick}>{color}</button>

    //                 </div>
    //             )
    //         }</>
    //     // );
                
    //     // );

    // }

    // <button onClick={handleColorPick} className='bg-green-400 text-green-400 rounded-full'>circle</button>
    //                     <button onClick={handleColorPick} className='bg-blue-400 text-blue-400 rounded-full'>circle</button>
    //                     <button onClick={handleColorPick} className='bg-yellow-400 text-yellow-400 rounded-full'>circle</button>

    // the issue here is that we want a color by default but some colors may not be available for others
    // we have to make a random selection... I think
    // const [outfitColor,setOutfitColor] = useState(`
    //   ${colors[Math.floor(Math.random() * colors + 1)]}
    // `) ;
    

    
 
    // we may have to use the useContext for the cart button so that every product can corresponding to it rather than having individual state for the cart total ???

 
    // button must not be used more than once
    // function handleAddToCart(){
    //     console.log("Added to cart");
        
    //     if(isAddedToCart === false){
    //         setTotal((prev) => (
    //             prev + 1
    //         ));
    //         console.log('total: ',total)
    //         setIsAddedToCart(true);
    //         return
           
    //     }
    //     return <p>This item has been added already</p>
    // }

    // quantity must be greater than 0 before it can be added to cart
    function handleAddToCart(){
        console.log("Added to cart");
        if (total > 0){
            // setTotal((prev) => (
            //     prev + 1
            // ));
            console.log('total: ',total)
            setIsAddedToCart(true);
            return
           
        }
        return <p>This item has been added already</p>
    }
    
    // user must add to cart before increasing quantity
    const handleIncreaseTotal = () => {
        if(!isAddedToCart){
            setTotal((prev) => (
                prev + 1
            ));
        }
    };


    const handleDecreaseTotal = () => {
        if(total > 1 && !isAddedToCart){
            setTotal((prev) => (
                prev - 1
            ));
        }
    };
    // const handleDecreaseTotal = () => setTotal((prev) => (total > 1 && prev - 1));

    

    // const handleDecreaseTotal = () => (total < 0) && (setTotal(prev) => (prev -1));
    // const handleDecreaseTotal = () => setTotal(((total < 0),prev) => (prev -1));


    const handleOutfitSize = (event, size) => {
        !isAddedToCart ? setOutfitSize(event.target.textContent) : console.log('cannot select size after adding to cart!');

        !isAddedToCart && console.log(event.target.textContent);
    };

    // particular btn that is clicked will change color
    // only one size can be selected
    function OutfitSizeButton(){
        return (
            // <button onClick={handleOutfitSize} 
            //     className={`rounded-3xl px-2  py-3 bg-black cursor-pointer
            //     ${(outfitSize === title && !isAddedToCart) ? 'bg-gray-200 text-black' : 'text-white'}`}
            // >{title}</button>
            // <button onClick={handleOutfitSize} 
            //     className={`rounded-3xl px-2  py-3 bg-black cursor-pointer
            //     ${(outfitSize === title && !isAddedToCart) ? 'bg-gray-200 text-black' : 'text-white'}`}
            // >{title}</button>
            <>{sizes?.map((size) => (
                // <span key={size}>
                    <button 
                        key={size}
                        onClick={(e) => handleOutfitSize(e,size)}
                //     className={`rounded-3xl px-2  py-3 bg-black cursor-pointer 
                // ${(outfitSize === size && !isAddedToCart) ? 'bg-gray-200 text-black' : 'text-white'}`}
                    className={`rounded-3xl px-2  py-3 bg-black cursor-pointer
                        ${outfitSize === size ? 'bg-gray-400 text-black' : 'text-white'}`}
                    >{size}</button>
                // </span>
            ))}</>
        );
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
                    {/* <div className='flex gap-x-1'>
                        <button onClick={handleColorPick} className='bg-green-400 text-green-400 rounded-full'>circle</button>
                        <button onClick={handleColorPick} className='bg-blue-400 text-blue-400 rounded-full'>circle</button>
                        <button onClick={handleColorPick} className='bg-yellow-400 text-yellow-400 rounded-full'>circle</button>
                    </div> */}
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
                        <div>{total}</div>
                        <button className='hover:bg-blue-300 text-3xl' onClick={handleIncreaseTotal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg>
                        </button>
                    </div>

                    {isAddedToCart === true ? (
                    <button className={`rounded-3xl p-2 w-1/2 text-white bg-gray-300`}
                    children={"Added"}
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