const xss = require('xss')
const Treeize = require('treeize')

const AlbumsService = {
  getAlbumIds(db) {
    return db('ratemusic_reviews')
      .select('album_id')
  },
  getById(db, id) {
    return AlbumsService.getAlbumIds(db)
      .where({ id })
      .first()
  },
  getReviewsForAlbum(db, album_id) {
    return db
      .from('ratemusic_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.title',
        'rev.content',
        'rev.album_id',
        'rev.date_created',
        ...userFields
      )
      .where('rev.album_id', album_id)
      .leftJoin(
        'ratemusic_users AS usr',
        'rev.user_id',
        'usr.id'
      )
      .groupBy('rev.id', 'usr.id')
  },
  getReviewForAlbum(db, review_id) {
    return db
      .from('ratemusic_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.title',
        'rev.content',
        'rev.album_id',
        'rev.date_created',
        ...userFields
      )
      .where('rev.id', review_id)
      .leftJoin(
        'ratemusic_users AS usr',
        'rev.user_id',
        'usr.id'
      )
      .groupBy('rev.id', 'usr.id')
  },
  serializeAlbums(albums) {
    return albums.map(this.serializeAlbum)
  },
  serializeAlbum(album) {
    const albumTree = new Treeize()

    const albumData = albumTree.grow([ album ]).getData()[0]

    return {
      id: albumData.id,
      title: xss(albumData.title),
      artist: xss(albumData.artist),
      year: albumData.year,
      rating: albumData.rating,
      art: albumData.art
    }
  },

  serializeAlbumReviews(reviews) {
    return reviews.map(this.serializeAlbumReview)
  },
  serializeAlbumReview(review) {
    const reviewTree = new Treeize()

    const reviewData = reviewTree.grow([ review ]).getData()[0]

    return {
      id: reviewData.id,
      album_id: reviewData.album_id,
      user_id: reviewData.user_id,
      title: reviewData.title,
      content: reviewData.content,
      rating: reviewData.rating,
      user: reviewData.user || {},
      date_created: reviewData.date_created
    }
  }
}

const userFields = [
  'usr.id AS user_id',
  'usr.user_name AS user_name',
  'usr.full_name AS full_name',
  'usr.date_created AS date_created',
]


module.exports = AlbumsService