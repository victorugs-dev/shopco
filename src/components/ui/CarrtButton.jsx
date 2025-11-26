import { useContext } from 'react'


function CartButton(){

    const handleAddToCart = () => {
        console.log('add to cart button');
    }

    return (
        <button 
            onClick={handleAddToCart}
            className='bg-red-100'
        >Add To Cart</button>
    );
}
export default CartButton