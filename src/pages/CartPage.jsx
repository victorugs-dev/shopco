import React from 'react'
import { useCart } from '../context/CartContext'

function CartPage() {

  const { cart } = useCart();
  console.log(cart)

  function EmptyCart(){

    return(
      <div className='text-5xl text-gray-400'>
        Items wil show up here when you add to cart
      </div>

    );
  }


  //  id: 0,
  //   title: "T-shirt with Tape Details",
  //   // title: "shirt",
  //   slug: "t-shirt-with-tape-details",
  //   price: 120,
  //   percentageDiscount: null,
  //   description: "This is a T-shirtk with Tape Details",
  //   colors: ["green", "red", "blue"],
  //   sizes: ["small", "medium", "large", "x-large"],
  //   images: [
  //     "/images/t-shirts/t-shirt-with-tape-details/t-shirt-with-tape-details.png"
  //   ],
  //   rating: 4.5,

  return (
    <div>
      <h1 className='text-3xl'>CartPage</h1>

      <>
        <div className='grid grid-cols-3'>
          {cart?.map((product) => (
            <div key={product.slug} className='w-fit'>
              <img className='w-24 h-24 md:w-full md:h-full' src={product.images[0]} alt={product.title} />
              <div className='md:text-2xl'>{product.title}</div>
            </div>
          ))}
        </div>

        {!cart.length && <EmptyCart />}
        {/* {cart && <EmptyCart />} */}
      </>
    </div>
  )
}

export default CartPage