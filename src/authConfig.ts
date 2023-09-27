import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
   clientId: "Client_ID",
   authority: "https://login.microsoftonline.com/{TENANT_ID}",
   redirectUri: "{REDIRECT_URI}"
  }
}

export const loginRequest = {
  scopes: ['user.read']
}

export const pca = new PublicClientApplication(msalConfig)