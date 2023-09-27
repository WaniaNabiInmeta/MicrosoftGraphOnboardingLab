import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
   clientId: "754517d0-f1f4-46f4-8997-5a83638f7bf2",
   authority: "https://login.microsoftonline.com/774a48f6-1176-4f50-8547-93cb7431c8ef",
   redirectUri: "http://localhost:3000"
  }
}

export const loginRequest = {
  scopes: ['user.read']

}

export const pca = new PublicClientApplication(msalConfig)