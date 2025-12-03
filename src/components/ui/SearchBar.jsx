// import { useState } from "react";
// // <<<<<<< HEAD
// import { useSearch } from "../../context/SearchContext";
// import { data } from "../../../data";

// export default function SearchBar({ text }){
// // =======
// // import { data } from "../../../data";

// // export default function SearchBar({text, onSearch}){
// // >>>>>>> origin/main


//     // const [userSearch,setUserSearch] = useState('')
//     // // const [searchResult, setSearchResult] = useState([]);

//     const [input,setInput] = useState('');

// // <<<<<<< HEAD
//     const { setSearchQuery, setSearchResults, setIsSearching } = useSearch();

//     // const handleSearch = (e) =>{
//     //     const value = e.target.value;
//     //     setInput(value);
//     //     setSearchQuery(value);

//     //     if(value.trim() === ''){
//     //         setSearchResults([]);
//     //         setIsSearching(false);
//     //         return;
//     //     };

//     //     const filteredProducts = data.filter((d) => 
//     //     d.title.toLowerCase().includes(value.toLowerCase()));

//     //     console.log(filteredProducts)
    
//     //     setSearchResults(filteredProducts);
//     //     setIsSearching(true);
//     // }

//     // live search updates while typing
//     // SearchOverlay only shows if results exist
//     const handleChange = (e) => {
//         const value = e.target.value;
//         console.log(value)
//         setInput(value);
//         setSearchQuery(value);
        
//         if(value.trim() === ''){
//             setIsSearching(false);
//             return
//         }
//         // setIsSearching(true);

//         // const filteredProducts = data.filter((d) => 
//         // d.title.toLowerCase().includes(input.toLowerCase()));

//         // console.log(filteredProducts)
    
//         // setSearchResults(filteredProducts);
//         setIsSearching(true);
//     }

//     const handleSearch = (e) =>{
//         e.preventDefault();
//         // console.log(e)
//         console.log(e.target)
//         // console.log(e.target[0])
//         // const value = e.target.value;
//         // setInput(value);
//         // setSearchQuery(value);

//         // if(value.trim() === ''){
//         //     setSearchResults([]);
//         //     setIsSearching(false);
//         //     return;
//         // };
//         if(input.trim() === ''){
//             setSearchResults([]);
//             setIsSearching(false);
//             return;
//         };

//         const filteredProducts = data.filter((d) => 
//         d.title.toLowerCase().includes(input.toLowerCase()));

//         console.log(filteredProducts)
    
//         setSearchResults(filteredProducts);
//         setIsSearching(true);
//     };


//     // const handleOnkeydown = (e) => {
//     //     if(e.key === 'Enter'){
//     //         onSearch(input);
//     //     }
//     // }

//     return (
//        <form onSubmit={handleSearch}>
//          <div className='flex items-center indent-2 bg-gray-200 p-2 rounded-full w-fit'>
//             <input
//                 placeholder={text}
//                 // value={input}        
//                 // onChange={(e) => setInput(e.target.value)}
//                 // onChange={handleSearch}
//                 onChange={handleChange}

//             />
//             <button type="submit">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
//             </button>
//         </div>
//        </form>
// // =======
// //     const handleOnkeydown = (e) => {
// //         if(e.key === 'Enter'){
// //             onSearch(input);
// //         }
// //     }

// //     return (
// //         <div className='flex items-center indent-2 bg-gray-200 p-2 rounded-full w-fit'>
// //             <input
// //                 placeholder={text}
// //                 value={input}
// //                 onChange={(e) => setInput(e.target.value)}
// //                 onKeyDown={handleOnkeydown}

// //             />
// //             {/* <button onClick={handleOnkeydown}>
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
// //             </button> */}
// //         </div>
// // >>>>>>> origin/main
//     );


//     // const findSearchMatch = () => {

//     //     // return data.map((d, i) => (
//     //     //     d.title.toLowerCase().includes(userSearch) ? (
//     //     //     { item: d, index: i }
//     //     //     ) : null
//     //     // )).filter(f => f !== null);

//     //     // setSearchResult((prevSearchResult) => ([
//     //     //     ...prevSearchResult, 
//     //     //     data.map((d, i) => (
//     //     //         d.title.toLowerCase().includes(userSearch) ? (
//     //     //         { item: d, index: i }
//     //     //         ) : null
//     //     //     )).filter(f => f !== null)
//     //     // ]));

//     //     const searchResult = data.map((d,i) =>
//     //         d.title.toLocaleLowerCase().includes(userSearch)
//     //     )
//     //     console.log(searchResult)



//     // };

//     // const handleSearchBarChange = (e) => {
//     //     if (e.target.value.trim()) {
//     //         setUserSearch(e.target.value.toLowerCase().trim());
//     //         findSearchMatch();
//     //         console.log(e.target.value);
//     //         // findSearchMatch();
//     //         // console.log(findSearchMatch())
//     //     }
//     // };

//     // const handleUserSearch = (e) => {
//     //     e.preventDefault();
//     //     console.log('searching...')
//     //     // findSearchMatch()
//     // }


    

//     // return (
//     //     <div className='flex items-center p-2 rounded-full bg-gray-200 w-fit' >
//     //         <form onSubmit={handleUserSearch}
//     //             className='flex gap p-2'>
//     //             {/* <input 
//     //                 className='indent-2'
//     //                 // placeholder='Find outfits that match your taste'                  
//     //                 // placeholder='Find your perfect outfit'
//     //                 placeholder={text}
//     //                 value={userSearch}
//     //                 onChange={(e) => handleSearchBarChange(e)}
                  
//     //             />  */}
//     //             <input 
//     //                 className='indent-2'
//     //                 // placeholder='Find outfits that match your taste'                  
//     //                 // placeholder='Find your perfect outfit'
//     //                 placeholder={text}
//     //                 value={userSearch}
//     //                 onChange={(e) => handleSearchBarChange(e)}
                  
//     //             /> 
//     //             <button type='submit'>
//     //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
//     //             </button>
//     //           </form>
//     //     </div>     
//     // );
// }

import { useState, useEffect, useRef } from "react";
import { useSearch } from "../../context/SearchContext";

// component controls:
// input box state
// search overlay visibility
// search query value inside global SearchContext
export default function SearchBar({ text }) {
  const [input, setInput] = useState(''); // holds current value in search bar
  const { setSearchQuery, setIsSearching, clearSearch } = useSearch(); //holds local component state
  const inputRef = useRef(null);

  // Real-time search: Update query as user types

  const handleChange = (e) => {
    const value = e.target.value;
    // passing the value to both this component and and its parent, SearchContext/SearchProvier
    setInput(value);
    setSearchQuery(value);
    
    // Open overlay if there's input, close if empty
    // i think we could have chosen to use this SearchContext since the isSearching is also passed there?? 
    if (value.trim() === '') {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
    //  alternative to this ??
    // if (value.trim() === '') {
    //   setIsSearching(false);
    //   return;
    // } 
    // setIsSearching(true);
  };

  // Handle form submit (when user presses Enter)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') {
      setIsSearching(false);
      return;
    }

    // Keep overlay open with current results
    setIsSearching(true);
  };

  // handle keyboard shortcuts
  
  // focus the input and also open search overlay
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e)
      // Ctrl+K or Cmd+K to focus search
      // this catches both, whether it was the ctrl key or cmd key that was pressed
      // e.ctrlKey considers the lowerCase or upperCase of k is pressed depending on CapsLock or Shift
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        // ctrl + k by default would open up the browser search bar
        // prevent browser default search: e.preventDefault() allows the shortcut for this SearchBar component
        e.preventDefault();

        // we don't usually use the querySelector or this form of DOM manipulation from my journey so far. why now?
        // can't e just get the input with e.target ?
        // The code is inside a global keydown handler:
        // no specific react component event. we are listening for keyboard events anywhere on the page
        // react doesn't e.target as the input in this case because the event triggered by the input, it's triggered by the window
        // document.querySelector() helps find the specific input
        
        // const searchInput = document.querySelector('input[placeholder*="Search"]');

        // window for windows laptop or both windows and MAC

        // Can we avoid the document.querySelector() in react?
        // Yes. Its recommended to use the useRef in react
        // it gives direct access to a DOM element 
        // points directly to the input element
        // e.target only works if the event is fired on the element itself 
        // in this case the event is global(window) which could be anything, may not even be an input
        // hence, e.target[0] is not reliable here
  
        // ?. is for optional chaining, prevents code from crashing is the inputRef is null
        // only runs if the thing exists
        // otherwise we would get -> TypeError: cannot read properties of null(reading 'focus' )
        inputRef.current?.focus();
        
        // console.log("inputRef", inputRef.current)
          // why i can't see .focus in the console??

          // this if statement also prevents the same error like the ?. does
          // otherwise we would get -> TypeError: cannot read properties of null(reading 'focus' )
        // if (searchInput) {
          // searchInput.focus();
          setIsSearching(true);
        // }
      }

      // escape to close search
      if (e.key === 'Escape') {
        setInput('');
        clearSearch();
      }
    };

    // call the handleKeyDown function when any key is pressed on the page
    // this is a global event listener because it listens for the whole page and not on a specific input or div
    // if you don't remove it the listener stays forever, causes memory leak, double calling and bugs
    // prevents where the event fires many times
    // ???????
    window.addEventListener('keydown', handleKeyDown);

    // the return is not returning to the function. it is a cleanup function
    // react calls this clean up function when:
    // first: the component unmounts: leaving the page or component disappears
    // second: anytime the effect runs again because the dependencies are changed

    // why is  the return used
    // in useEffect, the function you pass can optionally return another function
    //  that returned function is called the clean up function
    //  the first function(the one passed to the useEffect) is the setup: window.addEventListener('keydown', handleKeyDown);
    // the function you return is the teardown / cleanup
    // react calls the cleanup function automatically:
    // before the component unmounts
    // before re-running the effect if dependencies change
    // the return in useEffect is how react knows what to cleanup
    // when the component mounts,the cleanup function doesn't run yet, just exists for later
    // if any dependency changes, react run the cleanup function first 
    // then runs the effect callback again, adding the new listener with the latest state


    // why we can't just put removeEventListener() right after the addEventListener ?
    // this would immediately  remove the listener right after adding it 
    // listener would never get a chance to respond to events
    // react can't remember what to remove unless you give it a function to call on cleanup

    // do we always need a cleanup function?
    // only when the effect has side effects that need undoing
    // side effects like: setInterval/ setTimeout, addEventListener, subscriptions(websocket, firebase), 
    // manual DOM manipulation, fetching data with cancellation
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearSearch, setIsSearching]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center indent-2 bg-gray-200 p-2 rounded-full w-fit'>
        <input
          ref={inputRef}
          type="text"
          placeholder={text}
          // value={input}
          onChange={handleChange}
          className="bg-transparent outline-none"
        />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="#000" strokeWidth="1">
              <circle cx="11" cy="11" r="5.5"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 15l4 4"/>
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
}
