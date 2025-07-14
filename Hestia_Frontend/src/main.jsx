import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider';
import VendorSelectProvider from './context/VendorSelectProvider'
import PasscodeProvider from './context/PasscodeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider> 
  <React.StrictMode>
    <PasscodeProvider>
    <VendorSelectProvider>
    <App />
   </VendorSelectProvider>
   </PasscodeProvider>
  </React.StrictMode>
  </AuthProvider>
)
