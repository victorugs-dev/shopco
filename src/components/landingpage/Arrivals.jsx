import React from 'react'
import Card from '../ui/Card'
import { data } from '../../../data'
import { useCallback } from 'react'
// import { useNavigate } from 'react-router'



function Arrivals() {

  // const navigate = useNavigate()

  
  return (
    <div className='w-full'>
      <div className='grid align-center grid-cols-4 gap-4 md:m-0 p-2 md:p-0  md:m-4 space-x-2 md:space-x-0 gap-0 w-fit'>
        {data.map(product => (
          <Card 
            key={product.id}
            title={product.title}
            discount={product.discount}
            images={product.images[0]}
            price={product.price}
            slug={product.slug} 
            rating={product.rating}
          />
        ))}
      </div>
      
      <hr />
    </div>
  )
}

export default Arrivals