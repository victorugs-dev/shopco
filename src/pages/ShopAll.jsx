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

//   const [activeDropdown, setActiveDropdown] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isFilterDropdownActive, setIsDropdownActive] = useState(false);
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
  const [currCheckedSortBy, setCurrCheckedSortBy] = useState("Alphabetically, A-Z");
  const [isSortByClicked, setIsSortByClicked] = useState(false);
  const [currClickedSortBy, setCurrClickedSortBy] = useState(null);
//   const [currClickedSortBy, setCurrCheckedSortBy] = useState(null);

  const [isFilterAndSortClicked, setIsFilterAndSortClicked] = useState(false);
//   const [element, setElement] = useState("");

 

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

      if(currCheckedSortBy === "Alphabetically, A-Z"){
         filteredProducts = [...filteredProducts].sort((a,b) => a.title.localeCompare(b.title))
      }else if(currCheckedSortBy === "Alphabetically, Z-A"){
         filteredProducts =[...filteredProducts].sort((a,b) => b.title.localeCompare(a.title))
      }else if(currCheckedSortBy === "Price, low to high"){
         filteredProducts = [...filteredProducts].sort((a,b) => a.price - b.price)
      }else if(currCheckedSortBy === "Price, high to low"){
         filteredProducts = [...filteredProducts].sort((a,b) => b.price - a.price)
      }else if(currCheckedSortBy === "Date, old to new"){
         filteredProducts = [...filteredProducts].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
      }else if(currCheckedSortBy === "Date, new to old"){
         filteredProducts = [...filteredProducts].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
      }
  
      // console.log("checkedSizeIds", checkedSizeIds)

      return isRemoveAllFiltersClicked ? products : filteredProducts
  },[products, currCheckedAvailability, currCheckedSizes, currCheckedColors, filteredPrices, isRemoveAllFiltersClicked, currCheckedSortBy]);

//   const dropdownButtonRef = useRef(null);
//   console.log("dropdownButtonRef", dropdownButtonRef);
//   console.log("dropdownButtonRef.current?.parentElement.id: ", dropdownButtonRef.current?.parentElement.id);
//   const dropdownButtonRefs = useRef([]);
//   console.log(dropdownButtonRefs.current[2]?.getBoundingClientRect())


  const filters = [
    { id: "availability", title: "Availability"},
    { id: "price", title: "Price"},
    { id: "size", title: "Size"},
    { id: "colour", title: "Colour"},
  ];
  const sortBys = [
      {id: "feature", title: "Feature"},
      {id: "best-selling", title: "Best selling" },
      {id: "alphabetically-a-z" , title:"Alphabetically, A-Z" },
      {id: "alphabetically-z-a", title: "Alphabetically, Z-A"},
      {id: "price-low-to-high", title: "Price, low to high" },
      {id: "price-high-to-low", title: "Price, high to low"},
      {id: "date-old-to-new", title: "Date, old to new"},
      {id: "date-new-to-old", title: "Date, new to old"},
  ]

//   const filterDropdownRefs = useRef({})
//   let element = ""
   // const element = filterDropdownRefs.current[currFilter.id]   

   const dropdownRef = useRef(null)
   
   // if user clicks what is not the same as the current 
   const handleNonActiveFilterDropdown = (event) => {
      // event.stopPropagation()
   //   const element = filterDropdownRefs.current[activeDropdown.id]   
   //   console.log("element", element)
      console.log("handleNonActiveFilterDropdown(event)", event.target.parentElement); //gives me a button, sometimes it gives me an svg ?????
      // console.log(event.target.hasAttribute())
      console.log(event.target.id)
      // console.log("event.target", event.target)
      // console.log("event.target", event.target.parentElement)
      console.log("activeDropdown", activeDropdown)
      // console.log(event.target === activeDropdown)
      // console.log(element)
      // console.log(event.target?.parentElement?.id === element.id)
      // console.log(event.target?.parentElement?.id)
      // console.log(event.target?.parentElement)
      // setActiveDropdown("")
      // setIsDropdownActive(false)
      // if e.target?.parentElement?.id !== currFilter.id
  }
   useEffect(() => {
      // listen only if a DropDown is active
      // if(!isFilterDropdownActive) return;
      if(!activeDropdown) return;

      const handleOutsideClick  = (event) => {
         const clickedFilterButton = event.target.closest("[data-filter]")
         const clickedInsideDropdown = dropdownRef.current?.contains(event.target)

         if(clickedFilterButton){
            setActiveDropdown(clickedFilterButton.dataset.filter) // switch dropdown
            return
         }
        
         if(!clickedInsideDropdown){
            setActiveDropdown(null)  //close dropdown
         }
      };
      document.addEventListener('click', handleOutsideClick);
      // document.addEventListener('click', handleFilterDropdown);
      return () => document.removeEventListener('click', handleOutsideClick)
      // return () => document.removeEventListener('click', handleFilterDropdown)
  },[activeDropdown])


   //   only one filter can be down at a time
   // 
  const handleFilterDropdown = (event,currFilter) => {

      // const element = filterDropdownRefs.current[currFilter.id]
      // element = filterDropdownRefs.current[currFilter.id]
      // setElement(filterDropdownRefs.current[currFilter.id])
      // console.log("element id: ", element.id)
      // console.log(first)
      // event.stopPropagation()
      console.log("currFilter",currFilter)
      console.log("event",event)
      //  setIsDropdownActive(!isFilterDropdownActive);
      // setIsDropdownActive(true);
      // setActiveDropdown(currFilter.title)
      setActiveDropdown(prev => 
         prev  === currFilter.id ? null : currFilter.id
      )
  };

    const handleRemoveAllFilters = () => {
   //   setIsDropdownActive(false);
      // setActiveDropdown('');
      setActiveDropdown(null);
      setIsRemoveAllFiltersClicked(true)
      setCurrCheckedColors(prevCheckedColors => prevCheckedColors.map(prevCheckedColor => {
         return {...prevCheckedColor, isChecked: false}
      }))
      setCurrCheckedSizes(prevCheckedSizes => prevCheckedSizes.map(prevCheckedSize => {
         return {...prevCheckedSize, isChecked: false}
      }))

      setCurrCheckedAvailability(null)
      setPriceRanges([
         {id: "from", title:"From", value:""},
         {id: "to", title: "To", value:""}
      ])
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
      // console.log("data from child component:", data)
      setFilteredPrices(data);
  }

  const handleRemovePriceFilter = () => {
      // setPriceRanges(prevPriceRanges)
      setPriceRanges([
         {id: "from", title:"From", value:""},
         {id: "to", title: "To", value:""}
      ])
  }

  const handleSortByCLick = (sortBy) =>{
      // setCurrClickedSortBy(sortById)
      setCurrCheckedSortBy(sortBy.title)
  }

   //  this is only for mobile screen 
  const handleFilterAndSortClick = () => {
   setIsFilterAndSortClicked(!isFilterAndSortClicked)
  }
   // set the dropDropdowns inactive before the user sees result of removed filters


  if (isLoading) return <p>Loading products...</p>
  if (error) return <p>Failed to load products</p>
  
  return (
   <div className='w-full'>
      <h1 className='m-4 text-3xl'>Products</h1>

      {/* mobile device screens */}
      <div className='md:hidden m-4 flex justify-between '>
         <div className='flex gap-x-2   '>
            <button onClick={handleFilterAndSortClick} className='cursor-pointer'>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M6 1a3 3 0 0 0-2.83 2H0v2h3.17a3.001 3.001 0 0 0 5.66 0H16V3H8.83A3 3 0 0 0 6 1M5 4a1 1 0 1 1 2 0a1 1 0 0 1-2 0m5 5a3 3 0 0 0-2.83 2H0v2h7.17a3.001 3.001 0 0 0 5.66 0H16v-2h-3.17A3 3 0 0 0 10 9m-1 3a1 1 0 1 1 2 0a1 1 0 0 1-2 0"/></svg>
            </button>
            <p>Filter  and Sort</p>
         </div>
         <div>
            {displayedProducts.length} products
         </div>

      </div>

      {/* medium device screens */}
      <div className='hidden md:flex justify-between items-center '>
         <div className='m-4 flex w-fit'>
            <div className=''>
               <div className=' '>
                  <div className='flex  gap-1'>
                     <p>Filter: </p>
                     {filters.map((filter, index) => (
                     <div
                        id={filter.id} 
                        key={filter.id} 
                        // ref={element => {
                        //       if(element) filterDropdownRefs.current[filter.id] = element;
                        //    }}
                        // ref={el => {
                        //       if(el) filterDropdownRefs.current[filter.id] = el;
                        //    }}
                        // ref={dropdownRef}
                        className='flex'
                     >
                        <p>{filter.title}</p>

                        {/* {(isFilterDropdownActive === false || activeDropdown !== filter.title) && ( */}
                        {/* {activeDropdown !== filter.title && ( */}
                        {activeDropdown !== filter.id && (
                        <button
                           // id={filter.id}
                           data-filter={filter.id}
                           onClick={(e) => handleFilterDropdown(e, filter)}
                           // ref={dropdownButtonRef}
                           // ref={element => (dropdownButtonRefs.current[index] = element)}
                           // ref={element => {
                           //    if(element) dropdownButtonRefs.current[filter.id] = element
                           // }}
                           // ref={element => (dropdownButtonRefs.current[index] = element)}
                           className='cursor-pointer'
                        >{/* down arrow icon*/}
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42" /></svg>
                        </button>
                        )}
                        {/* {(isFilterDropdownActive === true && activeDropdown === filter.title) && ( */}
                        {/* {activeDropdown === filter.title && ( */}
                        {activeDropdown === filter.id && (
                        <button
                           onClick={(e) => handleFilterDropdown(e, filter)}
                           data-filter={filter.id}
                           className='cursor-pointer'
                        >{/* up arrow icon */}
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m12.354 5.646l5 5a.5.5 0 0 1-.708.708L12.5 7.207V18a.5.5 0 0 1-1 0V7.207l-4.146 4.147a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708 0" /></svg>
                        </button>
                        )}
                     </div>
                  ))}
                  </div>
               </div>
            </div>      
      </div>

      <div>
         <div className=' flex relative gap-x-3 items-center min-w-100  '>
            <p>Sort by: </p>
            <div className={` flex justify-between  ${isSortByClicked && "border-2  border-gray-500"} min-w-43 py-1 px-2 `}>
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
            </div>

            <p>{displayedProducts.length} products</p>
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

               {(currCheckedAvailability || currCheckedSizes.some(s => s.isChecked) || currCheckedColors.some(c => c.isChecked) || priceRanges.some(priceRange => priceRange.value !== "")) && (
                  <div>
                     <button 
                        onClick={handleRemoveAllFilters}
                        className='block underline cursor-pointer mx-1'
                     >remove all</button>
                  </div>
               )}
         </div>


        {/* <div className='grid align-center grid-cols-4 gap-4 md:m-0 p-2 md:p-0  md:m-4 space-x-2 md:space-x-0  w-fit'> */}
        <div className='grid relative align-center grid-cols-2 md:grid-cols-4 gap-4 md:m-0 p-2 md:p-0  md:m-4 space-x-2 md:space-x-0  '>
          {displayedProducts.length ? (
            displayedProducts.map(product => (
            <Card
              key={product.id}
              title={product.title}
            //   discount={product.discount}
              images={product.images[0]}
              slug={product.slug} 
            //   rating={product.rating}
              sizes={product.sizes}
            //   inStock={product.inStock}
            //   colors={product.colors}
              price={product.price}
              createdAt={new Date(product.createdAt).toLocaleDateString("en-GB", {
               day: "2-digit",
               month: "long",
               year: "numeric"
              })}
            />
          ))
          ) : (
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

            {/* {(activeDropdown !== "") && ( */}
            {(activeDropdown) && (
               <div
                  ref={dropdownRef}
                  className='absolute bg-white border p-5'
               >
                  {/* {activeDropdown === "Availability" && ( */}
                  {activeDropdown === "availability" && (
                     <AvailabilityBar
                        currCheckedAvailability={currCheckedAvailability}
                        setCurrCheckedAvailability={setCurrCheckedAvailability}
                        // availabilityOptions={availabilityOptions}
                        products={products}
                     />
                  )}
                  {/* // {activeDropdown === "Price" && ( */}
                  {activeDropdown === "price" && (
                     <PriceBar
                        priceRanges={priceRanges}
                        setPriceRanges={setPriceRanges}
                        products={products}
                        // sendDataToParent={handleDataFromChild}
                        setFilteredPrices={setFilteredPrices}
                        highestPrice={highestPrice}

                     />
                  )}
                  {/* {activeDropdown === "Size" && ( */}
                  {activeDropdown === "size" && (
                     <SizeBar
                        currCheckedSizes={currCheckedSizes}
                        setCurrCheckedSizes={setCurrCheckedSizes}
                     />
                  )}
                  {/* {activeDropdown === "Colour" && ( */}
                  {activeDropdown === "colour" && (
                     <ColorBar
                        currCheckedColors={currCheckedColors}
                        setCurrCheckedColors={setCurrCheckedColors}
                     />
                  )}
               </div>
            )}

            { isSortByClicked && (
               // <div className='absolute  flex flex-col items-start top-9 left-15  bottom-2 bg-red-400 w-full'>
               <div className='absolute  flex flex-col  right-40 border top-0  bg-red-400'>
                  {isSortByClicked && sortBys.map(sortBy => 
                     <button key={sortBy.title} onClick={() => handleSortByCLick(sortBy)} className='flex items-start     bg-white hover:bg-blue-400 hover:text-white'>
                     {sortBy.title}
                     </button> 
                  )}
               </div>
            )}
         </div>
        <hr />
      </div>

    </div>
  )
}

export default ShopAll