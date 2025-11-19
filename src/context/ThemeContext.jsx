// import {createContext, useContext, useState} from 'react';

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//     const [theme, setTheme] = useState('light');

//     const toggleTheme = () => setTheme(t => (t=== "light" ? "dark" : "light") );

//     return (
//         <ThemeContext.Provider value={{theme, toggleTheme}}>
//             <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
//             {children}
//             </div>
//         </ThemeContext.Provider>
//     )
// }

import {createContext, useContext, useState} from 'react';

// console.log(createContext().Provider)
const ThemeContext = createContext();

// What is themeContext

// console.log('ThemeContext: ', ThemeContext)
// console.log('ThemeContext.Provider: ', ThemeContext.Provider)
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    // 'theme' here is the initial value of the state which is 'light'
    const toggleTheme = () => setTheme(theme => (theme === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
                {children}
            </div>  
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return [context.theme, context.toggleTheme];
}

// key points.........
// ThemeContext returns an array: The value={[theme, toggleTheme]} allows you to destructure it as const [theme, toggleTheme] = useTheme()
// ThemeProvider must wrap your components: Any component that uses useTheme() must be a child (at any level) of <ThemeProvider>
// Error handling: The hook checks if it's being used within the provider and throws a helpful error if not