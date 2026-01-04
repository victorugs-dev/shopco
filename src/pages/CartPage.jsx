import { useCart } from '../context/CartContext'
import { Link } from 'react-router';

function CartPage() {

  const { cart, clearCart, removeFromCart } = useCart();
  console.log(cart)

  const prices =  cart.map(c => c.productDetails.price);
  let subTotal = 0;
  for(let i = 0; i < prices.length; i++)  subTotal += prices[i];
//   for(let i = subTotal; i < prices.length; i++)  subTotal += prices[i];
  console.log(prices)
  console.log(subTotal)


  //   Discount(20%)  is equal to sum of all (old price - discounted price)
//   const newPrice = cart.map(c => c.productDetails.price) // the updated price after discount
//   const oldPrice = newPrice *discount
  let discounts = cart.map(c => c.productDetails.product)
  let discountSum = 0;
//   for(let i =0; i <)

   // the money user was able to save due to the discount
   let discountValue = 0;
   for(let i = 0; i < cart.length; i++){
      console.log("cart[i]", cart[i])
      discountValue += cart[i].productDetails.price - cart[i].updatedProductPrice 
   }

   let deliveryFee = 15;

   const total = (subTotal - discountValue) + deliveryFee;


  
  // console.log(cart.productDetails)
  // console.log(cart.length)
  
  
  // Array.from(cart).forEach((cart)=>
  //   console.log(cart)
  // )
  
  // const cartArr = Array.from(cart);
  // console.log(cartArr.length)
  
  
  
  
  function EmptyCart(){

    return(
      <div className=''>
        <div className='text-5xl text-gray-400'>Items wil show up here when you add to cart</div>
        
        <Link to={'/'} 
         className='underline'
        >
          <p>Continue shopping</p>
        </Link>
        
      </div>

    );
  }

  const handleClearCart = () => clearCart();

  const handleRemoveFromCart = (removedProduct) => removeFromCart(removedProduct);

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
   <div className=' m-4 space-y-3'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl'>YOUR CART</h1>

        <button 
          onClick={handleClearCart}
          className='bg-red-600 p-2 cursor-pointer rounded-2xl text-md border-2'
        >Clear Cart</button>
      </div>

      <div className='grid grid-rows md:grid-cols-[2fr_1fr]  gap-y-3 md:space-x-10 w-full'>
        {/* <div className='grid grid-cols-3 bg-amber-300'> */}
        {!cart.length ? ( <EmptyCart /> 
        ):(
         <>
            <div className=' border h-fit  rounded-3xl'>{cart?.map((c) => (
               <div key={c.productDetails.slug} className=''> 
                  <div className='flex justify-between w-full'>
                     <div className='flex gap-x-1.5 w-full px-3 py-6 '>
                           <img className=' w-24 h-24 md:w-30 md:h-30' src={c.productDetails.images[0]} alt={c.productDetails.title} />
                           <div className='w-full px-2 '>
                              <div className='flex justify-between'>
                                 <div className='md:text-2xl'>{c.productDetails.title}</div>
                                 <button 
                                    onClick={(e) => handleRemoveFromCart(c)}
                                    className='cursor-pointer'
                                 >
                                     {/* delete icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"/></svg>
                                 </button>
                              </div>

                              <div className='md:text-2xl'>Size: {c.productSize}</div>
                              <div className='md:text-2xl'>Color: {c.productColor}</div>
                              <div className='flex justify-between'> 
                                 <div>${c.updatedProductPrice}</div>
                                 <div>Quantity: {c.productTotal}</div>
                              </div>
                           </div>
                     </div>
                  </div>
               </div> ))}  
            </div> 
        
            <div className='rounded-3xl border px-3 py-4 md:p-7 space-y-3'>
               <h1 className='text-2xl'>Order Summary</h1>
               <div className='flex justify-between'>
                  <p>Subtotal</p>
                  <p>${subTotal}</p>
               </div>
               <div className='flex justify-between'>
                  <p>Discount value</p>
                  <p className=' text-red-600'>-${discountValue}</p>
               </div>
               <div className='flex justify-between'>
                  <p>Delivery Fee</p>
                  <p>${deliveryFee}</p>
               </div>
               <hr />
               <div className='flex justify-between'>
                  <p>Total</p>
                  <p>${total}</p>
               </div>
               <form action="" className='flex justify-between'>
                  <div className='flex items-center justify-center px-4 md:px-5 gap-x-3 bg-gray-300 rounded-3xl '>
                     {/* label tag icon */}
                     
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" stroke='black' d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59s1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"/></svg>

                     <input 
                        type="text" 
                        placeholder='Add promo code'
                     />
                  </div>
                  <button type="submit" className='bg-black text-white px-10 py-2 rounded-4xl'>Apply</button>
               </form>

               <Link to={'/checkout-page'} className='flex justify-center py-3 rounded-3xl gap-2 bg-black text-white'>
                  <p>Go to Checkout</p>
                  right arrow
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="m14 16l4-4m0 0l-4-4m4 4H6"/></svg>
                </Link>

            </div>
         </>
        )}
      </div>

    </div>
  )
}

export default CartPage