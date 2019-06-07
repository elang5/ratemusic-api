const knex = require('knex')
const app = require('../src/app')
const helpers = require('./helpers')

describe('Reviews Endpoints', function() {
  let db

  const {
    testUsers,
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

  describe(`POST /api/reviews`, () => {
    beforeEach('insert data', () =>
      helpers.seedTables(
        db,
        testUsers
      )
    )

    it(`creates a review, responding with 201 and the new review`, () => {
      this.retries(3)
      const testUser = testUsers[0]
      const newReview = {
        title: 'Test new review',
        rating: 3,
        album_id: '23dKNZpiadggKHrQgHLi3L',
        image: 'test url',
        content: 'test review content',
      }
      return supertest(app)
        .post('/api/reviews')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newReview)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.rating).to.eql(newReview.rating)
          expect(res.body.title).to.eql(newReview.title)
          expect(res.body.content).to.eql(newReview.content)
          expect(res.headers.location).to.eql(`/api/reviews/${res.body.id}`)
        })
        .expect(res =>
          db
            .from('ratemusic_reviews')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.title).to.eql(newReview.title)
              expect(row.rating).to.eql(newReview.rating)
              expect(row.album_id).to.eql(newReview.album_id)
              expect(row.image).to.eql(newReview.image)
              expect(row.content).to.eql(newReview.content)
              const expectedDate = new Date().toLocaleString()
              const actualDate = new Date(row.date_created).toLocaleString()
              expect(actualDate).to.eql(expectedDate)
            })
        )
    })

    const requiredFields = ['title', 'rating', 'album_id', 'content', 'image']

    requiredFields.forEach(field => {
      const testUser = testUsers[0]
      const newReview = {
        title: 'Test new review',
        rating: 3,
        album_id: '23dKNZpiadggKHrQgHLi3L',
        image: 'test url',
        content: 'test review content'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field]
        return supertest(app)
          .post('/api/reviews')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newReview)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})
