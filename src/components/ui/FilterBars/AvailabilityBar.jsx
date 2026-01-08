export default function AvailabilityBar({currCheckedAvailability, setCurrCheckedAvailability, products, availabilityOptions, productsInStock, productsOutOfStock}){


   const handleAvailabilityChange = (event, availabilityId) => {
      setCurrCheckedAvailability(prev => 
      prev === availabilityId ? null : availabilityId);
   };
   
  return (
      <>
         {availabilityOptions.map((availability) => 
         <div key={availability.id}>
            <input   
               type='checkbox'
               id={availability.id}
               checked={availability.id === currCheckedAvailability}
               onChange={(e) => handleAvailabilityChange(e, availability.id)}
            />
            <label htmlFor={availability.id}>{availability.title} 
               ({ availability.id === "inStock" ? productsInStock.length : productsOutOfStock.length})
            </label>
         </div>
         )}
      </>
      );
}