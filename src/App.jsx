import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { RouterProvider } from "react-router/dom";
import viteLogo from '/vite.svg'
import './App.css'
import router from './router';
import {ThemeProvider} from './context/ThemeContext';
import {SearchProvider} from './context/SearchContext';
import { CategoryProvider } from './context/CategoryContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    // <div>
    <ThemeProvider>
      <SearchProvider>
        <CategoryProvider>
          <RouterProvider router={router} />
        </CategoryProvider>
      </SearchProvider>
    </ThemeProvider>
    // </div>
  );
}

export default App
