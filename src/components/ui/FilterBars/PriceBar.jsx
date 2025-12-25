import { useMemo, useEffect, useState } from "react"

function PriceBar({ priceRanges, setPriceRanges, products }){
   const [activePriceRange, setActivePriceRange] = useState(null);

   // i may move this up to the other useMemo
   const highestPrice = useMemo(() => {
      const productPrices = products.map(product => product.price)
      return Math.max(...productPrices)
   },[products]);

   let newPriceRangeId = "";

   // let from = 0;
   // let to = highestPrice;
   // let from = 0;
   // let to = 200;

   // this works
   // const priceFilter = products.filter(product => 
   //    // product.price >= from && product.price <= highestPrice
   //    product.price >= from && product.price <= to
   //    // return product
   // )
   // console.log("priceFilter", priceFilter)

   // let from = 0;
   // let to = highestPrice;

   useEffect(() => {
      console.log("priceRanges", priceRanges)
      // let newPriceRangeId = "";
      let from = 0;
      let to = highestPrice;

      console.log("activePriceRange",activePriceRange)
      // const filtered = products.filter(products => 
         
      // )
      // priceRanges.map(priceRange => {
      //    if(priceRange.id === "from"){
      //       console.log(priceRange)
      //       from = priceRange.value
      //    }
      //    if(priceRange.id === "to"){
      //       to = priceRange.value
      //       console.log(priceRange)

      //    }
      // })

      for(let i = 0; i < priceRanges.length; i++){
         if(priceRanges[i].id === "from"){
            console.log(priceRanges[i])
            console.log(priceRanges[i].value)
            from = Number(priceRanges[i].value)
         }
         if(priceRanges[i].id === "to"){
            console.log(priceRanges[i])
            to = Number(priceRanges[i].value) || highestPrice

         }
      }
         console.log("from",from)
         console.log("to",to)
         console.log(highestPrice)

      const priceFilter = products.filter(product => 
         // product.price >= from && product.price <= highestPrice
         // product.price >= from && product.price <= to

         // if product.to is 0 compare with highestPrice instead
         // if user leaves 'to input" blank compare with highestPrice instead
         // product.price >= from && (product.price <= to || highestPrice)
         product.price >= from && (product.price <= to )
         // return product
      )

      console.log("priceFilter", priceFilter)



      // const mappedPriceRange = priceRanges.map(priceRange => 
      //    priceRange.id
      // )
      const mappedPriceRange = priceRanges.map(priceRange => {
         if(priceRange.id === "from"){
            console.log("from")
            return
         }

         if(priceRange.id === "to"){
            console.log("to")
            return
         }
         
      }
      )

      console.log("mappedPriceRange", mappedPriceRange)

      // if(price)

      // loop through products and return products whose prices are greater or equal to "From"
      //  and less than or equal to "To"
      // const filteredPrices = products.filter(product => {
         // console.log("product", product)
         // const filtered = product.price <= 
         // priceRanges.some(priceRange => 
            // product.price >= Number(priceRamge.value) && product.price >= Number(price)
            // console.log("priceRangesSome", priceRange)
         // )
         // return filteredPrices;
      // })
      // console.log("filteredPrices", filteredPrices);

   },[priceRanges, activePriceRange])
      
      // THE 'From" HAS VALUE OF 0 BY DEFAULT IF LEFT BLANK
      //  THE "TO" JAS VALUE OF  highestPrice IN  PRODUCTS DATA BY DEFAULT IF LEFT BLANK

      const handlePriceRangesChange = (event,priceRangeId) => {
         console.log("priceRangeId", priceRangeId)
         newPriceRangeId = priceRangeId;

            // //  if (from <) && (to >).........
            // })
         // }
         console.log("event.target.value", event.target.value)

         setActivePriceRange(priceRanges.filter(priceRange => {
            // newPriceRangeId = 
           return priceRange.id === priceRangeId
         }
            
         ))

         console.log("activePriceRange", activePriceRange)
         

         setPriceRanges(prevPriceRanges => 
            prevPriceRanges.map(prevPriceRange => 
               prevPriceRange.id === priceRangeId 
               ? {...prevPriceRange, value: event.target.value} : prevPriceRange
            )
         )

         // console.log("priceRanges", priceRanges)


      }

 

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