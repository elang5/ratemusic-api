CREATE TABLE ratemusic_reviews (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL,
  album_id STRING NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);