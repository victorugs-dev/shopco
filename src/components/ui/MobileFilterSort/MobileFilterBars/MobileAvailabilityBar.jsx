import React from 'react'

function MobileAvailabilityBar({ activeMobileFilter, setActiveMobileFilter, availabilityOptions, currCheckedAvailability, setCurrCheckedAvailability, productsInStock, productsOutOfStock}) {

   const handleAvailabilityChange = (event, availabilityId) => {
      setCurrCheckedAvailability(prev => prev === availabilityId ? null : availabilityId);
   };

  return (
    <div>
      <div>
         {/* back arrow | this will turn off the activeMobileDropdown */}
         <button onClick={() => setActiveMobileFilter(null)}>B</button>
         <p>Availability</p>
      </div>

      {availabilityOptions.map(availability => 
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
      
    </div>
  )
}

export default MobileAvailabilityBar