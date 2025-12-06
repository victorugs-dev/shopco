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

  
  return (
    <div>
      <h1 className='m-4 text-3xl'>Products</h1>
      <div className='m-4'>
        
        <div className='flex justify-between'>
          {/* <label htmlFor="">Filter: */}
          <div>
            <label htmlFor="availability">Filter:</label>
            <select name="Availability" id="availability">
              <option value={'none'} disabled selected> Availability </option>
            </select>
            {/* </label> */}

          </div>
          {/* <div></div> */}
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