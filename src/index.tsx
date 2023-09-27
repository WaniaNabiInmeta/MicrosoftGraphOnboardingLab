import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { pca } from './authConfig';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';

pca.initialize().then(() => {
  const accounts = pca.getAllAccounts()

  if(accounts.length > 0) {
    pca.setActiveAccount(accounts[0]);
  } else {
    pca.loginPopup()
  }

  pca.addEventCallback((event: EventMessage) => {
    if(event.eventType === EventType.LOGIN_SUCCESS) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      pca.setActiveAccount(account);
    }if(event.eventType === EventType.LOGIN_FAILURE){
      console.log(event);
    }
  })


  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
