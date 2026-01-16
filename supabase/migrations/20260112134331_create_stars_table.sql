/*
  # Create Stars Table

  1. New Tables
    - `stars`
      - `id` (uuid, primary key)
      - `name` (text, required) - Celebrity name
      - `category` (text, required) - Category like Actor, Athlete, Creator, Musician
      - `image_url` (text, required) - Profile image URL
      - `rating` (numeric) - Average rating 0-5
      - `reviews_count` (integer) - Number of reviews
      - `price` (integer) - Price in dollars for a video
      - `is_featured` (boolean) - Whether to show in featured section
      - `bio` (text) - Short biography
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `stars` table
    - Add policy for public read access (stars are public data)

  3. Seed Data
    - Initial set of celebrity profiles
*/

CREATE TABLE IF NOT EXISTS stars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  rating numeric(2,1) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  reviews_count integer DEFAULT 0,
  price integer NOT NULL CHECK (price > 0),
  is_featured boolean DEFAULT false,
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stars are publicly readable"
  ON stars
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO stars (name, category, image_url, rating, reviews_count, price, is_featured, bio) VALUES
  ('Alex Sterling', 'Actor', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 2840, 199, true, 'Award-winning actor known for dramatic roles'),
  ('Jordan Blake', 'Athlete', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600', 5.0, 1256, 299, true, 'Professional basketball player and sports influencer'),
  ('Mia Chen', 'Creator', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 4521, 99, true, 'Top lifestyle and beauty content creator'),
  ('David Park', 'Musician', 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 892, 249, true, 'Grammy-nominated producer and singer'),
  ('Sarah Mitchell', 'Actor', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600', 4.7, 1523, 179, false, 'Rising star in independent cinema'),
  ('Marcus Thompson', 'Athlete', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 987, 199, false, 'Olympic gold medalist swimmer'),
  ('Emma Rodriguez', 'Creator', 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600', 4.6, 3200, 79, false, 'Comedy and lifestyle vlogger'),
  ('Jake Wilson', 'Musician', 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 2100, 299, false, 'Rock band frontman and songwriter'),
  ('Olivia Kim', 'Actor', 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600', 4.5, 756, 149, false, 'Television drama lead actress'),
  ('Chris Anderson', 'Athlete', 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=600', 4.7, 1890, 249, false, 'Professional soccer player'),
  ('Nina Patel', 'Creator', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 5600, 129, false, 'Tech reviewer and gadget expert'),
  ('Ryan Cooper', 'Musician', 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600', 4.6, 1340, 179, false, 'Indie folk singer-songwriter'),
  ('Ashley Brown', 'Actor', 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 3100, 229, false, 'Broadway star and voice actress'),
  ('Tyler Martinez', 'Athlete', 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600', 4.4, 678, 159, false, 'Professional skateboarder'),
  ('Lisa Wang', 'Creator', 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=600', 4.7, 4200, 109, false, 'Cooking and food content creator'),
  ('Daniel Scott', 'Musician', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 2890, 269, false, 'Hip-hop artist and music producer');

CREATE INDEX IF NOT EXISTS idx_stars_category ON stars(category);
CREATE INDEX IF NOT EXISTS idx_stars_rating ON stars(rating DESC);
CREATE INDEX IF NOT EXISTS idx_stars_price ON stars(price);
CREATE INDEX IF NOT EXISTS idx_stars_is_featured ON stars(is_featured);