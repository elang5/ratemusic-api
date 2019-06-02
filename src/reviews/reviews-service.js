const ReviewsService = {
  getById(db, id) {
    return db
      .from('ratemusic_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.title',
        'rev.content',
        'rev.user_id',
        db.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT
                usr.id,
                usr.user_name,
                usr.full_name,
                usr.date_created
            ) tmp)
          ) AS "user"`
        )
      )
      .leftJoin(
        'ratemusic_users AS usr',
        'rev.user_id',
        'usr.id',
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

  // write tests for deleting review
  deleteReview(db, id) {
    return db
      .from('ratemusic_reviews')
      .where({ id })
      .delete()
  },

  serializeReview(review) {
    return {
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      user: review.user || {},
      album_id: review.album_id,
      date_created: review.date_created
    }
  }
}

module.exports = ReviewsService