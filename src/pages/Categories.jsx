import React from 'react'
import { useState } from 'react'

function Categories() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''

  });

  const handleChange = (e) => {
    const {name, value} = e.target; // this is called destructuring
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    if (!username && !email && !password && !confirmPassword){
      throw new Error('fields can not be left empty');
    }

    if(username !== confirmPassword){
      throw new Error('passwords do not match');
    }    
  }

  const handleClear = (e) => {
    e.preventDefault();
    setFormData({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''

    })
  }  

  return (
    <div>
      {/* <p>Categories</p> */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
        {/* <input type="text" /> */}
        <input className='outline-1 p-2'  type="text" name='username' value={formData.username} placeholder='Enter your name' onChange={handleChange}  />


        <input className='outline-1 p-2' type="email" name='email' value={formData.email} placeholder='Enter your email' onChange={handleChange}  />
        <input className='outline-1 p-2' type="password" name='password' value={formData.password} placeholder='********' onChange={handleChange}  />
        <input className='outline-1 p-2' type="password" name='confirmPassword' value={formData.confirmPassword} placeholder='********' onChange={handleChange}  />
        <div className='flex justify-between w-full '>
          <input className='outline-1 hover:pointer px-4 rounded-xl py-2 bg-green-400' onClick={handleSubmit} type="button" name='submit' value='Submit' />
          <input className='outline-1 hover:pointer px-4 rounded-xl py-2 bg-red-400' onClick={handleClear} type="button" name='clear' value='Clear' />
        </div>
      </form>
    </div>
  )
}

export default Categories