import React from 'react'

function Button({onClick,children}) {

  const defaultStyling = [
    'rounded-3xl p-2 w-1/2 bg-black text-white'
  ]

  return (
    <button className={defaultStyling} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button