import { useState, useEffect, useRef } from "react";
import { useSearch } from "../../context/SearchContext";

// component controls:
// input box state
// search overlay visibility
// search query value inside global SearchContext
export default function SearchBar({ text }) {
  const [input, setInput] = useState(''); // holds current value in search bar
  const { setSearchQuery, setIsSearching, clearSearch } = useSearch(); //holds local component state
  const inputRef = useRef(null);

  // Real-time search: Update query as user types

  const handleChange = (e) => {
    const value = e.target.value;
    // passing the value to both this component and and its parent, SearchContext/SearchProvier
    setInput(value);
    setSearchQuery(value);
    
    console.log("value", value)
    // Open overlay if there's input, close if empty
    // i think we could have chosen to use this SearchContext since the isSearching is also passed there?? 
    if (value.trim() === '') {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
   //  setIsSearching(value.trim === '' ? false : true);
   
    //  alternative to this ??
    // if (value.trim() === '') {
    //   setIsSearching(false);
    //   return;
    // } 
    // setIsSearching(true);
  };

  // Handle form submit (when user presses Enter)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') {
      setIsSearching(false);
      return;
    }

    // Keep overlay open with current results
    setIsSearching(true);
  };

  // handle keyboard shortcuts
  
  // focus the input and also open search overlay
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to focus search
      // this catches both, whether it was the ctrl key or cmd key that was pressed
      // e.ctrlKey considers the lowerCase or upperCase of k is pressed depending on CapsLock or Shift
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        // ctrl + k by default would open up the browser search bar
        // prevent browser default search: e.preventDefault() allows the shortcut for this SearchBar component
        e.preventDefault();

        // we don't usually use the querySelector or this form of DOM manipulation from my journey so far. why now?
        // can't e just get the input with e.target ?
        // The code is inside a global keydown handler:
        // no specific react component event. we are listening for keyboard events anywhere on the page
        // react doesn't e.target as the input in this case because the event triggered by the input, it's triggered by the window
        // document.querySelector() helps find the specific input
        
        // const searchInput = document.querySelector('input[placeholder*="Search"]');

        // window for windows laptop or both windows and MAC

        // Can we avoid the document.querySelector() in react?
        // Yes. Its recommended to use the useRef in react
        // it gives direct access to a DOM element 
        // points directly to the input element
        // e.target only works if the event is fired on the element itself 
        // in this case the event is global(window) which could be anything, may not even be an input
        // hence, e.target[0] is not reliable here
  
        // ?. is for optional chaining, prevents code from crashing is the inputRef is null
        // only runs if the thing exists
        // otherwise we would get -> TypeError: cannot read properties of null(reading 'focus' )
        inputRef.current?.focus();
        
        // console.log("inputRef", inputRef.current)
          // why i can't see .focus in the console??

          // this if statement also prevents the same error like the ?. does
          // otherwise we would get -> TypeError: cannot read properties of null(reading 'focus' )
        // if (searchInput) {
          // searchInput.focus();
          setIsSearching(true);
        // }
      }

      // escape to close search
      if (e.key === 'Escape') {
        setInput('');
        clearSearch();
      }
    };

    // call the handleKeyDown function when any key is pressed on the page
    // this is a global event listener because it listens for the whole page and not on a specific input or div
    // if you don't remove it the listener stays forever, causes memory leak, double calling and bugs
    // prevents where the event fires many times
    // ???????
    window.addEventListener('keydown', handleKeyDown);

    // the return is not returning to the function. it is a cleanup function
    // react calls this clean up function when:
    // first: the component unmounts: leaving the page or component disappears
    // second: anytime the effect runs again because the dependencies are changed

    // why is  the return used
    // in useEffect, the function you pass can optionally return another function
    //  that returned function is called the clean up function
    //  the first function(the one passed to the useEffect) is the setup: window.addEventListener('keydown', handleKeyDown);
    // the function you return is the teardown / cleanup
    // react calls the cleanup function automatically:
    // before the component unmounts
    // before re-running the effect if dependencies change
    // the return in useEffect is how react knows what to cleanup
    // when the component mounts,the cleanup function doesn't run yet, just exists for later
    // if any dependency changes, react run the cleanup function first 
    // then runs the effect callback again, adding the new listener with the latest state


    // why we can't just put removeEventListener() right after the addEventListener ?
    // this would immediately  remove the listener right after adding it 
    // listener would never get a chance to respond to events
    // react can't remember what to remove unless you give it a function to call on cleanup

    // do we always need a cleanup function?
    // only when the effect has side effects that need undoing
    // side effects like: setInterval/ setTimeout, addEventListener, subscriptions(websocket, firebase), 
    // manual DOM manipulation, fetching data with cancellation


    // const handleScroll = () => {
// 
      // console.log('scrolling - close search overlay');
    // }

    // document.addEventListener('scroll', handleScroll);

    // return () => window.removeEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      // You are creating a new, anonymous function inline.
      // When you write this in the cleanup:
      // document.removeEventListener('scroll', () => {
        // console.log('scrolling - close search overlay');
        // console.log('removed search overlay');
      // });
    // You are creating a brand new, entirely different anonymous function instance. removeEventListener requires a reference to the exact same function object that was originally registered.
    // The Solution
    // To fix this, you must store the anonymous function in a variable (or convert it to a named function) so that both addEventListener and removeEventListener can reference the same function object.
    // Here is the corrected code structure:

      // document.removeEventListener('scroll', handleScroll);

      // why is it logging 'scrolling - close search overlay' to the console on mount
      // The ** 'scrolling - close search overlay' ** message is likely logging to the console on mount because you might have a logical error where the function is being called immediately during the render phase, rather than being passed as a function reference to addEventListener.

    // This specific code snippet itself doesn't inherently run on mount unless one of the following conditions is met:
    // It's inside a React useEffect without a dependency array: The code inside a useEffect hook runs after every render, including the initial mount.
    // The page scrolled slightly on load: The browser might fire a scroll event immediately upon loading the page, especially if you link to an anchor(#target) or if scroll restoration settings are active.
    // You are accidentally invoking the function: You may have parentheses() where you intended to pass a reference to the arrow function (e.g., someFunction(handleScrollCallback()) elsewhere in your code). 

    }
  }, [clearSearch, setIsSearching]);

// ... inside your functional component ...

const hasMounted = useRef(false);
// console.log(hasMounted)

const handleScrollClosure = () => {
  if (!hasMounted.current) {
    // ignore the first time the event fires on mount
    return;
  }
  setIsSearching(false);
  // console.log('scrolling - close search overlay');
};

// empty array ensures this runs only on mount or unmount

// y the useEffect for this can't just place it like that?
// You cannot place event listeners like document.addEventListener() directly in the top level of a React functional component because it causes major bugs and violates fundamental React principles. 
// Here’s why placing it "like that" (in the main body of the component function) is problematic and why useEffect is necessary:
// 1. Side Effects Belong in useEffect 
// The core principle of React functional components is that they should be pure functions. A pure function's only job is to take props/state as input and return JSX (UI elements) as output, without changing anything outside its scope. 
// Side Effects: Attaching an event listener to the global document object, fetching data, or manually manipulating the DOM are all "side effects" (operations that interact with the external system outside of React).
// useEffect is the specific React Hook designed to safely handle these side effects after the component has rendered. 
// 2. Prevents Memory Leaks and Infinite Loops 
// Components in React re-render frequently (e.g., whenever state changes). 
// Without useEffect: If you put document.addEventListener(...) in the main component body, a new listener would be added to the document every single time the component re-renders.
// The Problem: This quickly leads to hundreds or thousands of duplicate listeners running simultaneously, overwhelming the browser and causing severe memory leaks.
// With useEffect: The hook manages this lifecycle correctly. By including a cleanup function (return () => ...removeEventListener(...)) within the effect, React ensures the old listener is removed before a new one is potentially added (or when the component unmounts), preventing these issues. 
// 3. Ensures Correct Timing 
// React controls when your component is mounted (added to the DOM). 
// Code in the main function body runs during the "render phase." At this time, the DOM elements you might want to interact with (document, window, or specific element refs) might not be fully available yet.
// useEffect guarantees that your code runs after the DOM has been fully updated and the component is "painted" to the screen (the "commit phase"). This ensures the browser APIs are ready to be used. 
// In summary: useEffect provides the necessary structure and lifecycle management (mount, update, unmount) to safely synchronize your React component with non-React systems like the browser's event model. 
useEffect(() => {
  document.addEventListener('scroll', handleScrollClosure);

  // mark the component as mounted after the initial render cycle is complete
  hasMounted.current = true;

  // setup the cleanup function using the correct reference
  return () => {
    document.removeEventListener('scroll', handleScrollClosure);
  };
}, []); 


  return (
    <form onSubmit={handleSubmit} className=''>
      <div className='flex items-center indent-2 bg-gray-200 p-2 rounded-full w-fit'>
        <input
          ref={inputRef}
          type="text"
          placeholder={text}
          // value={input}
          onChange={handleChange}
          className="bg-transparent outline-none"
          onBlur={() => console.log('blur : searchBar')}

        />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="#000" strokeWidth="1">
              <circle cx="11" cy="11" r="5.5"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 15l4 4"/>
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
}
