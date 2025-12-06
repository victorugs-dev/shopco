import React from 'react'
import { Link } from 'react-router'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartButton from './CartButton';

function Card({title, percentageDiscount, images, price, slug, rating}) {
  
  const discountedPrice = 0;

  const { addToCart } = useContext(CartContext);

  
  return (
    <>
      <Link to={`${slug}`}>
        <div className='w-fit'>
          <img className='w-24 h-24 md:w-full md:h-full' src={images} alt={title} />
          <div className='md:text-2xl'>{title}</div>
          <div className='md:text-2xl'>{rating}</div>
          <div>{percentageDiscount}</div>

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