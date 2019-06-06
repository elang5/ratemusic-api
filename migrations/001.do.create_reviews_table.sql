CREATE TABLE ratemusic_reviews (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL,
  album_id TEXT NOT NULL,
  image TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);