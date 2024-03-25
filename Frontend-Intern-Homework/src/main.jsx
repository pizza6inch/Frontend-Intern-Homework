import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // (Note: This is optional and can be removed if not needed)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
