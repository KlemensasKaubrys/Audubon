const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs'); 
const app = express(); 
const favicon = require('serve-favicon');

// Load SSL certificate and private key
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  };

const PORT = 3000;

// Serving the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serving the html files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });