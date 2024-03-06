// Import the necessary React libraries
import React from "react";
import ReactDOM from "react-dom/client";

// Import the main App component
import App from "./App.jsx";

// Create a root React element from the HTML document's "root" element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root React element
root.render(
  // Use the <React.StrictMode> component to enable additional checks and warnings for your application
  // (Note: This is optional and can be removed if not needed)
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
