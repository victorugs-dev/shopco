import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
// import toast, {toaster} from 'react-hot-toast';

function SignUp() {
  const navigate = useNavigate();

  const [isFormVerified, setIsFormVerified] = useState(false);

  const [isPasswordLengthValid,setIsPasswordLengthValid] = useState(false);

  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);

  const [isFieldEmpty,setIsFieldEmpty] = useState(false);

  const [error,setError] = useState('');


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  // const notifySignUpSuccessful = () => toast("You have signed up successfully!");

  // password must contain at least 12-16 characters , 1 uppercase, 1 lowercase, 1 number, 1 special character, no spacing
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitButtonClicked(true);
    const {firstName, lastName, email, phoneNumber, password, confirmPassword} = formData;

    if(isFormVerified === false){
      if(!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword){
        throw new Error('All fields are required!')
        // return <p>All fields are required!</p  >
      }

      // if(Array.from(password).length < 12 || Array.from(password).length > 15){
      //   throw new Error('Password must contain 12-16 characters');
      //   return <p className='text-red-200'>Password must contain 12-16 characters</p>;
      // }

      // const passwordArr = Array.from(password);
      // for(const i of passwordArr){
 
      //   // console.log(i)
      //   // console.log(typeof i)
      //   console.log(hasUpperCase(i))
      // }

      // Array.from(password).forEach(i => {
      //   console.log(i)
      // })


      const passwordChecker = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])\S{12,16}$/.test(password);
      if (!passwordChecker) throw new Error('Password must contain 12-16 characters');

  
      if(password !== confirmPassword){
        throw new Error("Passwords do not match!");
        return <p>Passwords do not match!</p>
      }

      setIsFormVerified(true);
      // notifySignUpSuccessful();
      console.log('registration successful');
      setTimeout(() => navigate("/"), 1000);

    }else{
      alert("You have already signed up.");
      console.log("You have already signed up.");
      return <p>"You have already signed up."</p>;
    }
  }

  // ...TASKS...
  // we want the borders of each input to be color red if error "All fields are required!"
  // some kind of buttton on the password and confirmPassword inputs to peek at the hidden password
  /* i will have to make sure that all the input have the appopriate type to them bcos users can easily 
  change this from the dev tool*/
  // shouldn't the input of type='reset' clear the whole form? or should i use a normal button with type='reset' 
  return (
    <div className='w-full grid place-items-center'>
      <form onSubmit={handleSubmit} className='p-4 rounded-md flex flex-col gap-10'>
        <label htmlFor=""
          className='border-2 p-4'
        >
          Enter your first name:
          <input
            className='outline-2 indent-1.5 rounded-md' 
            type="text" 
            name='firstName'
            value={formData.firstName}
            placeholder='James'
            onChange={handleChange}
          />
        </label>
        {(isSubmitButtonClicked && isFieldEmpty ) && <p className='text-red-200'>All fields are required!</p> }
        {/* <span>All fields are required!</span> */}

        <label htmlFor=""
          className='border-2 p-4'
        >
        Enter your last name
          <input
            className='outline-2 indent-1.5 rounded-md' 
            type="text" 
            name='lastName'
            value={formData.lastName}
            placeholder='Harden'
            onChange={handleChange}
            />
        </label>
        {(isSubmitButtonClicked && isFieldEmpty ) && <p className='text-red-200'>All fields are required!</p> }

        <label htmlFor=""
          className='border-2 p-4'
        >
        Enter your email:
          <input
            className='outline-2 indent-1.5 rounded-md' 
            type="email" 
            name='email'
            value={formData.email}
            placeholder='email@example.com'
            onChange={handleChange}
          />
        </label>
        {(isSubmitButtonClicked && isFieldEmpty ) && <p className='text-red-200'>All fields are required!</p> }

        <label htmlFor=""
          className='border-2 p-4'
        >
        Enter your phone number:
          <input
            className='outline-2 indent-1.5 rounded-md' 
            type="tel" 
            name='phoneNumber'
            value={formData.phoneNumber}
            placeholder='+234 123 456 7890'
            onChange={handleChange}
          />
        </label>
        {(isSubmitButtonClicked && isFieldEmpty ) && <p className='text-red-200'>All fields are required!</p> }

        <label htmlFor=""
          className='border-2 p-4'
        >
        Enter your password:
          <input
            className='outline-2 indent-1.5 rounded-md' 
            type="password" 
            name='password'
            value={formData.password}
            // password must contain at least 12-16 characters , 1 uppercase, 1 lowercase, 1 number, 1 special character, no spacing
            placeholder='Password123!'
            onChange={handleChange}
          />
        </label>
        {(isSubmitButtonClicked && isFieldEmpty ) && <p className='text-red-200'>All fields are required!</p> }
        {/* {isPasswordLengthValid === false && }  */}
        {/* if(isPasswordLength === false){
          return <p>password must contain at least 12-16 characters , 1 uppercase, 1 lowercase, 1 number, 1 special character, no spacing</p>
        } else if() */}

        {(isSubmitButtonClicked && isPasswordLengthValid === false) && (
          <p className='text-red-200'>password must contain at least 12-16 characters , 1 uppercase, 1 lowercase, 1 number, 1 special character, no spacing</p>
        )}

      <label htmlFor=""
        className='border-2 p-4'
      >
        Confirm Password
        <input
          className='outline-2 indent-1.5 rounded-md' 
          type="password" 
          name='confirmPassword'
          value={formData.confirmPassword}  
          placeholder='Confirm password'
          onChange={handleChange}
          />
      </label>
        {(isSubmitButtonClicked && isFieldEmpty ) && <p className='text-red-200'>All fields are required!</p> }
      {/* if submit button is clicked and passwords don't match before informing the user */}
        {(isSubmitButtonClicked && (formData.confirmPassword !== formData.password)) && (
          <p className='text-red-200'>Passwords do not match!</p>
        )}

        <div className='flex justify-between w-full'>
          <input
            className='bg-green-300 hover:bg-green-400 cursor-pointer px-4 py-2 rounded-3xl'
            type="submit"
            value='Submit Form'
          />
          <input
            className='bg-red-300 hover:bg-red-400 cursor-pointer px-4 py-2 rounded-3xl'
            type="reset"
            value='Clear Form'
          />
        </div>
      </form>
    </div>
    
  )
}

export default SignUp