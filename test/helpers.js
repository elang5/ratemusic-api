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

function makeReviewsArray(users) {
  return [
    {
      id: 1,
      title: 'First test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[0].id,
      album_id: '23dKNZpiadggKHrQgHLi3L',
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[1].id,
      album_id: '23dKNZpiadggKHrQgHLi3L',
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[2].id,
      album_id: '23dKNZpiadggKHrQgHLi3L',
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test review!',
      image: 'http://placehold.it/500x500',
      rating: 8,
      user_id: users[3].id,
      album_id: '23dKNZpiadggKHrQgHLi3L',
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeFixtures() {
  const testUsers = makeUsersArray()
  const testReviews = makeReviewsArray(testUsers)
  return { testUsers, testReviews }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      ratemusic_users,
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

function seedTables(db, users, reviews) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('ratemusic_reviews').insert(reviews)
  })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256'
  })
  return `Bearer ${token}`
}

function makeExpectedAlbumReviews(albumId, reviews) {
  const expectedReviews = reviews.filter(review => review.album_id === albumId)
  return expectedReviews}

module.exports = {
  makeUsersArray,
  makeReviewsArray,
  
  makeFixtures,
  cleanTables,
  seedUsers,
  seedTables,
  makeAuthHeader,
  makeExpectedAlbumReviews
}