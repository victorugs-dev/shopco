import React from 'react'
import { reviewsData } from '../../../data'
import { useTheme } from '../../context/ThemeContext';

function Reviews() {
    const [theme, setTheme] = useTheme();

    function handleNewsletterSubscription() {
        console.log("subscribed to newsletter");
    }

   return (
    <div className='w-full'>
        <div className='flex p-2 justify-between'>
            <p className='text-3xl'>Our Happy Customers</p>
            <div className='flex gap-2'>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048"><path fill="#000" d="M2048 1088H250l787 787l-90 90L6 1024L947 83l90 90l-787 787h1798z" /></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048"><path fill="#000" d="m2042 1024l-941 941l-90-90l787-787H0V960h1798l-787-787l90-90z" /></svg>
                </button>
            </div>
        </div>
        
          <div className=' flex flex-col md:flex-row gap-1'>{reviewsData.map(review => (
            <div key={review.id} className='border p-4 m-2'>
                <div className='flex gap-1'>
       <p>{review.name}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="green" fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clip-rule="evenodd"/></svg>
                </div>
                <p>{review.comment}</p>
            </div>
        ))}</div>
        <div className='flex flex-col gap-x-4 gap-y-2 md:flex-row justify-between p-4 w-full'>
            <div className={`text-white p-4 w-full grid items-center text-3xl rounded-4xl
                ${theme === 'light' ? 'bg-black text-white' : 'text-black'}`}>
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
                <div className={`flex item-center bg-black justify-center md:px-15 md:py-4 p-2 rounded-full gap-1 text-gray-400 
                ${theme === 'light' ? 'bg-black' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" /></svg>
                    <input className='whitespace-nowrap' type="email" placeholder='Enter your email' />
                </div>

                <button className='p-2 bg-blue-400 md:px-15 md:py-4 whitespace-nowrap rounded-full w-full' onClick={handleNewsletterSubscription}>Subscribe to our Newsletter</button>
            </div>
        </div>
    </div>
  )
}

export default Reviews