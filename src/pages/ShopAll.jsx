import { data } from  '../../data.js'
import SearchBar from '../components/ui/SearchBar.jsx'
import { useState } from 'react';
import CategoryIcon from '../components/ui/CategoryIcon.jsx';
import { useCategory } from '../context/CategoryContext.jsx';


// search bar
// filter icon
// sort dropdown: by New Arrivals, color, size, date released
// filer dropdown: by brand, price
// categories filter
// 
// 

function ShopAll() {

  const [searchValue,setSearchValue] = useState('');
  const [displayedProducts,setDisplayedProducts] = useState(data);
  const [isFilterDropdownActive, setIsDropdownActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [currFilterDropdown, setCurrFilterDropdown] = useState("");

  const [isAvailabilityActive, setIsAvailabilityActive] = useState(false);
  const [isPriceActive, setIsPriceActive] = useState(false);
  const [isSizeActive, setIsSizeActive] = useState(false);
  const [isColourActive, setIsColourActive] = useState(false);

  // const allProducts = 
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
    { id: "price", title: "price"},
    { id: "size", title: "Size"},
    { id: "colour", title: "Colour"},
  ]

  const handleFilterDropdown = (event,currFilter) => {
    setIsDropdownActive(!isFilterDropdownActive);
    
    setActiveDropdown(currFilter.title)
    console.log(currFilter.title);
  };

  function AvailabilityBar(){
    return (
      <div>AvailabilityBar

      </div>
    );
  }


  
  return (
    <div>
      {/* cancel icon */}
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#000" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg> */}
      <h1 className='m-4 text-3xl'>Products</h1>
      <div className='m-4'>
        
        <div className='flex'>
          {filters.map((filter) => (
            <div key={filter.id} className='flex'>
              <div>{filter.title}</div>

              {(isFilterDropdownActive === false || activeDropdown !== filter.title)  && (

                <button
                 onClick={(e) => handleFilterDropdown(e,filter)}
                 className='cursor-pointer'
                 >{/* down arrow icon*/}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42" /></svg>
                </button>
              )}
              
              {(isFilterDropdownActive === true && activeDropdown === filter.title) && (
                <button
                 onClick={(e) => handleFilterDropdown(e,filter)}
                 className='cursor-pointer'
                 >{/* up arrow icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m12.354 5.646l5 5a.5.5 0 0 1-.708.708L12.5 7.207V18a.5.5 0 0 1-1 0V7.207l-4.146 4.147a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708 0" /></svg>
                </button>
              )}

              {/* {if(currFilter.title === "a" )} */}
              {currFilter.title === "Availability" && (
                <AvailabilityBar />
              )}

            </div>
          ))}
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