const express = require('express')
const path = require('path')
const ReviewsService = require('./reviews-service')
const { requireAuth } = require('../middleware/jwt-auth')
const reviewsRouter = express.Router()
const jsonBodyParser = express.json()

reviewsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { album_id, rating, title, content, image } = req.body
    const newReview = { album_id, title, content, rating, image }
    console.log(req.body)

    for (const [key, value] of Object.entries(newReview))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newReview.user_id = req.user.id

    ReviewsService.insertReview(
      req.app.get('db'),
      newReview
    )
      .then(review => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(ReviewsService.serializeReview(review))
      })
      .catch(next)
  })

  reviewsRouter
    .route('/')
    .get((req, res, next) => {
      ReviewsService.getReviews(
        req.app.get('db')
      )
        .then(reviews => res.json(reviews))
        .catch(next)
    })

  reviewsRouter
    .route('/:reviewId')
    .delete(requireAuth, (req, res, next) => {
      const id = parseInt(req.params.reviewId)
      ReviewsService.deleteReview(
        req.app.get('db'),
        id
      )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
    })

  module.exports = reviewsRouter