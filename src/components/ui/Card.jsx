import React from 'react'
import { Link } from 'react-router'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartButton from './CartButton';

function Card({title, percentageDiscount, images, price, slug, rating, sizes, inStock, colors}) {
  // console.log("sizes", sizes)
  const discountedPrice = 0;

  const { addToCart } = useContext(CartContext);
  
  return (
    <>
      {/* <Link to={`${slug}`}> */}
      {/* <Link to={`products/${slug}`}> */}
        <Link to={`/products/${slug}`}>
        <div className='w-fit'>
          <img className='w-24 h-24 md:w-full md:h-full' src={images} alt={title} />

          <p className='md:text-2xl'>{title}</p>

          <div
            // className='flex gap-1'
            className='grid grid-cols-4'
          >{sizes?.map(size => 
            <p key={size}>{size}</p>
          )}</div>

          
          <div className='flex gap-1'>{colors?.map(color => 
            <p key={color}>{color}</p>
          )}</div>

          <p className='md:text-2xl'>{rating}</p>

          <p>{percentageDiscount}</p>

          <p>{inStock ? 'In Stock' : 'Out of Stock'}</p>

          <CartButton />
        </div>
      </Link>
      {/* <button
        className='span'
      // onClick={() => addToCart()}
        
      >Add To cart</button> */}
    </>
  )
}

export default Card