import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if (window.location.protocol == 'http:') {        
  window.location.href = window.location.href.replace('http:', 'https:');
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
