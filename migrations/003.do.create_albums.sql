CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  art TEXT NOT NULL,
  year INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  review_id INTEGER REFERENCES ratemusic_reviews(id) ON DELETE CASCADE NOT NULL
);

ALTER TABLE ratemusic_reviews
  ADD COLUMN
    album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE;
