import React from 'react'

function MobileColorBar({setActiveMobileFilter,colorOptions, currCheckedColors, setCurrCheckedColors}) {
   console.log(colorOptions)

   const handleColorChange = (event, colorId) => {
      // event.stopPropagation()
      console.log("colorId", colorId)

      setCurrCheckedColors(prevCheckedColor => 
      prevCheckedColor.map(color => color.id === colorId ? {...color, isChecked: !color.isChecked} : color)
    )
   };

  return (
    <div>
      <div>
         <button onClick={() => setActiveMobileFilter(null)}>B</button>
         <p className='text-3xl'>Color</p>
      </div>

      <div className='grid grid-cols-2 gap-x-2  mt-4 bg-gray-300 w-fit p-2 rounded-xl'>{colorOptions.map((color) => 
        <div 
          key={color.id}
        >
        <button  className='cursor-pointer ' onClick={(e) => handleColorChange(e, color.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill={color.hex}

           stroke={color.id === 'black' ? 'white' : currCheckedColors.some(currCheckedColor => currCheckedColor.id === color.id && currCheckedColor.isChecked) && 'black'}
           strokeWidth='2' fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd" /></svg>
        </button>
        </div>
      )}
      </div>
    </div>
  )
}

export default MobileColorBar