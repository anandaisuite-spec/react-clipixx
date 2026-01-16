/*
  # Create feedback table

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key)
      - `type` (text) - Type of feedback (Bug Report, Feature Request, etc.)
      - `subject` (text) - Brief summary of the feedback
      - `message` (text) - Detailed feedback message
      - `email` (text, optional) - User's email for follow-up
      - `created_at` (timestamptz) - When the feedback was submitted
      
  2. Security
    - Enable RLS on `feedback` table
    - Add policy to allow anyone to insert feedback (public submission)
    - Only authenticated admins can view feedback (future implementation)

  3. Notes
    - Email is optional to allow anonymous feedback
    - All submissions are stored for review
*/

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  email text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);