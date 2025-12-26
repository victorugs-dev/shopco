import { useMemo, useEffect, useState } from "react"

function PriceBar({ products, sendDataToParent, setFilteredPrices }){
   const [activePriceRange, setActivePriceRange] = useState(null);

   const [priceRanges, setPriceRanges] = useState([
    {id: "from", title:"From", value:""},
    {id: "to", title: "To", value:""}
   //  {id: "from", title:"From", value: 0},
   //  {id: "to", title: "To", value: highestPrice}
  ]);

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
      let from = 0;
      let to = highestPrice;

      // console.log("activePriceRange",activePriceRange)

      for(let i = 0; i < priceRanges.length; i++){
         if(priceRanges[i].id === "from"){
            // console.log(priceRanges[i])
            // console.log(priceRanges[i].value)
            from = Number(priceRanges[i].value)
         }
         if(priceRanges[i].id === "to"){
            // console.log(priceRanges[i])
            to = Number(priceRanges[i].value) || highestPrice

         }
      }
         // console.log("from",from)
         // console.log("to",to)
         // console.log(highestPrice)

      const priceFilter = products.filter(product => 
         product.price >= from && (product.price <= to )
         // return product
      )
      // console.log("priceFilter", priceFilter)
      setFilteredPrices(priceFilter)

   },[priceRanges, activePriceRange])
      
      // THE 'From" HAS VALUE OF 0 BY DEFAULT IF LEFT BLANK
      //  THE "TO" JAS VALUE OF  highestPrice IN  PRODUCTS DATA BY DEFAULT IF LEFT BLANK

      const handlePriceRangesChange = (event,priceRangeId) => {
         // console.log("priceRangeId", priceRangeId)
         newPriceRangeId = priceRangeId;
         // console.log("event.target.value", event.target.value)

         setActivePriceRange(priceRanges.filter(priceRange => {
           return priceRange.id === priceRangeId
         }
         ))

         // console.log("activePriceRange", activePriceRange)
         

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