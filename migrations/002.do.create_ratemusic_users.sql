CREATE TABLE ratemusic_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE ratemusic_reviews 
  ADD COLUMN
    user_id INTEGER REFERENCES ratemusic_users(id)
    ON DELETE CASCADE;