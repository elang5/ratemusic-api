require('dotenv').config()
const request = require('request')
const SpotifyApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:8888/callback/'
})

const getAuthToken = (callback) => {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: process.env.REFRESH_TOKEN
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
    
    callback(access_token)
    }
  });
}

module.exports = {
  spotifyApi,
  getAuthToken
}


