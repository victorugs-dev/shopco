import { useState } from "react";
// <<<<<<< HEAD
import { useSearch } from "../../context/SearchContext";
import { data } from "../../../data";

export default function SearchBar({ text }){
// =======
// import { data } from "../../../data";

// export default function SearchBar({text, onSearch}){
// >>>>>>> origin/main


    // const [userSearch,setUserSearch] = useState('')
    // // const [searchResult, setSearchResult] = useState([]);

    const [input,setInput] = useState('');

// <<<<<<< HEAD
    const { setSearchQuery, setSearchResults, setIsSearching } = useSearch();

    // const handleSearch = (e) =>{
    //     const value = e.target.value;
    //     setInput(value);
    //     setSearchQuery(value);

    //     if(value.trim() === ''){
    //         setSearchResults([]);
    //         setIsSearching(false);
    //         return;
    //     };

    //     const filteredProducts = data.filter((d) => 
    //     d.title.toLowerCase().includes(value.toLowerCase()));

    //     console.log(filteredProducts)
    
    //     setSearchResults(filteredProducts);
    //     setIsSearching(true);
    // }
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value)
        setInput(value);
        setSearchQuery(value);
        
        if(value.trim() === ''){
            setIsSearching(false);
            return
        }
        setIsSearching(true);

        // const filteredProducts = data.filter((d) => 
        // d.title.toLowerCase().includes(input.toLowerCase()));

        // console.log(filteredProducts)
    
        // setSearchResults(filteredProducts);
        // setIsSearching(true);
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        console.log(e)
        console.log(e.target)
        // console.log(e.target[0])
        // const value = e.target.value;
        // setInput(value);
        // setSearchQuery(value);

        // if(value.trim() === ''){
        //     setSearchResults([]);
        //     setIsSearching(false);
        //     return;
        // };
        if(input.trim() === ''){
            setSearchResults([]);
            setIsSearching(false);
            return;
        };

        const filteredProducts = data.filter((d) => 
        d.title.toLowerCase().includes(input.toLowerCase()));

        console.log(filteredProducts)
    
        setSearchResults(filteredProducts);
        setIsSearching(true);
    };


    // const handleOnkeydown = (e) => {
    //     if(e.key === 'Enter'){
    //         onSearch(input);
    //     }
    // }

    return (
       <form onSubmit={handleSearch}>
         <div className='flex items-center indent-2 bg-gray-200 p-2 rounded-full w-fit'>
            <input
                placeholder={text}
                // value={input}        
                // onChange={(e) => setInput(e.target.value)}
                // onChange={handleSearch}
                onChange={handleChange}

            />
            <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
            </button>
        </div>
       </form>
// =======
//     const handleOnkeydown = (e) => {
//         if(e.key === 'Enter'){
//             onSearch(input);
//         }
//     }

//     return (
//         <div className='flex items-center indent-2 bg-gray-200 p-2 rounded-full w-fit'>
//             <input
//                 placeholder={text}
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleOnkeydown}

//             />
//             {/* <button onClick={handleOnkeydown}>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
//             </button> */}
//         </div>
// >>>>>>> origin/main
    );


    // const findSearchMatch = () => {

    //     // return data.map((d, i) => (
    //     //     d.title.toLowerCase().includes(userSearch) ? (
    //     //     { item: d, index: i }
    //     //     ) : null
    //     // )).filter(f => f !== null);

    //     // setSearchResult((prevSearchResult) => ([
    //     //     ...prevSearchResult, 
    //     //     data.map((d, i) => (
    //     //         d.title.toLowerCase().includes(userSearch) ? (
    //     //         { item: d, index: i }
    //     //         ) : null
    //     //     )).filter(f => f !== null)
    //     // ]));

    //     const searchResult = data.map((d,i) =>
    //         d.title.toLocaleLowerCase().includes(userSearch)
    //     )
    //     console.log(searchResult)



    // };

    // const handleSearchBarChange = (e) => {
    //     if (e.target.value.trim()) {
    //         setUserSearch(e.target.value.toLowerCase().trim());
    //         findSearchMatch();
    //         console.log(e.target.value);
    //         // findSearchMatch();
    //         // console.log(findSearchMatch())
    //     }
    // };

    // const handleUserSearch = (e) => {
    //     e.preventDefault();
    //     console.log('searching...')
    //     // findSearchMatch()
    // }


    

    // return (
    //     <div className='flex items-center p-2 rounded-full bg-gray-200 w-fit' >
    //         <form onSubmit={handleUserSearch}
    //             className='flex gap p-2'>
    //             {/* <input 
    //                 className='indent-2'
    //                 // placeholder='Find outfits that match your taste'                  
    //                 // placeholder='Find your perfect outfit'
    //                 placeholder={text}
    //                 value={userSearch}
    //                 onChange={(e) => handleSearchBarChange(e)}
                  
    //             />  */}
    //             <input 
    //                 className='indent-2'
    //                 // placeholder='Find outfits that match your taste'                  
    //                 // placeholder='Find your perfect outfit'
    //                 placeholder={text}
    //                 value={userSearch}
    //                 onChange={(e) => handleSearchBarChange(e)}
                  
    //             /> 
    //             <button type='submit'>
    //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
    //             </button>
    //           </form>
    //     </div>     
    // );
}