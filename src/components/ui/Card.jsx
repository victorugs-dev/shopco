import React from 'react'
import { Link } from 'react-router'


function Card({title, percentageDiscount, images, price, slug, rating}) {
  
  const discountedPrice = 0;

  return (
    <Link to={`${slug}`}>
      <div className='w-fit'>
        <img className='w-24 h-24 md:w-full md:h-full' src={images} alt={title} />
        <div className='md:text-2xl'>{title}</div>
        <div className='md:text-2xl'>{rating}</div>
        <div>{percentageDiscount}</div>      
      </div>
    </Link>
  )
}

export default Card