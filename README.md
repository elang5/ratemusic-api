# Rate Music Server

This is the API which runs alongside the Rate Music client (https://github.com/elang5/ratemusic-client)

## Introduction

This is the server documentation for Rate Music (https://ratemusic-server.herokuapp.com/), a music reviewing service using Spotify's API to allow users to listen to music directly from the website.

## Summary 

This API utilizes Spotify's powerful Web API to search across thousands of albums. References to these ids are stored and referenced in reviews, along with a respective user id. Reviews and users are stored in a PostgreSQL database, with Knex.js used for SQL query building. 

## Tech Stack
* Node
* Express
* PostgreSQL
* Knex
* Morgan
* JSONWebToken
* BCryptJS
* dotEnv
* Mocha
* Chai
* Expect
* Supertest
* Spotify Web API Node
* Treeize
* Request
* XSS
* Helmet
* CORS

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb ratemusic`, `createdb ratemusic-test`
- Create database user: `createuser ratemusic`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE ratemusic TO ratemusic`
  - `GRANT ALL PRIVILEGES ON DATABASE "thingful-test" TO ratemusic`
- Prepare environment file: `cp example.env .env`
  - Replace values in `.env` with your custom values if necessary.
- Bootstrap development database: `MIGRATION_DB_NAME=ratemusic npm run migrate`
- Bootstrap test database: `MIGRATION_DB_NAME=ratemusic-test npm run migrate`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## API Overview

```text
/api
.
├── /auth
│   └── POST
│       ├── /login
├── /users
│   └── POST
│       └── /
├── /albums
│   └── GET
│       ├── /
│       ├── /:id
│       ├── /:id/reviews
│       ├── /:id/reviews/:review_id
├── /reviews
│   └── POST
│       └── /
│   └── GET
│       ├── /
│       ├── /:id
```

### POST `api/auth/login

```js
// req.body
{
  user_name: String,
  password: String
}

// res.body
{
  authToken: String
}
```

### POST `api/users`
```js
// req.body
{
  full_name: String,
  user_name: String,
  password: String
}

// res.body
{
  id: Number,
  full_name: String,
  user_name: String,
  date_created: String
}
```

### GET `api/albums`
```js
// res.body
[
  {
    album_type: String,
    artists: [],
    ...
  },
  ...
]
```
### GET `api/albums/:id`
```js
// res.body 
[
  {
    album_type: String,
    artists: [],
    ...
  }
]
```
### GET `api/albums/:id/reviews`
```js
// res.body
[
  {
    id: Number,
    rating: Number,
    title: String,
    content: String,
    album_id: String,
    date_created: String,
    image: String,
    user_id: Number,
    user_name: String,
    full_name: String
  },
  ...
]
```
### GET `api/albums/:id/reviews/:review_id`
```js
// res.body
[
  {
    id: Number,
    rating: Number,
    title: String,
    content: String,
    album_id: String,
    date_created: String,
    image: String,
    user_id: Number,
    user_name: String,
    full_name: String
  }
]
```

### GET `api/reviews`
```js
// res.body
[
  {
    id: Number,
    rating: Number,
    title: String,
    content: String,
    album_id: String,
    date_created: String,
    image: String,
    user_id: Number,
    user_name: String,
    full_name: String
  },
  ...
]
```
### GET `api/reviews/:id/`
```js
// res.body
[
  {
    id: Number,
    rating: Number,
    title: String,
    content: String,
    album_id: String,
    date_created: String,
    image: String,
    user_id: Number,
    user_name: String,
    full_name: String
  }
]
```

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.