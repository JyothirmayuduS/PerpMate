-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 1,
  streak_history BOOLEAN[] DEFAULT '{true,false,false,false,false,false,false}',
  target_companies TEXT[] DEFAULT '{}',
  target_role TEXT,
  target_level TEXT DEFAULT 'Beginner',
  study_year TEXT DEFAULT '3',
  onboarded BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practice Progress
CREATE TABLE practice_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  completion_percentage INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- Doubts (Q&A Forum)
CREATE TABLE doubts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  code_block TEXT,
  tags TEXT[] DEFAULT '{}',
  upvotes INTEGER DEFAULT 0,
  solved BOOLEAN DEFAULT FALSE,
  author_name TEXT NOT NULL,
  author_initials TEXT NOT NULL,
  avatar_url TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doubt Replies
CREATE TABLE doubt_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doubt_id UUID REFERENCES doubts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_initials TEXT NOT NULL,
  avatar_url TEXT,
  upvotes INTEGER DEFAULT 0,
  is_solution BOOLEAN DEFAULT FALSE,
  is_expert BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doubt Upvotes Tracking
CREATE TABLE doubt_upvotes (
  doubt_id UUID REFERENCES doubts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (doubt_id, user_id)
);

-- Mock Test Attempts
CREATE TABLE mock_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  test_id TEXT NOT NULL,
  test_title TEXT NOT NULL,
  score_percent INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  xp_gained INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubt_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubt_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_attempts ENABLE ROW LEVEL SECURITY;

-- Allow users to read all profiles (for forum avatars etc)
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Allow authenticated users to manage their own progress
CREATE POLICY "Users can manage their own progress" ON practice_progress FOR ALL USING (auth.uid() = user_id);

-- Forum policies
CREATE POLICY "Doubts are viewable by everyone" ON doubts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create doubts" ON doubts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own doubts" ON doubts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Replies are viewable by everyone" ON doubt_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can reply" ON doubt_replies FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view upvotes" ON doubt_upvotes FOR SELECT USING (true);
CREATE POLICY "Users can manage own upvotes" ON doubt_upvotes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own attempts" ON mock_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON mock_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to create a profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
