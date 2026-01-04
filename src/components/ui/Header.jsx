import { Link } from "react-router"

function Header() {
  return (
      <div className='flex justify-between item-center bg-black text-white text-xl p-4'>
         <p className='md:text-3xl'>Sign up and get 20% off to your first order.
            <Link to={'sign-up'} className='underline cursor-pointer' >Sign Up Now</Link>
         </p>
         {/* cancel icon */}
         <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#fff" d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" /></svg>
      </div>
  )
}

export default Header