import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }){
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); //controls overlay visibility

    return (
        <SearchContext.Provider 
            value={{searchQuery, setSearchQuery,searchResults,setSearchResults,isSearching,setIsSearching}}
        >{children}
        </SearchContext.Provider>
    );
}

export function useSearch(){
    return useContext(SearchContext)
}

