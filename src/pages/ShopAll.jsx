import { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../mock/product.js';
import Card from '../components/ui/Card.jsx';
import PriceBar from '../components/ui/FilterBars/PriceBar.jsx';
import ColorBar from '../components/ui/FilterBars/ColorBar.jsx';
import SizeBar from '../components/ui/FilterBars/SizeBar.jsx';
import AvailabilityBar from '../components/ui/FilterBars/AvailabilityBar.jsx';

// filter icon
// sort dropdown: by New Arrivals, color, size, date released
// filer dropdown: by brand, price

function ShopAll() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
  const products = data || []

  const [activeDropdown, setActiveDropdown] = useState('');
  const [isFilterDropdownActive, setIsDropdownActive] = useState(false);
  const [currCheckedAvailability, setCurrCheckedAvailability] = useState(null);
  const [currCheckedSizes, setCurrCheckedSizes] = useState([
    {id:"x-small", isChecked: false},
    {id:"small", isChecked: false},
    {id:"medium", isChecked: false},
    {id:"large", isChecked: false},
    {id:"x-large", isChecked: false},
    {id:"xx-large", isChecked: false},
    {id:"xxx-large", isChecked: false},
  ]);
  const [currCheckedColors, setCurrCheckedColors] = useState([
    {id: "green", isChecked: false},
    {id: "red", isChecked: false},
    {id: "yellow", isChecked: false},
    {id: "orange", isChecked: false},
    {id: "light-blue", isChecked: false},
    {id: "dark-blue", isChecked: false},
    {id: "purple", isChecked: false},
    {id: "pink", isChecked: false},
    {id: "white", isChecked: false},
    {id: "black", isChecked: false},
  ]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [isRemoveAllFiltersClicked, setIsRemoveAllFiltersClicked] = useState(false);
   const [priceRanges, setPriceRanges] = useState([
    {id: "from", title:"From", value:""},
    {id: "to", title: "To", value:""}
  ]);

   const highestPrice = useMemo(() => {
      const productPrices = products.map(product => product.price)
      return Math.max(...productPrices)
   },[products]);


  const displayedProducts = useMemo(() => {
      let filteredProducts = products;
      
      const checkedSizeIds = currCheckedSizes
      .filter(currCheckedSize => currCheckedSize.isChecked)
      .map(currCheckedSize => currCheckedSize.id);

      const checkedColorsIds = currCheckedColors
      .filter(currCheckedColor => currCheckedColor.isChecked)
      .map(currCheckedColor => currCheckedColor.id);

      console.log("checkedColorsIds", checkedColorsIds);

      // if(isRemoveAllFiltersClicked === true) return products

      // the order of the if statements don't matter 

      if(checkedSizeIds.length){
         filteredProducts = filteredProducts.filter(product => 
         product.sizes?.some(size => 
            checkedSizeIds.includes(size)
         ));
      }

      if(checkedColorsIds.length){
         filteredProducts = filteredProducts.filter(product => {
            const filtered = product.colors?.some(color => 
            checkedColorsIds.includes(color))
            console.log("filtered", filtered)
            return filtered;
         })
      }

      if(filteredPrices.length) return filteredPrices

      if(currCheckedAvailability === 'inStock'){
         filteredProducts = filteredProducts.filter(products => products.inStock)
      }

      if(currCheckedAvailability === 'outOfStock'){
         filteredProducts = filteredProducts.filter(products => !products.inStock)
      }

      console.log("checkedSizeIds", checkedSizeIds)

      return isRemoveAllFiltersClicked ? products : filteredProducts
  },[products, currCheckedAvailability, currCheckedSizes, currCheckedColors, filteredPrices, isRemoveAllFiltersClicked]);

  const dropdownButtonRef = useRef(null);
  // console.log("dropdownButtonRef", dropdownButtonRef);

  const filters = [
    { id: "availability", title: "Availability"},
    { id: "price", title: "Price"},
    { id: "size", title: "Size"},
    { id: "colour", title: "Colour"},
  ];

  const handleFilterDropdown = (event,currFilter) => {
    setIsDropdownActive(!isFilterDropdownActive);
    setActiveDropdown(currFilter.title)
  };

    const handleRemoveAllFilters = () => {
     setIsDropdownActive(false);
      setActiveDropdown('');
      setIsRemoveAllFiltersClicked(true)
      setCurrCheckedColors(prevCheckedColors => prevCheckedColors.map(prevCheckedColor => {
         return {...prevCheckedColor, isChecked: false}
      }))
      setCurrCheckedSizes(prevCheckedSizes => prevCheckedSizes.map(prevCheckedSize => {
         return {...prevCheckedSize, isChecked: false}
      }))

      setCurrCheckedAvailability(null)
  }

  const productsInStock = products.filter(product => product.inStock === true);
  const productsOutOfStock = products.filter(product => product.inStock === false);

  const handleAvailabilityChange = (availabilityId) =>  setCurrCheckedAvailability(prev =>  prev === availabilityId ? null : availabilityId);

  const handleSizeChange = (event, sizeId) => {
    setCurrCheckedSizes(prevCheckedSize => 
      prevCheckedSize.map(size => size.id === sizeId ? {...size, isChecked: !size.isChecked} : size
    ))
  };

  //  result of  priceFilter from PriceBar
  const handleDataFromChild = (data) => {
      // displayedProducts = data
      console.log("data from child component:", data)
      setFilteredPrices(data);
  }

  const handleRemovePriceFilter = () => {
      // setPriceRanges(prevPriceRanges)
      setPriceRanges([
         {id: "from", title:"From", value:""},
         {id: "to", title: "To", value:""}
      ])
  }
   // set the dropDropdowns inactive before the user sees result of removed filters


  if (isLoading) return <p>Loading products...</p>
  if (error) return <p>Failed to load products</p>
  
  return (
    <div>
      <h1 className='m-4 text-3xl'>Products</h1>
      <div className='m-4'>
        <div >
            <div className=''>
              <div className='flex bg-green-300'>
              {filters.map((filter) => (
                <div
                  id={filter.id} 
                  key={filter.id} 
                  className='flex'
                >
                  <p>{filter.title}</p>

                  {(isFilterDropdownActive === false || activeDropdown !== filter.title) && (
                    <button
                      onClick={(e) => handleFilterDropdown(e, filter)}
                      ref={dropdownButtonRef}
                      className='cursor-pointer'
                    >{/* down arrow icon*/}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42" /></svg>
                    </button>
                  )}
                  {(isFilterDropdownActive === true && activeDropdown === filter.title) && (
                    <button
                      onClick={(e) => handleFilterDropdown(e, filter)}
                      className='cursor-pointer'
                    >{/* up arrow icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m12.354 5.646l5 5a.5.5 0 0 1-.708.708L12.5 7.207V18a.5.5 0 0 1-1 0V7.207l-4.146 4.147a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708 0" /></svg>
                    </button>
                  )}
                </div>
              ))}
              </div>
              <div>
                  {activeDropdown === "Availability" && (
                     <AvailabilityBar
                        currCheckedAvailability={currCheckedAvailability}
                        setCurrCheckedAvailability={setCurrCheckedAvailability}
                        // availabilityOptions={availabilityOptions}
                        products={products}
                     />
                  )}
                  {activeDropdown === "Price" && (
                     <PriceBar
                        priceRanges={priceRanges}
                        setPriceRanges={setPriceRanges}
                        products={products}
                        // sendDataToParent={handleDataFromChild}
                        setFilteredPrices={setFilteredPrices}
                        highestPrice={highestPrice}

                     />
                  )}
                  {activeDropdown === "Size" && (
                     <SizeBar
                        currCheckedSizes={currCheckedSizes}
                        setCurrCheckedSizes={setCurrCheckedSizes}
                     />
                  )}
                  {activeDropdown === "Colour" && (
                     <ColorBar
                        currCheckedColors={currCheckedColors}
                        setCurrCheckedColors={setCurrCheckedColors}
                     />
                  )}
              </div>
            </div>
        </div>      
      </div>
      <div className='w-full '>
        <div className='flex gap-1 '>{currCheckedSizes.map(currCheckedSize => 
            (currCheckedSize.isChecked  && !isRemoveAllFiltersClicked)&& (
                <div 
                  key={currCheckedSize.id}
                  className='flex  mx-1 outline px-2 py-1 rounded-2xl  items-center'
                >
                  <p>Size: {currCheckedSize.id}</p>
                  <button
                    className=' cursor-pointer'
                    onClick={(e) => handleSizeChange(e, currCheckedSize.id)}
                  >
                      {/* cancel icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg> 
                  </button>
                </div>
          ) )}

          {(currCheckedAvailability && !isRemoveAllFiltersClicked) && (
            <div
              className='flex  mx-1 outline px-2 py-1 rounded-2xl  items-center'
            >
            <p >Availability: {currCheckedAvailability === 'inStock' ? 'In stock' : 'Out of stock'}</p>
            <button
                className='cursor-pointer'
                onClick={() => handleAvailabilityChange(currCheckedAvailability)}
              >
                {/* cancel icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg> 
              </button>
            </div>
          )}

           {currCheckedColors.map(currCheckedColor =>
            (currCheckedColor.isChecked && !isRemoveAllFiltersClicked)&& (
            <div 
                key={currCheckedColor.id}
                className='flex  mx-1 outline px-2 py-1 rounded-2xl  items-center'
              >
                <p>Size: {currCheckedColor.id}</p>
                <button
                  className=' cursor-pointer'
                  onClick={(e) => handleColorChange(e, currCheckedColor.id)}
                >
                    {/* cancel icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg> 
                </button>
              </div> 
               ))}
                  
               {(priceRanges.some(priceRange => priceRange.value !== "")) && (
                  <div className='flex  mx-1 outline px-2 py-1 rounded-2xl  items-center' >
                        {priceRanges.map(priceRange => 
                              <div key={priceRange.id} className='px-0.5'>
                                    {/* {(priceRange.id === 'from') && <p>${priceRange.value || 0}</p>}
                                    {(priceRange.id === 'to') && (
                                       <>
                                          <span>-</span>
                                          <span>${priceRange.value || highestPrice}</span>
                                       </>
                                    )} */}
                                         {(priceRange.id === 'to') ? (
                                       <div className='space-x-1'>
                                          <span>-</span>
                                          <span>${priceRange.value || highestPrice}</span>
                                       </div>
                                    ) : <p>${priceRange.value || 0}</p>}
                              </div>
                        )}

                     <button
                     className=' cursor-pointer'
                        onClick={() => handleRemovePriceFilter()}
                     >
                        {/* cancel icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg> 
                     </button>
                  </div>
               )}

               {(currCheckedAvailability || currCheckedSizes.some(s => s.isChecked) || currCheckedColors.some(c => c.isChecked)) && (
                  <div>
                     <button 
                        onClick={handleRemoveAllFilters}
                        className='block underline cursor-pointer mx-1'
                     >remove all</button>
                  </div>
               )}
            </div>


        {/* <div className='grid align-center grid-cols-4 gap-4 md:m-0 p-2 md:p-0  md:m-4 space-x-2 md:space-x-0  w-fit'> */}
        <div className='grid align-center grid-cols-4 gap-4 md:m-0 p-2 md:p-0  md:m-4 space-x-2 md:space-x-0  '>
          {displayedProducts.length ? (
            displayedProducts.map(product => (
            <Card
              key={product.id}
              title={product.title}
              discount={product.discount}
              images={product.images[0]}
              slug={product.slug} 
            //   rating={product.rating}
              sizes={product.sizes}
              inStock={product.inStock}
              colors={product.colors}
              price={product.price}
            />
          ))
          ) : (
            // <p>Nothing matches that description</p>
            <div className='flex md:flex-col justify-center items-center bg-blue-300 w-full'>
               <p>No products found </p>
              <div>
                  <span>Use fewer filters or </span>
                  <button 
                     onClick={handleRemoveAllFilters}
                     className='underline cursor-pointer'
                  >remove all</button>
              </div>
            </div>
          )}
        </div>
        <hr />
      </div>

    </div>
  )
}

export default ShopAll