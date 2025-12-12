import { data } from  '../../data.js'
import SearchBar from '../components/ui/SearchBar.jsx'
import { useState, useEffect, useRef } from 'react';
import CategoryIcon from '../components/ui/CategoryIcon.jsx';
import { useCategory } from '../context/CategoryContext.jsx';


// search bar
// filter icon
// sort dropdown: by New Arrivals, color, size, date released
// filer dropdown: by brand, price
// categories filter
// 
// 
// console.log("data length", data.length)

// could i have left this for loop and access it from here????
// for(let i = 0; i < data.length; i++){

// }

function ShopAll() {

  const [searchValue,setSearchValue] = useState('');
  const [displayedProducts,setDisplayedProducts] = useState(data);
  const [isFilterDropdownActive, setIsDropdownActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');

  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  // const [currCheckedAvailability, setCurrCheckedAvailability] = useState("");
  const [currCheckedAvailability, setCurrCheckedAvailability] = useState(null);

  const [isInStockChecked, setIsInStockChecked] = useState(false);
  const [isOutOfStockChecked, setIsOutOfStockChecked] = useState(false);
  // const [currFilterDropdown, setCurrFilterDropdown] = useState("");

  // const [isAvailabilityActive, setIsAvailabilityActive] = useState(false);
  // const [isPriceActive, setIsPriceActive] = useState(false);
  // const [isSizeActive, setIsSizeActive] = useState(false);
  // const [isColourActive, setIsColourActive] = useState(false);

  // useEffect(() => {

  //   const handleClickOutside = (e) => {
  //     console.log(e)
  //   }

  //   document.addEventListener("click", handleClickOutside);


  //   return () => document.removeEventListener("click", handleClickOutside);
  // },[]);


  // const dropdownDivRef = useRef(null);
  const dropdownDivRef = useRef(null);
  // console.log("dropdownDivRef: ", dropdownDivRef.current.textContent);
  // console.log("dropdownDivRef: ", dropdownDivRef);
  // console.log("dropdownDivRef: ", dropdownDivRef.current?.textContent || false);

  const dropdownButtonRef = useRef(null);
  // console.log("dropdownButtonRef", dropdownButtonRef);



  const handleSearch = (searchValue) => {
    if(!searchValue){
      setDisplayedProducts(data);
    }else{
      const filteredProducts = data.filter((d) => 
      d.title.toLowerCase().includes(searchValue.toLowerCase()));

      setDisplayedProducts(filteredProducts);
    }
  };

  const handleCategoryChange = (e) => {

  };

  const filters = [
    { id: "availability", title: "Availability"},
    { id: "price", title: "Price"},
    { id: "size", title: "Size"},
    { id: "colour", title: "Colour"},
  ];

  // the dropDown will lose focus if we click something aside from the current dropdown
  // useRef to capture the item that was clicked
  // event listener for click for anything not equal to the  current dropdown


  // for(let i = 0; i < data.length; i++){
    
  // }

  const handleDisplayedProducts = () => {
    
  };


  const productsInStock = data.filter((d) => d.inStock === true);
  const productsOutOfStock = data.filter((d) => d.inStock === false);
  // const productsOutOfStock = data.length - productsInStock.length;
  
  // console.log("productsInStock", productsInStock.length)
  // console.log("productsInStock", productsOutOfStock.length)

  

  const handleFilterDropdown = (event,currFilter) => {
    // console.log(currFilter)


    // dropdownDivRef.current = 

    setIsDropdownActive(!isFilterDropdownActive);
    
    setActiveDropdown(currFilter.title)
    console.log(currFilter.title);
  };


  const handleSubmitAvailability = (event, availabilityId) => {
    
    // setCurrCheckedAvailability(event.target.name)

    // setIsAvailabilityChecked(true);

    // setDisplayedProducts()
    // setIsAvailabilityChecked(!isAvailabilityChecked);

    // console.log("e.target.name", e.target.name)

    // console.log("e.target.value", event.target.value)
    // console.log("isAvailabilityChecked", isAvailabilityChecked)
    // console.log("currCheckedAvailability", currCheckedAvailability)

    // return e.target.name
  }

  useEffect(() => {
    console.log("currCheckedAvailability", currCheckedAvailability);
    console.log("setIsAvailabilityChecked", isAvailabilityChecked)

    // if(!currCheckedAvailability){
    if(currCheckedAvailability){
      // if (displayedProducts === productsInStock) {
        // setCurrCheckedAvailability('');
        // set
      // }

      if (isInStockChecked && currCheckedAvailability === "inStock") {
        // console.log("!productsInStock", !productsInStock)
        setDisplayedProducts(productsInStock)
        // return
      }
      
      if (currCheckedAvailability === "outOfStock") {
        setDisplayedProducts(productsOutOfStock)
      }
    }
    // setDisplayedProducts()

  // },[isAvailabilityChecked, currCheckedAvailability]);
  }, [isAvailabilityChecked, currCheckedAvailability, isInStockChecked, isOutOfStockChecked]);

  const handleAvailabilityOnChange = (event, availabilityId) => {
    setIsAvailabilityChecked(true);
    // setCurrCheckedAvailability(event.target.name)
    setCurrCheckedAvailability(availabilityId);


    // if(availabilityId === "inStock"){
    //   console.log("availabilityId is inStock", availabilityId)
    //   setIsInStockChecked(!isInStockChecked);
    // }
    if(availabilityId === "inStock" && currCheckedAvailability === availabilityId){
      console.log("availabilityId is inStock", availabilityId)
      setCurrCheckedAvailability(null);
      setIsAvailabilityChecked(false)
      setIsInStockChecked(false);
      return
    }

    if(availabilityId === "inStock" && currCheckedAvailability !== availabilityId){
      console.log("availabilityId is inStock", availabilityId)
      setCurrCheckedAvailability(availabilityId);
      setIsAvailabilityChecked(true)
      setIsInStockChecked(true);
      return
    }

    // handle out of stock
    // if(availabilityId === "outOfStock"){
    //   console.log("availabilityId", availabilityId);
    //   setIsOutOfStockChecked(!isOutOfStockChecked);
    // }
    if(availabilityId === "outOfStock" && currCheckedAvailability === availabilityId){
      console.log("availabilityId", availabilityId);
      setCurrCheckedAvailability(null);
      setIsAvailabilityChecked(false)
      setIsOutOfStockChecked(false);
      return
    }

    if(availabilityId === "outOfStock" && currCheckedAvailability !== availabilityId){
      console.log("availabilityId", availabilityId);
      setCurrCheckedAvailability(availabilityId);
      setIsAvailabilityChecked(true)
      setIsOutOfStockChecked(true);
      return
    }

  };

  // useEffect(() => {
  //   setIsAvailabilityChecked(!isAvailabilityChecked);
  //   setCurrCheckedAvailability(eTargetName);

  //   console.log("isAvailabilityChecked", isAvailabilityChecked)
  //   console.log("currCheckedAvailability", currCheckedAvailability)

  // // }, [handleSubmitAvailability])
  // }, [eTargetName])

  const availabilityOptions = [
    { id: "inStock", title: "In Stock"},
    { id: "outOfStock", title: "Out of Stock" }
  ];

  function AvailabilityBar(){
    return (
      <div>
        {/* AvailabilityBar */}
        <form onSubmit={handleSubmitAvailability}>

          <div>
            {availabilityOptions.map((availability) => 
              <div key={availability.id}>
                <input
                  // type="checkbox"
                  type='checkbox'
                  // type={availability.id === currCheckedAvailability && "checkbox"}
                  name={availability.id}
                  id={availability.id}
                  // onChange={(e) => handleSubmitAvailability(e, availability.id)}
                  onChange={(e) => handleAvailabilityOnChange(e, availability.id)}
                  checked={availability.id === currCheckedAvailability}
                  // checked={
                    // if(availability.id === "inStock" && isInStockChecked) return 
                    
                  // }
                  // checked={availability.id === "outOfStock" && isOutOfStockChecked}
                  //  value={availability.id === currCheckedAvailability && 'on'}
                  //  value={availability.id === currCheckedAvailability ? 'on' : 'off'}
                  //  value={availability.id !== currCheckedAvailability ? 'off' : 'on'}
                  // disabled={ isAvailabilityChecked && availability.id !== currCheckedAvailability}
                  // disabled={availability.id !== currCheckedAvailability || isAvailabilityChecked}
                  // disabled={availability.id === currCheckedAvailability || isAvailabilityChecked}
                />
                <label htmlFor={availability.id}>{availability.title} 
                  ({ availability.id === "inStock" ? productsInStock.length : productsOutOfStock.length})
                </label>
              </div>
            )}
          </div>

          {/* <input type="checkbox" name="" id=""  value="In Stock"/> */}
          {/* <div>
            <input 
              type="checkbox"
              name="inStock" 
              id="inStock"
              onChange={handleSubmitAvailability}
              disabled={} />
            <label htmlFor="inStock">In Stock ({productsInStock.length})</label>
          </div>
          <div>
            <input 
              type="checkbox"
              name="outOfStock"
              id="outOfStock" 
              onChange={handleSubmitAvailability} />
            <label htmlFor="inStock">Out of Stock({productsOutOfStock.length})</label>
          </div> */}
        </form>

      </div>
    );
  }

  function PriceBar(){
    return (
      <div>PriceBar

      </div>
    );
  }

  function SizeBar(){
    return (
      <div>SizeBar

      </div>
    );
  }

  function ColourBar(){
    return (
      <div>ColourBar

      </div>
    );
  }


  
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
                  ref={dropdownDivRef}
                >
                  <div>
                    <p>{filter.title}</p>
                  </div>


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

                  {/* {if(currFilter.title === "a" )} */}
                  {/* {currFilter.title === "Availability" && ( */}
                  {/* {currFilterDropdown === "Availability" && ( */}
                  {/* {activeDropdown === "Availability" && (
                <AvailabilityBar />
              )} */}

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