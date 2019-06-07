const knex = require('knex')
const app = require('../src/app')
const helpers = require('./helpers')
const { getAuthToken, spotifyApi } = require('../src/spotify')

describe('Albums Endpoints', function() {
  let db
  const {
    testUsers,
    testReviews
  } = helpers.makeFixtures()

  before('make knex instance', (done) => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)

    getAuthToken(authToken => {
      app.set('spotifyAuthToken', authToken)
      spotifyApi.setAccessToken(authToken)
      done()
    })
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/albums`, () => {

  it('responds with 200 and all the albums', () => {
    return supertest(app)
      .get('/api/albums')
      .expect(200)
  })
  
  describe(`GET /api/albums/:album_id`, () => {
      beforeEach('insert things', () =>
      helpers.seedTables(
        db,
        testUsers,
        testReviews
      ))
      it('responds with 200 and the specified album', () => {
        const albumId = '23dKNZpiadggKHrQgHLi3L'
        return supertest(app)
          .get(`/api/albums/${albumId}`)
          .expect(200)
      })
      it('responds with 404 when given a nonexistent id', () => {
        const albumId = 1
        return supertest(app)
          .get(`/api/albums/${albumId}`)
          .expect(404, { error: 'Album not found' })
      })
    })
  })

  describe(`GET /api/albums/:album_id/reviews`, () => {
      it(`responds with 404`, () => {
        const albumId = 123456;
        return supertest(app)
          .get(`/api/albums/${albumId}/reviews`)
          .expect(404, { error: 'Album not found' })
      })

    context('Given there are reviews for album in the database', () => {
      beforeEach('insert things', () =>
        helpers.seedTables(
          db,
          testUsers,
          testReviews
        )
      )

      it('responds with 200 and the specified reviews', () => {
        const albumId = '23dKNZpiadggKHrQgHLi3L'
        const expectedReviews = helpers.makeExpectedAlbumReviews(
          albumId, testReviews
        )
        // Map through expected reviews in order to implement user references, which are added to the res.body when a request is made to /api/albums/:album_id/reviews and they cannot be directly added to the dummy data in the test helpers file
        const expectedReviewsWithUsers = expectedReviews.map((review, index) => {
          return {
            ...review,
            full_name: `Test user ${index+1}`,
            user_name: `test-user-${index+1}`
          }
        })
        return supertest(app)
          .get(`/api/albums/${albumId}/reviews`)
          .expect(200)
          .then(res => {
            expect(res.body).to.eql(expectedReviewsWithUsers)
          })
      })
    })
  })
})
