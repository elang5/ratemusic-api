require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./auth/auth-router');
const errorHandler = require('./error/error');
const corsOptions = require('./cors/cors');

const { NODE_ENV } = require('./config');

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const albumsRouter = require('./albums/albums-router')
const reviewsRouter = require('./reviews/reviews-router')

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors(corsOptions));
app.use(helmet());

app.use('/api/albums', albumsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler);
  

module.exports = app;
