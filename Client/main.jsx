import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { io } from "socket.io-client"
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

const socket = io('http://localhost:8080', {
  path: '/socket.io/',
  autoConnect: false,
  withCredentials: true
});

// const domain =  import.meta.env.VITE_AUTH0_DOMAIN;
// const clientId =  import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <App socket={socket}/>
  );

  // {/* </Auth0Provider > */}
  // <Auth0Provider
  // domain={domain}
  // clientId={clientId}
  // redirectUri={import.meta.env.VITE_REDIRECT_CLIENT}
  // >