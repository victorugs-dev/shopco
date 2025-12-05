import { useState, createContext, useContext } from 'react';

// do i have to add the export in front of this?
export const CategoryContext = createContext(null);

export function CategoryProvider({ children }){
    const [searchCategory, setSearchCategory] = useState("");

    return (
        <CategoryContext.Provider value={{ searchCategory, setSearchCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategory(){
    return useContext(CategoryContext)
}