import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/ui/Navbar'
import SearchOverlay from '../components/ui/SearchOverlay'
import { useSearch } from '../context/SearchContext'
import SearchBar from '../components/ui/SearchBar'


function MainLayout() {
  // const { setQuery, searchResults, isSearching } = useSearch();
  const { isSearching } = useSearch();

      
  return (
    <div className="flex w-full flex-col min-h-screen">
      <Navbar />
      {isSearching && <SearchOverlay />}      
      {/* <main className='w-full'> */}
        <Outlet />
      {/* </main> */}
    </div>
  )
}
// every page should be rendered in MainLayout
// every page should be rendered in outlet

export default MainLayout