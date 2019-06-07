const knex = require('knex')
const app = require('../src/app')
const helpers = require('./helpers')


describe('Albums Endpoints', function() {
  let db

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
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/albums`, () => {

  describe(`GET /api/albums/:album_id`, () => {
    context(`Given no albums`, () => {
      it(`responds with 404`, () => {
        const albumId = 123456;
        return supertest(app)
          .get(`/api/albums/${albumId}`)
          .expect(404, { error: `Album doesn't exist` })
      })
    })

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
        const albumId = 2
        const expectedAlbum = helpers.makeExpectedAlbum(
          testAlbums[albumId - 1]
        )

        return supertest(app)
          .get(`/api/albums/${albumId}`)
          .expect(200, expectedAlbum)
      })
    })
    })
  })

  describe(`GET /api/albums/:album_id/reviews`, () => {
    context(`Given no albums`, () => {
      it(`responds with 404`, () => {
        const albumId = 123456;
        return supertest(app)
          .get(`/api/albums/${albumId}/reviews`)
          .expect(404, { error: `Album doesn't exist` })
      })
    })

    context('Given there are reviews for thing in the database', () => {
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
