const xss = require('xss')
const Treeize = require('treeize')

const AlbumsService = {
  getAllAlbums(db) {
    return db
      .from('albums')
      .select('*')
  },
  getById(db, id) {
    return AlbumsService.getAllAlbums(db)
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
        'rev.user_id',
        'rev.date_created'
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
        'rev.user_id',
        'rev.date_created'
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
      date_created: reviewData.date_created
    }
  }
}

// const userFields = [
//   'usr.id AS user:id',
//   'usr.user_name AS user:user_name',
//   'usr.full_name AS user:full_name',
//   'user.date_created AS user:date_created'
// ]

module.exports = AlbumsService