import { reviewsData } from '../../../data'
import { useTheme } from '../../context/ThemeContext';

function Reviews() {
   const [theme, setTheme] = useTheme();

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
            </div>))}
         </div>
    </div>
  )
}

export default Reviews