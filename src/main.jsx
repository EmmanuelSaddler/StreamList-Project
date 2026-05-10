import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './sw-registration'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="YOUR GOOGLE OAUTH CLIENT KEY HERE">
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)
