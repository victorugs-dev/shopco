import React from 'react'
import {useState, useCallback} from 'react';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';


function FilterIcon({children, placeholder}) {
    const [theme,setTheme] = useTheme();

    const defaultStyling = [
        `outline px-8 py-1 rounded-2xl 
        ${theme === 'light' ? ' text-black' : ' text-black'}`
    ];

    // a dropdown could appear when we click the filter icon
 
    return (
        <label className='m-2 '>
            Filter by:
            <input
                placeholder={placeholder}
            />
        </label>
    );
}

export default FilterIcon