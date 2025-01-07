import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "YOUR_MICROSOFT_CLIENT_ID",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
