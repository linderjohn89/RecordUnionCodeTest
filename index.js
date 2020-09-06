var express = require("express");
const bodyParser = require('body-parser');
var app = express();
const spotifyController = require('./controllers/SpotifyController');

app.use(bodyParser.json());

app.use('/spotify', spotifyController);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});