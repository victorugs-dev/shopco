import React from 'react'
import { useSearch } from '../../context/SearchContext'

function SearchOverlay() {
    const { searchQuery, searchResults, isSearching } = useSearch();

  return (
    // <div>SearchOverlay</div>
    <div className='flex  w-fit bg-green-200'>
        <div>Suggestions</div>
        <div>Products</div>
        

    </div>
    
  )
}

export default SearchOverlay