ALTER TABLE ratemusic_reviews
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS ratemusic_users;