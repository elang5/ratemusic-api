const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeReviewsArray(users, albums) {
  return [
    {
      id: 1,
      title: 'First test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[0].id,
      album_id: albums[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[1].id,
      album_id: albums[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[2].id,
      album_id: albums[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[3].id,
      album_id: albums[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeAlbumsArray() {
  return [
    {
      id: 1,
      rating: 8,
      title: 'First test album',
      artist: 'Test',
      art: 'http://placehold.it/500x500',
      year: 2019
    },
    {
      id: 2,
      rating: 8,
      title: 'Second test album',
      artist: 'Test',
      art: 'http://placehold.it/500x500',
      year: 2019
    },
    {
      id: 3,
      rating: 8,
      title: 'Third test album',
      artist: 'Test',
      art: 'http://placehold.it/500x500',
      year: 2019
    },
    {
      id: 4,
      rating: 8,
      title: 'Fourth test album',
      artist: 'Test',
      art: 'http://placehold.it/500x500',
      year: 2019
    }
  ]
}

function makeFixtures() {
  const testUsers = makeUsersArray()
  const testAlbums = makeAlbumsArray()
  const testReviews = makeReviewsArray(testUsers, testAlbums)
  return { testUsers, testReviews, testAlbums }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      ratemusic_users,
      albums,
      ratemusic_reviews
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password:bcrypt.hashSync(user.password, 1)
  }))
  return db.into('ratemusic_users')
    .insert(preppedUsers)
    .then(() => {
      db.raw(
        `SELECT setval('ratemusic_reviews_id_seq', ?)`,
        [users[users.length - 1].id]
      )
    })
}

function seedTables(db, users, albums, reviews) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('albums').insert(albums)
    await trx.into('ratemusic_reviews').insert(reviews)
    await trx.raw(
      `SELECT setval('albums_id_seq', ?)`,
      [albums[albums.length -1].id]
    )
  })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256'
  })
  return `Bearer ${token}`
}

function makeExpectedAlbum(album) {
  return {
    id: album.id,
    title: album.title,
    artist: album.artist,
    year: album.year,
    art: album.art,
    rating: album.rating
  }
}

function makeExpectedAlbumReviews(users, albumId, reviews) {
  const expectedReviews = reviews.filter(review => review.album_id === albumId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    return {
      id: review.id,
      title: review.title,
      image: review.image,
      rating: review.rating,
      user_id: reviewUser.id,
      album_id: review.user_id,
      date_created: review.date_created,
      content: review.content
    }
  })
}

module.exports = {
  makeUsersArray,
  makeAlbumsArray,
  makeReviewsArray,
  
  makeFixtures,
  cleanTables,
  seedUsers,
  seedTables,
  makeAuthHeader,
  makeExpectedAlbum,
  makeExpectedAlbumReviews
}