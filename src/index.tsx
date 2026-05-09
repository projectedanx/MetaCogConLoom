import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * The main entry point for the Meta-Cognitive Context Loom Visualizer application.
 * Finds the root element and renders the React application inside it.
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
