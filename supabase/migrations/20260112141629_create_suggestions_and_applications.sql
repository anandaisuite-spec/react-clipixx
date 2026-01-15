/*
  # Create Star Suggestions and Creator Applications Tables

  1. New Tables
    - `star_suggestions`
      - `id` (uuid, primary key)
      - `celebrity_name` (text, required) - Name of the suggested celebrity
      - `category` (text, required) - Category like Actor, Athlete, Creator, Musician
      - `social_links` (text) - Social media links or website
      - `reason` (text) - Why they should be on the platform
      - `submitter_email` (text, required) - Email of the person suggesting
      - `status` (text) - pending, reviewed, approved, rejected
      - `created_at` (timestamptz)

    - `creator_applications`
      - `id` (uuid, primary key)
      - `full_name` (text, required) - Applicant's full name
      - `email` (text, required) - Contact email
      - `category` (text, required) - Their category/niche
      - `social_links` (text, required) - Social media profiles
      - `followers_count` (text) - Approximate follower count
      - `bio` (text, required) - About themselves
      - `why_join` (text, required) - Why they want to join
      - `status` (text) - pending, reviewing, approved, rejected
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow anonymous users to insert (submit forms)
    - No public read access (admin only via service role)
*/

CREATE TABLE IF NOT EXISTS star_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  celebrity_name text NOT NULL,
  category text NOT NULL,
  social_links text DEFAULT '',
  reason text DEFAULT '',
  submitter_email text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE star_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit star suggestions"
  ON star_suggestions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS creator_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  category text NOT NULL,
  social_links text NOT NULL,
  followers_count text DEFAULT '',
  bio text NOT NULL,
  why_join text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit creator applications"
  ON creator_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_star_suggestions_status ON star_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_creator_applications_status ON creator_applications(status);