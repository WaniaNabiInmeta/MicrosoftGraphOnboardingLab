import React from 'react';
import logo from './logo.svg';
import './App.css';
import { loginRequest, pca } from './authConfig';
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { Client } from '@microsoft/microsoft-graph-client';
import { InteractionType } from '@azure/msal-browser';
function App() {
  const account = pca.getActiveAccount();

  const onClick = async () => {
    const token = await pca.acquireTokenSilent(loginRequest);

    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
      account: token.account, 
      interactionType: InteractionType.Popup,
      scopes: ['User.Read'],
    })

    const graphClient = Client.initWithMiddleware({ authProvider: authProvider });

    const user = await graphClient.api('/me/calendar').get();

    console.log(user);
  }

  return (
    <div className="App">
      {account && <div>{account.username}</div>}
      <button onClick={onClick}>trykk meg</button>
    </div>
  );
}

export default App;
