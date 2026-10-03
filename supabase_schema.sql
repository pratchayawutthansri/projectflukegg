-- ==============================================================================
-- GYM GYM GYM | FIT & FINANCE OS - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. Profiles Table (Linked with Supabase Authentication)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    member_id TEXT UNIQUE,
    display_name TEXT NOT NULL DEFAULT 'Fluke',
    weight_kg NUMERIC DEFAULT 70,
    height_cm NUMERIC DEFAULT 175,
    age INTEGER DEFAULT 25,
    daily_calorie_target INTEGER DEFAULT 650,
    gym_name TEXT DEFAULT 'Gym Gym Gym',
    theme_mode TEXT DEFAULT 'yellow',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Workout Sessions Table (Completed Exercises & Cardio)
CREATE TABLE IF NOT EXISTS public.workout_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    title TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Scheduled Plans Table (Upcoming Planned Routines)
CREATE TABLE IF NOT EXISTS public.scheduled_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_date DATE NOT NULL,
    title TEXT NOT NULL,
    muscle_group TEXT NOT NULL,
    routine_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    running_distance_km NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Transactions Table (Fit & Daily Finance Cash Flow)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tx_date DATE NOT NULL,
    title TEXT NOT NULL,
    tx_type TEXT CHECK (tx_type IN ('income', 'expense')) NOT NULL,
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) - ป้องกันไม่ให้ผู้ใช้คนอื่นเห็นหรือเข้าถึงข้อมูลของเรา
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Workout Sessions Policies
CREATE POLICY "Users can manage their own workouts"
    ON public.workout_sessions FOR ALL
    USING (auth.uid() = user_id);

-- Scheduled Plans Policies
CREATE POLICY "Users can manage their own plans"
    ON public.scheduled_plans FOR ALL
    USING (auth.uid() = user_id);

-- Transactions Policies
CREATE POLICY "Users can manage their own transactions"
    ON public.transactions FOR ALL
    USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE TRIGGER (สร้างโปรไฟล์เริ่มต้นให้อัตโนมัติเมื่อสมัครสมาชิกใหม่)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, member_id)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'display_name', 'Athlete'),
        'M-' || UPPER(SUBSTRING(new.id::text FROM 1 FOR 6))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
