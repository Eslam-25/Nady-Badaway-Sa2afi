//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    next();
});

// Serve only the static files form the dist directory
app.use(express.static('./dist'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/' }),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);