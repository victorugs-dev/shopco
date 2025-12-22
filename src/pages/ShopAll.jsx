import { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../mock/product.js';
import Card from '../components/ui/Card.jsx';

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

  const displayedProducts = useMemo(() => {
    let filteredProducts = products;

    const checkedSizeIds = currCheckedSizes
    .filter(currCheckedSize => currCheckedSize.isChecked)
    .map(currCheckedSize => currCheckedSize.id);

    // the order of the if statements don't matter 

    if(checkedSizeIds.length){
      filteredProducts = filteredProducts.filter(product => 
        product.sizes?.some(size => 
          checkedSizeIds.includes(size)
        )
      );
    }

    if(currCheckedAvailability === 'inStock'){
      filteredProducts = filteredProducts.filter(products => products.inStock)
    }

    if(currCheckedAvailability === 'outOfStock'){
      filteredProducts = filteredProducts.filter(products => !products.inStock)
    }

    console.log("checkedSizeIds", checkedSizeIds)

    return filteredProducts;
  },[products, currCheckedAvailability, currCheckedSizes])

  const dropdownButtonRef = useRef(null);
  // console.log("dropdownButtonRef", dropdownButtonRef);

  const filters = [
    { id: "availability", title: "Availability"},
    { id: "price", title: "Price"},
    { id: "size", title: "Size"},
    { id: "colour", title: "Colour"},
  ];

  const availabilityOptions = [
    { id: "inStock", title: "In Stock"},
    { id: "outOfStock", title: "Out of Stock" }
  ];

  const sizeOptions = [
    {id:"x-small", title:"X-Small"},
    {id:"small", title:"Small"},
    {id:"medium", title:"Medium"},
    {id:"large", title:"Large"},
    {id:"x-large", title:"X-Large"},
    {id:"xx-large", title:"XX-Large"},
    {id:"xxx-large", title:"XXX-Large"},
  ];

  // the dropDown will lose focus if we click something aside from the current dropdown
  // useRef to capture the item that was clicked
  // event listener for click for anything not equal to the  current dropdown

  const handleFilterDropdown = (event,currFilter) => {
    setIsDropdownActive(!isFilterDropdownActive);
    setActiveDropdown(currFilter.title)
    console.log(currFilter.title);
  };


  const productsInStock = products.filter(product => product.inStock === true);
  const productsOutOfStock = products.filter(product => product.inStock === false);

  const handleAvailabilityChange = (event, availabilityId) => {
    setCurrCheckedAvailability(prev => 
      prev === availabilityId ? null : availabilityId
    );

  }

  function AvailabilityBar(){
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

  function PriceBar(){
    return (
      <div>PriceBar

      </div>
    );
  }

  const handleSizeChange = (event, sizeId) => {
    setCurrCheckedSizes(prevCheckedSize => 
      prevCheckedSize.map(size => size.id === sizeId ? {...size, isChecked: !size.isChecked} : size
    ))
  };

  function SizeBar(){
    return (
      <div>{sizeOptions.map((size) => 
        <div key={size.id}>
          <input
            type='checkbox'
            name={size.id}
            id={size.id}
            onChange={(e) => handleSizeChange(e, size.id)}
            checked={
              currCheckedSizes?.some(currCheckedSize => {
                return currCheckedSize.id === size.id && currCheckedSize.isChecked
              })
            }
          />
          <label htmlFor={size.id}>{size.title}
            {/* ({size.id === "inStock" ? productsInStock.length : productsOutOfStock.length}) */}
          </label>
        </div>
      )}

      </div>
    );
  }

  function ColourBar(){
    return (
      <div>ColourBar

      </div>
    );
  }

  if (isLoading) return <p>Loading products...</p>
  if (error) return <p>Failed to load products</p>
  
  return (
    <div>
      {/* cancel icon */}
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#000" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg> */}
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
                  {/* <div> */}
                    <p>{filter.title}</p>
                  {/* </div> */}

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
                <AvailabilityBar />
              )}
              
              {activeDropdown === "Price" && (
                <PriceBar />
              )}
              {activeDropdown === "Size" && (
                <SizeBar />
              )}
              {activeDropdown === "Colour" && (
                <ColourBar />
              )}

              </div>
            </div>
          
          {/* <div> */}
            {/* <label htmlFor="availability">Filter:</label>
            <select name="availability" id="availability">
              <option value={'none'} disabled selected> Availability </option>
            </select>

            <select name="price" id="price">Price
              <option value={'none'} disabled selected>Price</option>
            </select>
            <select name="size" id="size">
              <option value={'none'} disabled selected>Size</option>
            </select>
            <select name="colour" id="colour">
              <option value={'none'} disabled selected>Colour</option>
            </select> */}

          {/* </div> */}
        </div>
        
      </div>

    {/* product Card  */}
      <div className='w-full'>
        <div className='flex gap-1'>
          
        {currCheckedSizes.map(currCheckedSize => 
          currCheckedSize.isChecked && (
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

        {currCheckedAvailability && (
          <div
            className='flex  mx-1 outline px-2 py-1 rounded-2xl  items-center'
          >
           <p >Availability: {currCheckedAvailability === 'inStock' ? 'In stock' : 'Out of stock'}</p>
          <button
              className='cursor-pointer'
              onClick={(e) => handleAvailabilityChange(e,currCheckedAvailability)}
            >
              {/* cancel icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg> 
            </button>
          </div>
        )}
        </div>

        <div className='grid align-center grid-cols-4 gap-4 md:m-0 p-2 md:p-0  md:m-4 space-x-2 md:space-x-0 gap-0 w-fit'>
          {displayedProducts.length ? (
            displayedProducts.map(product => (
            <Card
              key={product.id}
              title={product.title}
              discount={product.discount}
              images={product.images[0]}
              price={product.price}
              slug={product.slug} 
              rating={product.rating}
              sizes={product.sizes}
              inStock={product.inStock}
            />
          ))
          ) : (
            <p>Nothing matches that description</p>
          )}
        </div>
        <hr />
      </div>

    </div>
  )
}

export default ShopAll