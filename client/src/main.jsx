import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx';
import { SearchProvider } from './context/search.jsx'
import { CartProvider } from './context/cart.jsx'
import axios from 'axios'
import API_BASE_URL from './config/api.js'

// Configure axios base URL
axios.defaults.baseURL = API_BASE_URL;

createRoot(document.getElementById('root')).render(
<AuthProvider>
  <SearchProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </SearchProvider>
</AuthProvider>
 
);
