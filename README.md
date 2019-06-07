# Ratemusic Server

This is the API which runs alongside the RateMusic Client 

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

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.