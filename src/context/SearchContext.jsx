
import { createContext, useContext, useState, useEffect } from "react";
import { data } from "../../data";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [querySuggestions, setQuerySuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);


  // generate query suggestions based on product titles
  const generateSuggestions = (query) => {
    if(!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();
    // new Set() constructor creates a set object
    // done before looping through products because a Set() removes duplicates
    const suggestions = new Set();

    // extract unique words or phrases from product titles that match
    data.forEach(product => {
      const title = product.title.toLowerCase();
      // const lowerCasePoductTitle = product.title.toLowerCase();
      
      // If the title includes the query, add it as a suggestion

      // many titles in dataset that may include the query
      // only add 1 of each instance because the Set() only accepts unique values
      if(title.includes(lowercaseQuery)) {
        suggestions.add(product.title);
        // console.log("title: ",title);
        // console.log("suggestions: ", suggestions);
        
      }
      
      //  suggest partial matches to product title
      // const words = title.split(' ');
      // console.log("words: ",words)
      // words.forEach(word => {
      //   if (word.includes(lowercaseQuery) && word.length > 2) {
      //     suggestions.add(word);
      //   }
      // });
    });

    // convert Set to array and limit to 5 suggestions
    return Array.from(suggestions).slice(0, 5);
  };

  // Filter products based on query
  const filterProducts = (query) => {
    if (!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();
    return data.filter(product =>
      // first check if the product title matches, if it doesn't check the product description instead
      // only if it it doesn't product title
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 8); // limit to 8 products
  };

  // runs on every searchQuery change
  useEffect(() => {
    if (searchQuery.trim()) {
      const suggestions = generateSuggestions(searchQuery);
      const results = filterProducts(searchQuery);
      
      setQuerySuggestions(suggestions);
      setSearchResults(results);
    } else {
      setQuerySuggestions([]);
      setSearchResults([]);
    }
  // }, [searchQuery]);
  }, []);

  useEffect(() => {
    console.log("mounted")
  },[])
  
  // called in the child components 
  // save search to recent searches when user selects something and Keep last 5 searches
  
  const addToRecentSearches = (query) => {
    setRecentSearches(prev => {
      // loop through previous searches and find any search that is not the same as the one that was just made
      const filtered = prev.filter(q => q !== query);
      return [query, ...filtered].slice(0, 5); 
    });
  };

  // called in the child components 
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setQuerySuggestions([]);
    setIsSearching(false);
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    querySuggestions,
    isSearching,
    setIsSearching,
    recentSearches,
    addToRecentSearches,
    clearSearch,
    
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}

