import React from 'react'
import Card from '../ui/Card'
import { data } from '../../../data'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'



function Arrivals() {

  const navigate = useNavigate()

  function viewAllNewArrivals(){
    console.log('view all new arrivals')
    // setTimeout(() => navigate("/AllNewArrivals"), 1000)

  }
  
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
      <div className='flex justify-center w-full mt-2 mb-10'>
        <button onClick={viewAllNewArrivals} className='border rounded-full px-10 py-4'>View All</button>
      </div>
      <hr />
    </div>
  )
}

export default Arrivals