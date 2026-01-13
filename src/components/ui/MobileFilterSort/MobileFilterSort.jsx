import MobileAvailabilityBar from './MobileFilterBars/MobileAvailabilityBar';
import MobilePriceBar from './MobileFilterBars/MobilePriceBar';
import MobileSizeBar from './MobileFilterBars/MobileSizeBar';
import MobileColorBar from './MobileFilterBars/MobileColorBar';
import { useState } from 'react';

function MobileFilterSort({displayedProducts,filters, isFilterAndSortClicked, handleFilterAndSortClick, handleRemoveAllFilters, availabilityOptions, currCheckedAvailability, setCurrCheckedAvailability, productsInStock, productsOutOfStock, priceRanges, setPriceRanges, highestPrice, setFilteredPrices, products, sizeOptions, currCheckedSizes, setCurrCheckedSizes, colorOptions, currCheckedColors, setCurrCheckedColors, isSortByClicked, setIsSortByClicked, currCheckedSortBy, sortBys, handleSortByCLick}) {

   const [activeMobileFilter, setActiveMobileFilter ] = useState(null);

   const handleClickedFilter = (filterId) => setActiveMobileFilter(filterId);

  return (
   <>
      {isFilterAndSortClicked && (
         <div className='md:hidden absolute right-0 top-0 bg-white px-5 py-6 space-y-3 z-20 w-70 h-screen'>
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

                  <div className=' flex  gap-x-3 items-center min-w-100  '>
                     <p>Sort by: </p>
                     <div className={` flex relative justify-between  ${isSortByClicked && "border-2  border-gray-500"} min-w-43 py-1 px-2 `}>
                        <p>{currCheckedSortBy}</p>
                        <button className='underline cursor-pointer' onClick={() => setIsSortByClicked(!isSortByClicked)}>
                           {isSortByClicked ? (
                              //  up arrow icon 
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m12.354 5.646l5 5a.5.5 0 0 1-.708.708L12.5 7.207V18a.5.5 0 0 1-1 0V7.207l-4.146 4.147a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708 0" /></svg> 
                              )  : (
                              // down arrow icon
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42" /></svg>
                           )}
                        </button>

                        { isSortByClicked && (
                        <div className=' absolute  md:hidden  left-2 top-8 z-20 border  p-2'>{isSortByClicked && sortBys.map(sortBy => 
                           <button key={sortBy.title} onClick={() => handleSortByCLick(sortBy)} className='flex items-start     bg-white hover:bg-blue-400 hover:text-white'>
                           {sortBy.title}
                           </button>
                           )}
                        </div>
                        )}

                     </div>
                  </div>

               </>
            )}
            {/* <button onClick={() => handleRemoveAllFilters()} className='underline absolute bottom-2 '>Remove all</button> */}
            <button onClick={handleRemoveAllFilters} className='underline absolute bottom-2 '>Remove all</button>

           
         <>
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
         </>
         </div>
      )}
   </>
  )
}

export default MobileFilterSort