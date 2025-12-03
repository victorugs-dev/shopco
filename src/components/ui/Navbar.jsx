import React from 'react'
import { useState,useCallback } from 'react';
import { NavLink,Link } from 'react-router';
import Input from './Input'
import { useTheme } from '../../context/ThemeContext';
import { data } from '../../../data';
// <<<<<<< HEAD
import SearchBar from './SearchBar';
// =======
// >>>>>>> origin/main

function Navbar() {
  const [userSearch, setUserSearch] = useState('');
  const [theme, toggleTheme] = useTheme();
  const [isDropdownActive,setIsDropdownActive] = useState(false);
 
  const list = [
    {
      title: "Shop",
      url: "/",
      isDropdown: true,
    },
    {
      title: "On-Sale",
      url: "/on-sale",
      isDropdown: false,
    },
    {
      title: "New Arrivals",
      url: "/new-arrivals",
      isDropdown: false,
    },
    {
      title: "Brands",
      url: "/brands",
      isDropdown: false,
    },
  ];

  const handleDropdown = () => setIsDropdownActive(!isDropdownActive);

// <<<<<<< HEAD
  // const findSearchMatch = () => {
  //   return data.map((d, i) => (
  //     d.title.toLowerCase().includes(userSearch) ? (
  //       { item: d, index: i }
  //     ) : null
  //   )).filter(f => f !== null);
  // };
// =======
//   const findSearchMatch = () => {
//     return data.map((d, i) => (
//       d.title.toLowerCase().includes(userSearch) ? (
//         { item: d, index: i }
//       ) : null
//     )).filter(f => f !== null);
//   };
// >>>>>>> origin/main

//   const my =  data.map((d,i) => (
//     d.title.includes('shirt') ? (
//       {item: d, index: i}
//     ) : null
//   )).filter(f => f !== null)
// console.log(my)

  // console.log(matchSearch)


// <<<<<<< HEAD
  // const handleSearchBarChange = (e) => {
  //   if(e.target.value.trim()){
  //     setUserSearch(e.target.value.toLowerCase().trim());
  //     console.log(e.target.value);
  //     // findSearchMatch();
  //     console.log(findSearchMatch())
  //   }
  // };
// =======
//   const handleSearchBarChange = (e) => {
//     if(e.target.value.trim()){
//       setUserSearch(e.target.value.toLowerCase().trim());
//       console.log(e.target.value);
//       // findSearchMatch();
//       console.log(findSearchMatch())
//     }
//   };
// >>>>>>> origin/main
  

  // const handleUserSearch = useCallback((e,userSearch) => {
  //   e.preventDefault();
  //   if(e.key === 'Enter'){
  //     console.log(e.key)
  //   }

  // },[userSearch])


  // const myFilter = data.filter(d => {

  // });
  // const myFilter = data.
  // for(const datum of data){
  //   console.log(datum[0])
  // }

  // const text = 'T-shirt with Tape Details';
  // console.log(text.search(/shirt/g))
  // 2

  // const matchSearch = data.filter(d => {
  //   userSearch === d.title
  // })

  // console.log(matchSearch)
  

  /* we want to search dataset for a match to the userSearch
  title || colors || */
  // display Suggestions side-by-side with the first 5 closest match 
  const handleUserSearch = (e) => {
    e.preventDefault();
    console.log('searching...')
    // findSearchMatch()
    
    // const matchSearch = data.filter(d => {
    //   userSearch === 
    // })

    // const matchSearch = data.findIndex(d => d.title === userSearch)
    
  }
  // const handleOnkeydown = (e) => {
  //   e.preventDefault();
  //   console.log('the onkeydown')
  //   if(e.key === 'Enter'){
  //     // console.log(e.key)
  //     console.log('submitted')
  //   }

  // }


  return (
    <nav className='w-full'>
      <div className='flex justify-between item-center bg-black text-white text-xl p-4'>
        <p className='md:text-3xl'>Sign up and get 20% off to your first order.
        <Link to={'sign-up'} className='underline cursor-pointer' >Sign Up Now</Link></p>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#fff" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg>
      </div>
      <div className='flex relative justify-between items-center'>
        <div className='md:flex space-y-3 md:space-y-0 p-4 md:justify-between  w-full'>
          <h3 className='text-2xl md:text-3xl font-bold'>
            <Link to={"/"}>SHOP.CO</Link> 
          </h3>
          <div className='flex md:gap-x-4'>
            {list.map(l => (
            <div key={l.title} className=''>
              <NavLink
                to={l.url}
                className={({ isActive, isPending }) =>
                  isActive ? "text-black" : "text-gray-400"
                }
              >
                <span className='text-xl'>{l.title}</span>
                {l.isDropdown && (
                <>
                  {isDropdownActive ? (
                    <button onClick={handleDropdown}> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M17.71 11.29a1 1 0 0 0-1.42 0L13 14.59V7a1 1 0 0 0-2 0v7.59l-3.29-3.3a1 1 0 0 0-1.42 1.42l5 5a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l5-5a1 1 0 0 0 0-1.42" /></svg>
                    </button>
                      ) : (
                      <button onClick={handleDropdown}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m12.354 5.646l5 5a.5.5 0 0 1-.708.708L12.5 7.207V18a.5.5 0 0 1-1 0V7.207l-4.146 4.147a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708 0"/></svg></button>
                  )}
                  {isDropdownActive && (
                    <div className='text-sm absolute top-7 md:text-2xl'>
                      <div>Formal</div>
                      <div>Casual</div>
                    </div>
                  )}  
                </>
              )}
              </NavLink>
            </div>
          ))}
          </div>
          <button onClick={toggleTheme} className={['rounded-full px-4 py-2 ', 
            theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'].join('')}>
             {theme === 'light' ? 'dark' : 'light'} 
          </button>

          {/* <div className='flex space-x-4 justify-between'> */}
            {/* <div className='flex items-center rounded-full p-2 bg-gray-200 w-full' >
              <form onSubmit={handleUserSearch}
                className='flex gap p-2'>
                 <input 
                  className='w-full'
                  // placeholder='Find outfits that match your taste'                  
                  placeholder='Find your perfect outfit'
                  onChange={handleSearchBarChange}
<<<<<<< HEAD

=======
                  
>>>>>>> origin/main
                /> 
                <button type='submit'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
                </button>
              </form>
            </div>             */}

            <SearchBar 
              text={'Search for products...'}
            
            />


            <div className='flex'>
              <Link to='cart-page'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>
              
              </Link>
              <Link to='user-profile'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20zm2-2h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0 8"/></svg>
              </Link>
            </div>
          {/* </div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar