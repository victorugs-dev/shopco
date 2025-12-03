import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router';

// useSearch is a custom hook from SearchContext
// provides search state and actions

function SearchOverlay() {
  const { 
    searchQuery, 
    searchResults, 
    querySuggestions, 
    isSearching, 
    recentSearches,
    setSearchQuery,
    addToRecentSearches,
    clearSearch 
  } = useSearch();

  // react router hook to programmatically navigate to other routes
  const navigate = useNavigate();

  // handle clicking on a suggestion
  // clicking a suggestion in the overlay updates searchQuery to that suggestion
  // when searchQuery changes the whole search system reacts
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    // the recentSearches is never updated until we click on one of the suggested items
    addToRecentSearches(suggestion);
  };

  // handle clicking on a product
  const handleProductClick = (product) => {
    addToRecentSearches(searchQuery);
    clearSearch();
    navigate(`/${product.slug}`);
  };

  // close overlay when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      clearSearch();
    }
  };

  if (!isSearching) return null;

  return (
    <div 
      className='fixed  inset-0 bg-opacity-50 z-50 flex justify-center pt-20'
      onClick={handleOverlayClick}
    >
      <div className='bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 h-fit max-h-[80vh] overflow-hidden'>
        
        {/* Search Query Display */}
        <div className='p-4 border-Jb bg-gray-50'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Searching for: <span className='font-semibold text-gray-900'>"{searchQuery}"</span>
            </p>
            <button 
              onClick={clearSearch}
              className='text-gray-400 hover:text-gray-600'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className='flex overflow-y-auto max-h-[70vh]'>
          
          {/* LEFT SIDE: Suggestions */}
          <div className='w-1/3 border-r p-4 bg-gray-50'>
            <h3 className='text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
              Suggestions
            </h3>
            
            {/* Query Suggestions */}
            {querySuggestions.length > 0 ? (
              <div className='space-y-2'>
                {querySuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className='flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors group'
                  >
                    {/* search icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-blue-600">
                      <g fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="5.5"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 15l4 4"/>
                      </g>
                    </svg>
                    <span className='text-sm text-gray-700 group-hover:text-blue-600'>
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {/* show recent searches when no suggestions */}
                {recentSearches.length > 0 && (
                  <div>
                    <p className='text-xs text-gray-500 mb-2'>Recent Searches</p>
                    <div className='space-y-2'>
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className='flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18"/>
                          </svg>
                          <span className='text-sm text-gray-600'>{search}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {recentSearches.length === 0 && (
                  <p className='text-sm text-gray-400'>No suggestions yet</p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Products */}
          <div className='w-2/3 p-4'>
            <h3 className='text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
              Products ({searchResults.length})
            </h3>

            {searchResults.length > 0 ? (
              <div className='space-y-3'>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className='flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group'
                  >
                    {/* Product Image */}
                    <div className='w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0'>
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    {/* Product Info */}
                    <div className='flex-1'>
                      <h4 className='font-medium text-gray-800 group-hover:text-blue-600 transition-colors'>
                        {product.title}
                      </h4>
                      <p className='text-sm text-gray-500 line-clamp-1'>
                        {product.description}
                      </p>
                      <div className='flex items-center gap-2 mt-1'>
                        <span className='text-lg font-bold text-gray-900'>
                          ${product.price}
                        </span>
                        {product.percentageDiscount && (
                          <span className='text-sm text-red-600 bg-red-50 px-2 py-0.5 rounded'>
                            -{product.percentageDiscount}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-blue-600 transition-colors">
                      <path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/>
                    </svg>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                {/* <div className='text-6xl mb-4'>🔍</div> */}
                 {/* search icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-blue-600">
                      <g fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="5.5"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 15l4 4"/>
                      </g>
                    </svg>
                <p className='text-gray-500'>No products found for "{searchQuery}"</p>
                <p className='text-sm text-gray-400 mt-2'>Try different keywords</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;