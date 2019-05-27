const express = require('express')
const AlbumsService = require('./albums-service')
const albumsRouter = express.Router()

albumsRouter
  .route('/')
  .get((req, res, next) => {
    AlbumsService.getAllAlbums(req.app.get('db'))
      .then(albums => {
        res.json(AlbumsService.serializeAlbums(albums))
      })
      .catch(next)
  })

albumsRouter
  .route('/:album_id')
  .all(checkAlbumExists)
  .get((req, res) => {
    res.json(AlbumsService.serializeAlbum(res.album))
  })

albumsRouter.route('/:album_id/reviews/')
  .all(checkAlbumExists)
  .get((req, res, next) => {
    AlbumsService.getReviewsForAlbum(
      req.app.get('db'),
      req.params.album_id
    )
      .then(reviews => {
        res.json(AlbumsService.serializeAlbumReviews(reviews))
      })
      .catch(next)
  })
  

async function checkAlbumExists(req, res, next) {
  try {
    const album = await AlbumsService.getById(
      req.app.get('db'),
      req.params.album_id
    )

    if(!album)
      return res.status(404).json({
        error: `Album doesn't exist`
      })

    res.album = album
    next()
  } catch(error) {
    next(error)
  }
}

module.exports = albumsRouter