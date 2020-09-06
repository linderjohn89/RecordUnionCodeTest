const SpotifyResponse = require("../models/spotifyResponse");
var buffer = require('buffer/').Buffer;

const client_id = 'b4821faf687d4137ae12b735034ab9fd';
const client_secret = '8d1bc161e3ca4267ba35d2efb710f3c6';
const base_url = 'https://api.spotify.com/v1/';
const auth_url = 'https://accounts.spotify.com/'

const axios = require('axios');

var authOptions = {
    url: auth_url,
    headers: {
        'Authorization': 'Basic ' + (buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

async function auth() {
    return await axios.post(auth_url + 'api/token?grant_type=client_credentials', null, authOptions)
        .then((res) => {
            return res.data;
        }).catch((err) => { return err.response })
}


async function searchArtist(artist, token) {
    var searchOptions = {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    };

    return await axios.get(base_url + 'search?q=' + artist + '&type=artist', searchOptions).then((res) => {
        return res;
    }).catch((err) => { return err.response });
}



module.exports = {
    searchArtist,
    auth
};