const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
    console.log('NODE')
    res.sendFile(path.join(__dirname, 'build', 'inxdex.html'));
});

app.listen(3000);