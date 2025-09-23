
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Import karein
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* App ko isse wrap karein */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);