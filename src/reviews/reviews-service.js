const ReviewsService = {
  getById(db, id) {
    return db
      .from('ratemusic_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.image',
        'rev.title',
        'rev.content',
        'rev.user_id',
      )
      .leftJoin(
        'ratemusic_users',
        'rev.user_id',
        'rev.album_id'
      )
      .where('rev.id', id)
      .first()
  },

  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('ratemusic_reviews')
      .returning('*')
      .then(([review]) => review)
      .then(review => ReviewsService.getById(db, review.id))
  },

  serializeReview(review) {
    return {
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      user_id: review.user_id,
      album_id: review.album_id,
      date_created: review.date_created
    }
  }
}

module.exports = ReviewsService