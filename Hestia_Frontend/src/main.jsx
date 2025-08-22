import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider';
import VendorSelectProvider from './context/VendorSelectProvider'
import TotalPointsProvider from './context/TotalPointsProvider.jsx';
import { BrowserRouter } from 'react-router-dom';

const basename =
  import.meta.env?.BASE_URL ||  // works for Vite
  process.env?.PUBLIC_URL ||    // works for CRA
  "/"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
    <AuthProvider> 
    <React.StrictMode>
      <TotalPointsProvider>
      <VendorSelectProvider>
      <App />
    </VendorSelectProvider>
    </TotalPointsProvider>
    </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
)
