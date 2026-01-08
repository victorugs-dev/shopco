import React from 'react'
import MobileAvailabilityBar from './MobileFilterBars/MobileAvailabilityBar';
import MobilePriceBar from './MobileFilterBars/MobilePriceBar';
import MobileSizeBar from './MobileFilterBars/MobileSizeBar';
import MobileColorBar from './MobileFilterBars/MobileColorBar';
import { useState } from 'react';

function MobileFilterSort({displayedProducts,filters, isFilterAndSortClicked, handleFilterAndSortClick, handleRemoveAllFilters, availabilityOptions, currCheckedAvailability, setCurrCheckedAvailability, productsInStock, productsOutOfStock, priceRanges, setPriceRanges, highestPrice, setFilteredPrices, products, sizeOptions, currCheckedSizes, setCurrCheckedSizes, colorOptions, currCheckedColors, setCurrCheckedColors}) {

   const [activeMobileFilter, setActiveMobileFilter ] = useState(null);

   const handleClickedFilter = (filterId) => setActiveMobileFilter(filterId);

  return (
   <>
      {isFilterAndSortClicked && (
         <div className='md:hidden absolute right-0 top-0 bg-white px-5 py-6 space-y-3 z-20 w-60 h-80'>
            {/* <div className='grid grid-cols-[3fr_1fr] items-center'> */}
            {!activeMobileFilter && (
               <>
                  <div className='flex  justify-between items-center space-x-3'>
                     <div>
                        <label className='text-2xl'>Filter and sort</label>
                        <label htmlFor=""></label>
                        <p>{displayedProducts.length} products</p>
                     </div>
                     <div>
                        <button onClick={handleFilterAndSortClick} className='text-3xl'
                        >X</button>
                     </div>
                  </div>      

                  {filters.map(filter => 
                     <div key={filter.id} className='flex justify-between'>
                        <p>{filter.title}</p>
                        <button data-filter={filter.id} onClick={() => handleClickedFilter(filter.id)}className='cursor-pointer'>
                           {/* checkout arrow */}
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="m14 16l4-4m0 0l-4-4m4 4H6"/></svg>
                        </button>
                     </div>
                  )}

                  <p>Sort by: </p>

                  <button onClick={() => handleRemoveAllFilters()} className='underline'>Remove all</button>
               </>
            )}
           
            {activeMobileFilter === 'availability' && (
               <MobileAvailabilityBar
                  activeMobileFilter={activeMobileFilter}
                  setActiveMobileFilter={setActiveMobileFilter}   
                  availabilityOptions={availabilityOptions}
                  currCheckedAvailability={currCheckedAvailability}
                  setCurrCheckedAvailability  = {setCurrCheckedAvailability}
                  productsInStock={productsInStock}
                  productsOutOfStock={productsOutOfStock}
               />
            )}
            {activeMobileFilter === 'price' && (
               <MobilePriceBar
                  priceRanges={priceRanges}
                  setPriceRanges={setPriceRanges}
                  highestPrice={highestPrice}
                  setFilteredPrices={setFilteredPrices}
                  products={products}
                  setActiveMobileFilter={setActiveMobileFilter}
               />
            )}
            {activeMobileFilter === 'size' && (
               <MobileSizeBar 
                  setActiveMobileFilter={setActiveMobileFilter}
                  sizeOptions={sizeOptions}
                  currCheckedSizes={currCheckedSizes}
                  setCurrCheckedSizes={setCurrCheckedSizes}
               />
            )}
            {activeMobileFilter === 'color' && (
               <MobileColorBar 
                  setActiveMobileFilter={setActiveMobileFilter}
                  colorOptions={colorOptions}
                  currCheckedColors={currCheckedColors}
                  setCurrCheckedColors={setCurrCheckedColors}
               />
            )}
         </div>
      )}
   </>
  )
}

export default MobileFilterSort