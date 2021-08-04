Example app created using tutorial at https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-webapp-msal

### Template for secret-config.js

```
const msal = require('@azure/msal-node')

module.exports = {
    auth: {
        clientId: "Enter_the_Application_Id",
        authority: "Enter_the_Cloud_Instance_Id_Here/Enter_the_Tenant_Id_here",
        clientSecret: "Enter_the_Client_secret"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};
```

More info is in the tutorial in the [Add app registration details](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-nodejs-webapp-msal#add-app-registration-details) section