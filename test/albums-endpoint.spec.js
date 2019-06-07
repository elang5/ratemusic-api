const knex = require('knex')
const app = require('../src/app')
const helpers = require('./helpers')
const SpotifyApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:8888/callback/'
})


describe('Albums Endpoints', function() {
  let db
  const authToken = app.get('spotifyAuthToken')
  const {
    testUsers,
    testReviews,
    testAlbums
  } = helpers.makeFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
    spotifyApi.setAccessToken(authToken)
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
    context('Given there are albums in the database', () => {
      beforeEach('insert data', () =>
        helpers.seedTables(
          db,
          testUsers,
          testAlbums,
          testReviews,
        )
      )

      it('responds with 200 and the specified album', () => {
        const albumId = '23dKNZpiadggKHrQgHLi3L'
        return supertest(app)
          .get(`/api/albums/${albumId}`)
          .expect(200)
      })
    })
    })
  })

  describe(`GET /api/albums/:album_id/reviews`, () => {
      it(`responds with 404`, () => {
        const albumId = 123456;
        return supertest(app)
          .get(`/api/albums/${albumId}/reviews`)
          .expect(404, { error: `Album doesn't exist` })
      })

    context('Given there are reviews for album in the database', () => {
      beforeEach('insert things', () =>
        helpers.seedTables(
          db,
          testUsers,
          testAlbums,
          testReviews,
        )
      )

      it.skip('responds with 200 and the specified reviews', () => {
        const albumId = 1
        console.log(testReviews)
        const expectedReviews = helpers.makeExpectedAlbumReviews(
          testUsers, albumId, testReviews
        )
        
        return supertest(app)
          .get(`/api/albums/${albumId}/reviews`)
          .expect(200)
          .then(res => {
            expect(res.body).to.eql(expectedReviews)
          })
      })
    })
  })
})
