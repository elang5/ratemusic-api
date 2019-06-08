require('dotenv').config()
const express = require('express')
const AlbumsService = require('./albums-service')
const albumsRouter = express.Router()
const { spotifyApi } = require('../spotify')

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
    spotifyApi.getAlbum(req.params.album_id)
      .then(album => {
        if(!album) {
          res.status(404).json({ error: 'No reviews were found for this album. Be the first to post one!' })
        } else {
          res.json(album.body)
        }
      })
      .catch(err => res.json(err.error))
      .catch(next)
  })

albumsRouter.route('/:album_id/reviews/')
  .get((req, res, next) => {
    AlbumsService.getReviewsForAlbum(
      req.app.get('db'),
      req.params.album_id
    )
      .then(reviews => {
        if(reviews.length < 1) {
          res.status(404).json({ error: 'No reviews were found.'})
        } else {
          res.json(reviews)
        }
      })
      .catch(next)
  })

  albumsRouter.route('/:album_id/reviews/:review_id')
  .get((req, res, next) => {
    AlbumsService.getReviewForAlbum(
      req.app.get('db'),
      req.params.review_id,
      req.params.album_id
    )
      .then(review => {
        if(review.length < 1) {
          res.status(404).json('Review not found')
        } else {
          res.json(review)
        }
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