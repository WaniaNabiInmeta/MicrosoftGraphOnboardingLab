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
    let events = await graphClient.api('/me/events')
    .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
    .get();

    const event = {subject: 'Let\'s go for lunch',body: {contentType: 'HTML',content: 'Does noon work for you?'},start: {dateTime: '2023-10-15T12:00:00',timeZone: 'Pacific Standard Time'},end: {dateTime: '2023-10-15T14:00:00',timeZone: 'Pacific Standard Time'},location: {displayName: 'Harry\'s Bar'},attendees: [{emailAddress: {address: 'samanthab@contoso.onmicrosoft.com',name: 'Samantha Booth'},type: 'required'}],allowNewTimeProposals: true,transactionId: '7E163156-7762-4BEB-A1C6-729EA81755A7'};
    await graphClient.api('/me/calendar/events').post(event);
    console.log(event);

  }

  return (
    <div className="App">
      {account && <div>{account.username}</div>}
      <button onClick={onClick}>trykk meg</button>
    </div>
  );
}

export default App;
