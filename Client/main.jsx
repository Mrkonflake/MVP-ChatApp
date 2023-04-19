import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import msalConfig from './auth/authConfig.js';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import './index.css'

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>

);
