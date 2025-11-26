import { useState } from "react";

export default function (){

    const [currCategory,setCurry] = useState('shirts');

    const categoryList = [
        {id: 0, title: 'shirt'},
        {id: 1, title: 'trousers'},
        {id: 2, title: 'shoes'},
        {id: 3, title: 'sweaters'},
        {id: 4, title: 'jeans'}
    ]

    const handleCategorySelection = () => {
        // console
    }

    // what is that html type that lets us use a drop down

    return (
            <button 
                type='submit'
                onClick={handleCategorySelection}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-linecap="round" stroke-width="1"><path d="M5 12V4m14 16v-3M5 20v-4m14-3V4m-7 3V4m0 16v-9" /><circle cx="5" cy="14" r="2" /><circle cx="12" cy="9" r="2" /><circle cx="19" cy="15" r="2" /></g></svg>
            </button>
    );
}