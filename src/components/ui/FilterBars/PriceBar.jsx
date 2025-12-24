import { useMemo } from "react"

function PriceBar({ priceRanges, setPriceRanges, products }){

      // useEffect(() => {
      //    console.log("priceRanges", priceRanges)
      // },[priceRanges])
      
      const handlePriceRangesChange = (event,priceRangeId) => {
         console.log("priceRangeId", priceRangeId)

            // //  if (from <) && (to >).........
            // })
         // }
         console.log("event.target.value", event.target.value)

         setPriceRanges(prevPriceRanges => 
            prevPriceRanges.map(prevPriceRange => 
               prevPriceRange.id === priceRangeId 
               ? {...prevPriceRange, value: event.target.value} : prevPriceRange
            )
         )

      }

    // i may move this up to the other useMemo
      const highestPrice = useMemo(() => {
         const productPrices = products.map(product => product.price)
         return Math.max(...productPrices)
      },[products]);

    return (
     <div className='space-y-2'>
         <p>The highest price is ${highestPrice}</p>
         
         <div className='price-filter flex gap-2  w-fit '> 
            {priceRanges.map(priceRange =>
               <div key={priceRange.id} className='flex'>
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
      </div>
    );
  }

  export default PriceBar