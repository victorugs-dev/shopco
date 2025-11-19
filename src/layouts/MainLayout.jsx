import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/ui/NavBar'

function MainLayout() {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <Navbar />  
      {/* <main className='w-full'> */}
        <Outlet />
      {/* </main> */}
    </div>
  )
}
// every page should be rendered in MainLayout
// every page should be rendered in outlet

export default MainLayout