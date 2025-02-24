import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='bg-[rgb(21,21,20)] font-atkinson h-screen m-0 p-0'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
