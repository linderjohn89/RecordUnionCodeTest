const express = require('express');
const app = express();
const SpotifyResponse = require('../models/spotifyResponse');
const spotifyService = require('../services/SpotifyService');

// Express route
const spotifyExpressRoute = express.Router();

spotifyExpressRoute.route('/searchartist/:artist').get(async (req, res) => {
    await spotifyService.auth().then((token) => {
        spotifyService.searchArtist(req.params.artist, token.access_token).then((response) => {
            res.json(response.data.artists.items.map(
                item => {
                    return new SpotifyResponse(item.id, item.name);
                }
            ));
        }
        ).catch((err) => res.json(err.data));
    });


})


module.exports = spotifyExpressRoute;
