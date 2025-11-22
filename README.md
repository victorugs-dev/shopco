## day 4 useContext useReducer useCallBack
How this React Context pattern works and why the code needed the useTheme hook.
The Big Picture: What Problem Does This Solve?
Imagine you have a theme setting (light/dark mode) that needs to be accessed by components all over your app - Navbar, ProductDetails, Footer, etc. Without Context, you'd have to pass theme and toggleTheme as props through every single component in the tree (this is called "prop drilling"). Context provides a way to share data across components without manually passing props at every level.
Breaking Down Each Piece
1. Creating the Context javascript

const ThemeContext = createContext();
Think of this as creating an empty "channel" or "pipeline" for data. It doesn't contain any data yet - it's just the infrastructure that will allow components to communicate.

2. The Provider Component

ThemeProvider is a wrapper component that holds the theme state
It uses useState to track whether the theme is 'light' or 'dark'
toggleTheme is a function that flips between light and dark
<ThemeContext.Provider value={{theme, toggleTheme}}> broadcasts the data down to any child components
{children} renders whatever components you wrap with <ThemeProvider>




## To write a password regex, you only need 5 ideas:
Step 1 — Understand the pieces

Character ranges

[A-Z] → uppercase

[a-z] → lowercase

[0-9] → digits

[^ ] → “not a space”

. → any character

Shortcuts

\d → digits

\w → letters, numbers, underscore

\s → whitespace

\D, \W, \S → opposites

 Quantifiers

+ → one or more

* → zero or more

? → optional

{12,16} → between 12 and 16 characters

Anchors

^ → start

$ → end

 Lo okaheads (THE key for password validation)

(?=...) → must include this thing
Example:
(?=.*[A-Z]) → must include at least one uppercase
..................................../

%  Is there a difference between [^ ] and \S?
% Short answer:

% They are similar, but NOT exactly the same.

1. What \S means

\S = “match any non-whitespace character.”

Whitespace includes:

space " "

tab \t

newline \n

carriage return \r

form feed \f

vertical tab \v

So \S rejects all of those.

2. What [^ ] means

[^ ] = “match any character that is not a space.”

ONLY the space " ".
It does not block tabs, newline, etc.
......................................../
In JavaScript regular expressions, the caret symbol (^) has two distinct meanings depending on its context: Start of Input/Line Anchor.
When ^ appears at the beginning of a regular expression (outside of a character class), it acts as an anchor, asserting that the pattern must match at the very beginning of the input string.


........./
Why lookaheads work for passwords

Suppose we have a password rule:

At least 1 uppercase → (?=.*[A-Z])

At least 1 lowercase → (?=.*[a-z])

At least 1 number → (?=.*\d)

At least 1 special → (?=.*[!@#$%^&*])

No whitespace → \S{12,16} (between 12–16 non-space characters)

How it reads:
(?=.*[A-Z])    → somewhere in the string, there’s an uppercase
(?=.*[a-z])    → somewhere in the string, there’s a lowercase
(?=.*\d)       → somewhere in the string, there’s a digit
(?=.*[!@#$%^&*]) → somewhere in the string, there’s a special
\S{12,16}      → total length 12–16, no spaces

Key thing about lookaheads:

They don’t consume characters, they just check “does this exist somewhere?”

That way you can combine all rules into one regex instead of checking each rule separately.

## applying the useCallback
The main reason to use useCallback is performance optimization when you pass functions down to child components that could re-render unnecessarily.

You would move them to separate files if:
You want reusability: maybe OutfitColorButtons or OutfitSizeButton could be used on other product pages.
You want cleaner code: ProductDetails.jsx is getting long; separating concerns makes it easier to maintain.
You want to memoize them with React.memo to prevent unnecessary re-renders.
--

<!-- what is the chance they will be used again? and where -->
Only move components out when they are reused in more than one place, or when they become too big.

OutfitColorButtons OutfitSizeButton :  are only used inside ProductDetails.jsx.


So the chance you will reuse them right now is low.
But in bigger e-commerce apps, these same UI pieces often appear again in:
Where they could be reused later
Cart page (editable cart: change color/size inside cart)
Quick-view modal (when users click “Quick View” on product card)
Wishlist page
Compare products page
Recommended items modal
Admin panel (product editing—select color/size)
<!-- If your project grows, you will likely reuse them. -->
BUT, if your MVP is just a simple product page → you don’t need to move them yet.

<!-- Should you use useCallback now? -->
You should use useCallback only when BOTH conditions are true:

A. a function is passed as a prop ...AND... B. The child component re-renders because the function identity changes:
<OutfitColorButtons onSelectColor={handleColor} />

If handleColor is defined inside the parent, every render creates a new function.
If OutfitColorButtons is memoized (using React.memo), this breaks the memoization.


cases to use useCallback:
1. Add to Cart / Update Quantity Functions
2. Filtering and Sorting Functions
3. Callbacks Passed to Reusable UI Components Color selector, size selector, dropdowns, etc.
4. Event Handlers in High-Frequency Components. Any component that renders lists of products, cart items, or filters.

Example: incrementing/decrementing quantity in a CartItem component.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
