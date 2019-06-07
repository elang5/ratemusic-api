const knex = require('knex')
const app = require('./app')
const { PORT } = require('./config')
const { DB_URL } = require('./config')
const getAuthToken = require('./spotifyRefresh')

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

getAuthToken(authToken => {
  app.set('spotifyAuthToken', authToken)

  setInterval(() => {
    getAuthToken(authToken => app.set('spotifyAuthToken', authToken))
  }, 3600000)

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
  })
})
