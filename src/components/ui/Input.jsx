import React from 'react'

function Input({icon, placeholder,}) {

  const defaultStyling = [
    ''
  ]
  return (

    <div>
      <div> {icon}</div>
      <input placeholder={placeholder}  />
    </div>
  )
}

export default Input