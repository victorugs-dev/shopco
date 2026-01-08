import React from 'react'
import { useTheme } from '../../context/ThemeContext'

function Footer() {
   const [theme, setTheme] = useTheme();

     const  handleNewsletterSubscription = () => {
        console.log("subscribed to newsletter");
    }

  return (
     <div className={`flex flex-col gap-x-4 gap-y-2 md:flex-row md:justify-between px-6 py-8 m-4 rounded-3xl ${theme === 'light' ? 'bg-black' : 'bg-gray-800'}`}>
            <div className={`text-white  w-full grid items-center text-3xl rounded-4xl
               ${theme === 'light' ? 'text-white' : 'text-black'}`}>
               STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </div>

            <div className='space-y-3'> 
                {/* <div className={['flex item-center justify-center md:px-15 md:py-4 p-2 rounded-full gap-1  text-gray-400',
                    theme === 'light' ? 'bg-yellow-400' : 'bg-red-400'].join('')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" /></svg>
                    <input className='whitespace-nowrap' type="email" placeholder='Enter your email' />
                </div> */}
                {/* <div className={
                    theme === 'light' ? 'bg-green-400' : 'bg-blue-400'
                    }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" /></svg>
                    <input className='whitespace-nowrap' type="email" placeholder='Enter your email' />
                </div> */}
                {/* <div className={
                      ['flex item-center justify-center md:px-15 md:py-4 p-2 rounded-full gap-1 text-gray-400',
                        theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'].join('')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" /></svg>
                    <input className='whitespace-nowrap' type="email" placeholder='Enter your email' />
                </div> */}
                <div className={`flex item-center  justify-center md:px-15 md:py-4 p-2 rounded-full gap-1 text-gray-400 bg-white '}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" /></svg>
                    <input className='whitespace-nowrap' type="email" placeholder='Enter your email' />
                </div>

                <button className='p-2 bg-blue-400 md:px-15 md:py-4 whitespace-nowrap rounded-full w-full' onClick={handleNewsletterSubscription}>Subscribe to our Newsletter</button>
            </div>
        </div>
  )
}

export default Footer