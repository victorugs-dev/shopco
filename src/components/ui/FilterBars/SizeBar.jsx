export default function SizeBar({ currCheckedSizes, setCurrCheckedSizes }){
 
   const handleSizeChange = (event, sizeId) => {
    setCurrCheckedSizes(prevCheckedSize => 
      prevCheckedSize.map(size => size.id === sizeId ? {...size, isChecked: !size.isChecked} : size
    ))
  };

   return (
   <div>{sizeOptions.map((size) => 
      <div key={size.id}>
         <input
         type='checkbox'
         name={size.id}
         id={size.id}
         onChange={(e) => handleSizeChange(e, size.id)}
         checked={
            currCheckedSizes?.some(currCheckedSize => {
               return currCheckedSize.id === size.id && currCheckedSize.isChecked
            })
         }
         />
         <label htmlFor={size.id}>{size.title}</label>
      </div>
   )}
   </div>
   );
  }