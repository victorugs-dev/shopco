export default function SizeBar({ currCheckedSizes, setCurrCheckedSizes }){
   const sizeOptions = [
    {id:"x-small", title:"X-Small"},
    {id:"small", title:"Small"},
    {id:"medium", title:"Medium"},
    {id:"large", title:"Large"},
    {id:"x-large", title:"X-Large"},
    {id:"xx-large", title:"XX-Large"},
    {id:"xxx-large", title:"XXX-Large"},
  ];

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