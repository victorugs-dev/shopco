import { useCart } from '../context/CartContext'
import { Link } from 'react-router';

function CartPage() {

  const { cart, clearCart, removeFromCart } = useCart();
  
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
    <div>
      <div className='flex gap-2'>
        <h1 className='text-3xl'>CartPage</h1>

        <button 
          onClick={handleClearCart}
          className='bg-red-300 p-2 cursor-pointer'
        >Clear Cart</button>
      </div>

      <>
        <div className='grid grid-cols-3'>
          {cart?.map((c) => (
              <div key={c.productDetails.slug} className='w-fit'> 
               <img className='w-24 h-24 md:w-full md:h-full' src={c.productDetails.images[0]} alt={c.productDetails.title} />
                <div className='md:text-2xl'>{c.productDetails.title}</div>
                <div>{c.productTotal}</div>
                <button 
                  onClick={(e) => handleRemoveFromCart(c)}
                  className='bg-red-200 cursor-pointer'
                >Remove</button>
              </div> 
          ))}  
          
        </div>

        {!cart.length && <EmptyCart />}
      </>

    </div>
  )
}

export default CartPage