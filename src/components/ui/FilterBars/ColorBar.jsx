function ColorBar({ currCheckedColors, setCurrCheckedColors }){

   const colorOptions = [
    {id: "green", title: "Green", hex: "#10B981"},
    {id: "red", title: "Red", hex: "#EF4444"},
    {id: "yellow", title: "Yellow", hex: "#F59E0B"},
    {id: "orange", title: "Orange", hex: "#F97316",},
    {id: "light-blue", title: "Light Blue", hex: "#38BDF8",},
    {id: "dark-blue", title: "Dark Blue", hex: "#1D4ED8",},
    {id: "purple", title: "Purple", hex: "#8B5CF6",},
    {id: "pink", title: "Pink", hex: "#EC4899",},
    {id: "white", title: "White",  hex: "#FFFFFF"},
    {id: "black", title: "Black", hex: "#000000",},
  ];

   const handleColorChange = (event, colorId) => {
      // event.stopPropagation()
      console.log("colorId", colorId)

      setCurrCheckedColors(prevCheckedColor => 
      prevCheckedColor.map(color => color.id === colorId ? {...color, isChecked: !color.isChecked} : color)
    )
  }

    return (
     <div className='flex gap-x-2 items-center justify-center mt-4 bg-gray-300 w-fit p-2 rounded-xl'>{colorOptions.map((color) => 
        <div 
          key={color.id}
        >
        <button 
          className='cursor-pointer '
         onClick={(e) => handleColorChange(e, color.id)}

        >
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16"><path fill={color.hex} stroke={color === outfitColor && 'black'} strokeWidth='2' fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd" /></svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill={color.hex}

           stroke={color.id === 'black' ? 'white' : currCheckedColors.some(currCheckedColor => currCheckedColor.id === color.id && currCheckedColor.isChecked) && 'black'}
           
           strokeWidth='2' fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd" /></svg>

            
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill={color.hex} stroke={'black'} fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg> */}



        {/* <label htmlFor={color.id}>{color.title}</label> */}

    
        </button>
        </div>
      )}

      </div>
    );
  }


export default ColorBar