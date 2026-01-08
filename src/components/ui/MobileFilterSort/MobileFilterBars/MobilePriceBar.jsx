import React from 'react'
import { useState, useEffect } from 'react';

function MobilePriceBar({priceRanges, setPriceRanges, highestPrice, products, setFilteredPrices, setActiveMobileFilter}) {
   const [activePriceRange, setActivePriceRange] = useState(null);
   
      let newPriceRangeId = '';
   
      useEffect(() => {
         let from = 0;
         let to = highestPrice;
   
         for(let i = 0; i < priceRanges.length; i++){
            if(priceRanges[i].id === "from") from = Number(priceRanges[i].value);
            if(priceRanges[i].id === "to") to = Number(priceRanges[i].value) || highestPrice;
         }

         const priceFilter = products.filter(product => product.price >= from && product.price <= to);

         setFilteredPrices(priceFilter)
      },[priceRanges, activePriceRange])
         
         // THE 'From" HAS VALUE OF 0 BY DEFAULT IF LEFT BLANK
         //  THE "TO" JAS VALUE OF  highestPrice IN  PRODUCTS DATA BY DEFAULT IF LEFT BLANK
   
         const handlePriceRangesChange = (event,priceRangeId) => {
            newPriceRangeId = priceRangeId;
   
            setActivePriceRange(priceRanges.filter(priceRange => {
              return priceRange.id === priceRangeId
            }
            ))
   
            setPriceRanges(prevPriceRanges => 
               prevPriceRanges.map(prevPriceRange => 
                  prevPriceRange.id === priceRangeId 
                  ? {...prevPriceRange, value: event.target.value} : prevPriceRange
               )
            );
         }
   

  return (
    <div className='space-y-2'>
         <div>
            {/* back arrow | this will turn off the activeMobileDropdown */}
            <button onClick={() => setActiveMobileFilter(null)}>B</button>
            <p className='text-2xl'>Price</p>
            <p className='text-xl'>The highest price is ${highestPrice}</p>
         </div>

           {priceRanges.map(priceRange =>
               <div key={priceRange.id} className='flex gap-x-0.5'>
                  <span>$</span>
                  <input 
                     type="number" 
                     placeholder={priceRange.title}
                     className='w-fit border outline-1 focus:ring-0 text-base'
                     value={priceRange.value}
                     onChange={(e) => handlePriceRangesChange(e, priceRange.id)}
                  />
               </div>
            )}
    </div>
  )
}

export default MobilePriceBar