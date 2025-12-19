// import { data } from  '../../data.js'
import { useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../mock/product.js';
import Card from '../components/ui/Card.jsx';

// search bar
// filter icon
// sort dropdown: by New Arrivals, color, size, date released
// filer dropdown: by brand, price
// categories filter


function ShopAll() {
  // what else can i destructure from my useQuery?????????
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })


  // const [displayedProducts,setDisplayedProducts] = useState(data);
  const [displayedProducts,setDisplayedProducts] = useState([]);
  // const [displayedProducts,setDisplayedProducts] = useState([
  //   data, currCheckedAvailability, currCheckedSizes
  // ]);

  const [isFilterDropdownActive, setIsDropdownActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');

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

  // useEffect(() => {
  //   if(data) setDisplayedProducts(data);
  // },[data]);

  const products = data || []
  
  // const checkedSizeIds = currCheckedSizes
  // .filter(currCheckedSize => currCheckedSize.isChecked)
  // .map(currCheckedSize => currCheckedSize.id);

  const checkedSizeIds = useMemo(() => {
    return currCheckedSizes
    .filter(currCheckedSize => currCheckedSize.isChecked)
    .map(currCheckedSize => currCheckedSize.id);
  },[currCheckedSizes])
  // const checkedSizeIds = () => {
  //   return currCheckedSizes
  //   .filter(size => size.isChecked)
  //   .map(size => size.id);

  // }

  // useEffect(() => {
  //   if(products) setDisplayedProducts(products);
  // },[products]);

  useEffect(() => {
    if(!products.length) return;


    // if(checkedSizeIds === 0){
    if(!checkedSizeIds.length){
      setDisplayedProducts(products);
      return
    }

    console.log("checkedSizeIds", checkedSizeIds)

    const filteredCheckedSizes = products.filter(product => 
      product.sizes.some(productSize => 
        checkedSizeIds.includes(productSize)
      )
    );
    
    setDisplayedProducts(filteredCheckedSizes)

  },[checkedSizeIds, products]);
  // const [newDisplayedProducts, setNewDisplayedProducts] = useState([]);  const products = data || []




  // const dropdownDivRef = useRef(null);
  const dropdownDivRef = useRef(null);
  // console.log("dropdownDivRef: ", dropdownDivRef.current.textContent);
  // console.log("dropdownDivRef: ", dropdownDivRef);
  // console.log("dropdownDivRef: ", dropdownDivRef.current?.textContent || false);

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
    // {id:"xs", title:"XS"},
    // {id:"s", title:"S"},
    // {id:"m", title:"M"},
    // {id:"l", title:"L"},
    // {id:"xl", title:"XL"},
    // {id:"xxl", title:"XXL"},
    // {id:"xxxl", title:"XXXL"},

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
    // console.log(currFilter)
    // dropdownDivRef.current = 
    setIsDropdownActive(!isFilterDropdownActive);
    setActiveDropdown(currFilter.title)
    console.log(currFilter.title);
  };


  // const productsInStock = data.filter(d => d.inStock === true);
  // const productsOutOfStock = data.filter(d => d.inStock === false);
  const productsInStock = products.filter(product => product.inStock === true);
  const productsOutOfStock = products.filter(product => product.inStock === false);

  const handleAvailabilityChange = (event, availabilityId) => {
    const newAvailability = currCheckedAvailability === availabilityId ? null : availabilityId;
    setCurrCheckedAvailability(newAvailability);


    // we may need the spread operator to get previous displayed products and add this new one to it
    if(newAvailability === "inStock"){
      setDisplayedProducts(productsInStock);
      console.log("displayedProducts", productsInStock)
      // setDisplayedProducts(productsInStock || currCheckedSizes);
    }else if(newAvailability === "outOfStock"){
      setDisplayedProducts(productsOutOfStock);
      console.log("displayedProducts", productsOutOfStock)
    // }else setDisplayedProducts(data)
    }else setDisplayedProducts(products)
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
              // onClick={(e) => handleAvailabilityOnClick(e, availability.id)}
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

  // useEffect only handles displaying products based on sizes selected
  // useEffect(() => {
  //   if(currCheckedSizes){
  //   // if (currCheckedAvailability && currCheckedSizes.length){
  //     console.log("currCheckedSizes.length is > 0") ;

  //   }else setDisplayedProducts(data);

  // }, [isSizeChecked, currClickedSize, currCheckedSizes]);

  // const handleSizeOnClick = (event, sizeId) => {
  //   console.log("handleSizeOnClick event:", event, "handleSizeOnClick sizeId", sizeId);

  //   setIsSizeClicked(true);
  //   setCurrClickedSize(sizeId);

  //   // if(sizeId === 'xs' && currCheckedSizes)
  //   if (!currCheckedSizes.length) return console.log("!currCheckedSizes.length")
  //   for(let i = 0; i < currCheckedSizes.length; i++){
  //     if(currCheckedSizes[i] === "xs" ) console.log("xs")
  //   }
  // };

  // currCheckedSizes.array.forEach(element => {
    
  // });
  // const currCheckedSizes.forEach(currSize => {



    // console.log("currSize", currSize)
  // });

  const handleSizeChange = (event, sizeId) => {

    // console.log("sizeId",sizeId)
    // newSize = 
    // for(let i = 0; i < currCheckedSizes.length; i++){
      // console.log("currCheckedSizes[i]", currCheckedSizes[i])
      // if(currCheckedSizes[i].id === sizeId){
        // setCurrCheckedSizes((prevCheckedSizes) => [...prevCheckedSizes, ])
        // setCurrCheckedSizes((prevCheckedSizes) => {
          
        // })
        // updating objects within an array. show where this is explained in the react docs
      
    // setCurrCheckedSizes((prevCheckedSizes) => {//[...prevCheckedSizes, { 
      
    //   // return prevCheckedSizes.map((prevCheckedSize) => {
    //   // returning the new array
    //   return prevCheckedSizes?.map((prevCheckedSize) => {
    //     // console.log("prevCheckedSize", prevCheckedSize)   

    //     if(prevCheckedSize.id === sizeId){
    //       // console.log("prevCheckedSize.id === sizeId", prevCheckedSize.id === sizeId);
    //       // return a new object with updated value
    //       return {...prevCheckedSize, isChecked: !prevCheckedSize.isChecked} 
    //     // prevCheckedSize.id === sizeId ? {...prevCheckedSize, isChecked: !prevCheckedSize.isChecked} : prevCheckedSize
    //     // prevCheckedSize.id === sizeId && {...prevCheckedSize, isChecked: !prevCheckedSize.isChecked}
    //     }//else console.log("prevCheckedSize.id !== sizeId", prevCheckedSize.id === sizeId);
    //     return prevCheckedSize;
    //   });
    // });

    setCurrCheckedSizes(prevCheckedSize => prevCheckedSize.map(size => size.id === sizeId
        ? {...size, isChecked: !size.isChecked} : size
    ))

    // to compare each .sizes of prevCheckedSizes with the .id and .isChecked of currCheckedSizes
    // we filter prevCheckedSizes
    // show the freeeCodeCamp article i learnt that taught me how................
    // how to compare to arrays of objects
    // setDisplayedProducts((prevDisplayedProducts) => { 
    //   console.log("prevDisplayedProducts",prevDisplayedProducts);

    //   const filtered = prevDisplayedProducts.filter(prevDisplayedProduct => 
    //     // prevDisplayedProduct.sizes.some((size) => size === )))
    //     // currCheckedSizes.some((currCheckedSize) => currCheckedSize.sizes.includes())))
    //     // prevDisplayedProduct.sizes.includes())
    //     // currCheckedSizes.some((currCheckedSize) => prevDisplayedProduct.sizes.includes(currCheckedSize.id)));
    //     // currCheckedSizes.some((currCheckedSize) => prevDisplayedProduct.sizes.some(size => size === currCheckedSize.id)));

    //     // const newArray

    //     // if(currCheckedSizes.some(currCheckedSize => prevDisplayedProduct.sizes.includes(currCheckedSize.id))){
    //     //   return 
    //     // };
    //     currCheckedSizes.some(currCheckedSize => {
    //       prevDisplayedProduct.sizes.includes(currCheckedSize.id)
    //       // prevDisplayedProduct.sizes.includes(currCheckedSize.id || " ")
    //       console.log("prevDisplayedProduct.sizes.includes(currCheckedSize.id)", prevDisplayedProduct.sizes.includes(currCheckedSize.id))
              
    //       // return true
    //     }) ? prevDisplayedProduct : []

    //     // currCheckedAvailability
    //   );

    //   // currCheckedSizes.some(currCheckedSize => currCheckedSize.id === prevDisplayedProduct.id))
    //   console.log("filtered", filtered);

    //   // const mapped = prevDisplayedProducts.map((prevDisplayedProduct) => {
    //   //   mapped
    //   //     // currCheckedSizes
    //   //   return 
    //   // })

    //   return []
    // })

    // console.log("currCheckedSizes", currCheckedSizes)
        // setCurrCheckedSizes((prevCheckedSizes) => [...prevCheckedSizes, {}]
          // !prevCheckedSizes[i].isChecked
        // }]
      // }
    // }
  };
  // currCheckedSizes.some(currCheckedSize => {
  //   console.log("currCheckedSizes.some", currCheckedSize)
  //   return currCheckedSize.isChecked
  // })
  function SizeBar(){
    return (
      <div>{sizeOptions.map((size) => 
        <div key={size.id}>
          <input
            type='checkbox'
            name={size.id}
            id={size.id}
            // checked={size.id === currCheckedSizes}
            // checked={currCheckedSizes.some( currCheckedSize => currCheckedSize.id === size.id)}
            // checked={currCheckedSizes.some( currCheckedSize => (currCheckedSize.id === size.id && currCheckedSize.isChecked))}
            checked={
              currCheckedSizes?.some(currCheckedSize => {
                // console.log("currCheckedSize.id === size.id && currCheckedSize.isChecked", currCheckedSize.id === size.id && currCheckedSize.isChecked)
                return currCheckedSize.id === size.id && currCheckedSize.isChecked
  
              })
              // const checkedSizes = currCheckedSizes.filter(currCheckedSize => 
              //   currCheckedSize.isChecked === true  
              // )
              // for(let i = 0; i < checkedSizes.length; i++){

              // for(let i = 0; i < currCheckedSizes.length; i++){
                // if(currCheckedSizes[i].id === size.id && currCheckedSizes[i].isChecked){
                  // return true
                // }
              // }
              // const isSizeChecked = currCheckedSizes.forEach(currCheckedSize => {
              // return currCheckedSizes.forEach(currCheckedSize => //{
              // return currCheckedSizes.some(currCheckedSize => //{
              //   // if(currCheckedSize.id === size.id && currCheckedSize.isChecked) return true
              //   currCheckedSize.id === size.id && currCheckedSize.isChecked
              // // }
              // )


            }
            // onClick={(e) => handleSizeOnClick(e, size.id)}
            
            // .filter the ones that are isChecked
            //  then map through the id of isChecked to see if any matches size.id
            onChange={(e) => handleSizeChange(e, size.id)}
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
                  // ref={dropdownDivRef}
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
      <div className='grid grid-cols-4 space-x-2 m-4'
      >{displayedProducts.map((d,i) => (
        <div key={d.title}>
          <img className='w-24 h-24 md:w-full md:h-full' src={d.images} alt={d.title} />
          <div className='md:text-2xl'>{d.title}</div>
          <div className='md:text-2xl'>{d.rating}</div>
          <div>{d.percentageDiscount}</div>

        </div>
      ))}</div>

    </div>
  )
}

export default ShopAll