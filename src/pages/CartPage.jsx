import React from 'react'
import { useCart } from '../context/CartContext'

function CartPage() {

  const { cart, clearCart, removeFromCart } = useCart();
  // const  { cart } = useCart();
  console.log("cart: ",cart)
  // console.log("cart: ",cart[0])
  
  cart.forEach(c => {

    // console.log(c.outfitColor)
    console.log(c.productDetails)
  })

  
  // console.log(cart.productDetails)
  // console.log(cart.length)
  
  
  // Array.from(cart).forEach((cart)=>
  //   console.log(cart)
  // )
  
  // const cartArr = Array.from(cart);
  // console.log(cartArr.length)
  
  
  
  
  function EmptyCart(){

    return(
      <div className='text-5xl text-gray-400'>
        Items wil show up here when you add to cart
      </div>

    );
  }

  const clear = () => clearCart();

  const remove = (removedProduct) => removeFromCart(removedProduct);

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
      <div className='flex gap-2'>
        <h1 className='text-3xl'>CartPage</h1>

        <button 
          onClick={clearCart}
          className='bg-red-300 p-2 cursor-pointer'
        >Clear Cart</button>
      </div>

      <>
        <div className='grid grid-cols-3'>
          {/* {cartArr?.map((product) => ( */}
          {cart?.map(({ productDetails, productTotal }) => (
              <div key={productDetails.slug} className='w-fit'> 
               <img className='w-24 h-24 md:w-full md:h-full' src={productDetails.images[0]} alt={productDetails.title} />
                <div className='md:text-2xl'>{productDetails.title}</div> 
                <button onClick={(e) => remove(item)}>Remove From Cart</button>
              </div> 
          ))}  
          
        </div>

        {/* {!cart.length && <EmptyCart />} */}
        {/* {!cart.length && <EmptyCart />} */}
      </>

    </div>
  )
}

export default CartPage