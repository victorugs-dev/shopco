import { useState, useEffect } from "react";
import { useCategory } from "../../context/CategoryContext";

export default function (){

    const [currCategory, setCurrCategory] = useState('');
    const { searchCategory , setSearchCategory} = useCategory(null);

    const categories = [
        {id: 0, title: 'All', slug: 'all'},
        {id: 1, title: 'Shirt', slug: 'shirt'},
        {id: 2, title: 'Trousers', slug: 'trousers'},
        {id: 3, title: 'Shoes', slug: 'shoes'},
        {id: 4, title: 'Sweaters', slug: 'sweaters'},
        {id: 5, title: 'Jeans', slug: 'jeans'}
    ]
    
    // useEffect(() => {
    //     setCurry(categories[0]);
    //     setSearchCategory()

    //     console.log(currCategory)
    // },[categories, currCategory])
    useEffect(() => {
        setCurrCategory(categories[0]);
        setSearchCategory(categories[0]);

        console.log(currCategory)
    },[])

    const handleCategoryChange = (e) => {
        setCurrCategory(e.target.value);
        setSearchCategory(e.target.value);
        console.log(e);
        console.log(e.target.value);
    }

    return (
            // <button 
            //     type='submit'
            //     onClick={handleCategorySelection}
            // >
            //     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"><path d="M5 12V4m14 16v-3M5 20v-4m14-3V4m-7 3V4m0 16v-9" /><circle cx="5" cy="14" r="2" /><circle cx="12" cy="9" r="2" /><circle cx="19" cy="15" r="2" /></g></svg>
            // </button>

            <>
                <select name='' id='' onChange={handleCategoryChange}>
                {/* <select name='' id='' onChange={(e) => handleCategoryChange(e)}> */}
                    {categories?.map((category) =>
                    <option key={category.id} value={category.slug}>{category.title}</option>
                    )}
                </select>
            </>
    );
}