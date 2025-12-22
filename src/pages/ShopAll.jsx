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

  // const [displayedProducts,setDisplayedProducts] = useState(products);
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

    // const checkedSizeIds = currCheckedSizes
    // .filter(currCheckedSize => currCheckedSize.isChecked)
    // .map(currCheckedSize => currCheckedSize.id);

    // if(checkedSizeIds.length){
    //   filteredProducts = filteredProducts.filter(product => 
    //     product.sizes?.some(size => 
    //       checkedSizeIds.includes(size)
    //     )
    //   );
    // }

    console.log("checkedSizeIds", checkedSizeIds)

    return filteredProducts;
  },[products, currCheckedAvailability, currCheckedSizes])

  // const checkedSizeIds = useMemo(() => {
  //   return currCheckedSizes
  //   .filter(currCheckedSize => currCheckedSize.isChecked)
  //   .map(currCheckedSize => currCheckedSize.id);
  // },[currCheckedSizes])

  // useEffect(() => {
  //   if(!products.length) return;

  //   //  return to default data if no size is checked
  //   // regardless of the status of other filters
  //   // i may remove this code
  //   // if(!checkedSizeIds.length){
  //   //   setDisplayedProducts(products);
  //   //   return
  //   // }
  //   // if(!checkedSizeIds.length && currCheckedSizes.every(currCheckedSize => currCheckedSize.isChecked === false)){
  //   // if(currCheckedAvailability === null && currCheckedSizes.every(currCheckedSize => currCheckedSize.isChecked === false)){
  //   //  return to default data if no size and Availability is checked
  //   //  
  //   if(currCheckedAvailability === null && currCheckedSizes.every(currCheckedSize => !currCheckedSize.isChecked)){
  //     // console.log(!currCheckedAvailability)
  //     setDisplayedProducts(products);
  //     return
  //   }

  //   console.log("checkedSizeIds", checkedSizeIds)

  //   const filteredCheckedSizes = products.filter(product => {
  //     // console.log("products:", product)
  //     // return product.sizes?.some(productSize => {
  //     const productSizeSome = product.sizes?.some(productSize => {
  //       // console.log("productSize:", productSize)
  //       const includesProductSize =  checkedSizeIds.includes(productSize)
  //       console.log("includesProductSize", includesProductSize)
  //       return includesProductSize
  //       // return checkedSizeIds.includes(productSize)
  //     } )

  //     console.log("productSizeSome", productSizeSome)
  //     return productSizeSome

  //   }
  //   );

  //   console.log("filteredCheckedSizes", filteredCheckedSizes)
  //   // setDisplayedProducts(filteredCheckedSizes)
  //   setDisplayedProducts(prevDisplayedProducts => {
  //     const filtered = prevDisplayedProducts.filter(prevDisplayedProduct => 
  //       filteredCheckedSizes.some(filteredCheckedSize => filteredCheckedSize.slug === prevDisplayedProduct.slug)
  //     )

  //     console.log("filtered", filtered)
  //     return filtered
  //   })
  // },[checkedSizeIds, products]);
  // const [newDisplayedProducts, setNewDisplayedProducts] = useState([]);  const products = data || []


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

  // const handleAvailabilityChange = (event, availabilityId) => {
  const handleAvailabilityChange = (event, availabilityId) => {
    // const newAvailability = currCheckedAvailability === availabilityId ? null : availabilityId;
    // setCurrCheckedAvailability(newAvailability);

    setCurrCheckedAvailability(prev => 
      prev === availabilityId ? null : availabilityId
    );

  }

    //  may need the spread operator to get previous displayed products and add this new one to it???
  //   if(newAvailability === "inStock"){
  //     // setDisplayedProducts(productsInStock);
  //     // setDisplayedProducts(products)

  //     // if(currCheckedAvailability !== null && currCheckedAvailability === "inStock")

  //     // setDisplayedProducts(prevDisplayedProducts => {

  //     //   const filtered = prevDisplayedProducts.filter(prevDisplayedProduct => 
  //     //     productsInStock?.some(product => product.slug === prevDisplayedProduct.slug)
  //     //   )

  //     //   console.log("filtered", filtered)
  //     //   console.log("prevDisplayedProducts", prevDisplayedProducts)
  //     //   console.log("productsInStock", productsInStock)

  //     //   // return productsInStock
  //     //   return filtered
  //     // });
  //     // console.log("productsInStock", productsInStock)
  //   }else if(newAvailability === "outOfStock"){
  //     // setDisplayedProducts(productsOutOfStock);
  //     // console.log("displayedProducts", productsOutOfStock)
  //     // setDisplayedProducts(products)
  //     setDisplayedProducts(prevDisplayedProducts =>  {
  //       const filtered = prevDisplayedProducts.filter(prevDisplayedProduct => 
  //         productsOutOfStock?.some(product => product.slug === prevDisplayedProduct.slug)
  //       )

  //       return filtered
  //     }
  //     )
  //   }else setDisplayedProducts(products)
  // }

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
      {/* <div className='grid grid-cols-4 space-x-2 m-4'
      >{displayedProducts.map((d,i) => (
        <div key={d.title}>
          <img className='w-24 h-24 md:w-full md:h-full' src={d.images} alt={d.title} />
          <p className='md:text-2xl'>{d.title}</p>
          <p className='md:text-2xl'>{d.rating}</p>
          <p>{d.percentageDiscount}</p>
          <div className='flex gap-1'>{d.sizes.map(size => 
            <p key={size}>{size}</p>
          )}</div>

        </div>
      ))}</div> */}

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
                  className=''
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
              className=''
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