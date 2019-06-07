require('dotenv').config()
const express = require('express')
const AlbumsService = require('./albums-service')
const albumsRouter = express.Router()
const SpotifyApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:8888/callback/'
})

albumsRouter
  .route('/')
  .get((req, res, next) => {
    const authToken = req.app.get('spotifyAuthToken')
    spotifyApi.setAccessToken(authToken)
    AlbumsService.getAlbumIds(req.app.get('db'))
      .then(albumIds => {
        const preppedIds = albumIds
          .map(alb => alb.album_id)
          .filter((id, index, self) => self.indexOf(id) === index)
        spotifyApi.getAlbums(preppedIds)
          .then(albums => res.json(albums.body.albums))
          .catch(err => res.json(err))
      })
      .catch(next)
  })

albumsRouter
  .route('/:album_id')
  .get((req, res, next) => {
    const authToken = req.app.get('spotifyAuthToken')
    spotifyApi.setAccessToken(authToken)
    AlbumsService.getAlbumIds(
      req.app.get('db') 
    )
      .then(albumIds => {
        const filteredId = albumIds.filter(alb => alb.album_id === req.params.album_id)
        spotifyApi.getAlbum(filteredId[0].album_id)
          .then(album => res.json(album.body))
          .catch(err => res.json(err))
      })
      .catch(next)
  })

albumsRouter.route('/:album_id/reviews/')
  .get((req, res, next) => {
    AlbumsService.getReviewsForAlbum(
      req.app.get('db'),
      req.params.album_id
    )
      .then(reviews => {
        res.json(reviews)
      })
      .catch(next)
  })

  albumsRouter.route('/:album_id/reviews/:review_id')
  .get((req, res, next) => {
    AlbumsService.getReviewForAlbum(
      req.app.get('db'),
      req.params.review_id
    )
      .then(review => {
        res.json(review)
      })
      .catch(next)
  })

  albumsRouter.route('/search/:search_term')
    .get((req, res, next) => {
      const authToken = req.app.get('spotifyAuthToken')
      spotifyApi.setAccessToken(authToken)
      spotifyApi.searchAlbums(req.params.search_term)
        .then(albums => res.json(albums.body.albums))
        .catch(next)
    })
  

module.exports = albumsRouter