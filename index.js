const express = require("express")
const msal = require('@azure/msal-node')

const SERVER_PORT = process.env.PORT || 3000

const app = express()

const config = require('./secret-config')
const cca = new msal.ConfidentialClientApplication(config);

// 1. angular app route
app.get('/', (req, res) => {
    res.sendStatus(200)
});

// 2. middleware endpoint
app.get('/login', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/sso-redirect",
    };    
    
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

// 3. middleware endpoint
app.get('/sso-redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/sso-redirect",
    };
    
    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);        
        const email = response.account.idTokenClaims.preferred_username

        res.redirect(`/logged-in?email=${email}`);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});

// 4. angular app route
app.get('/logged-in', (req, res) => {
    res.send(req.query.email)
});

app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))