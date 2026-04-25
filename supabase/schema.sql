-- Run this in your Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists public.suggestions (
  id          uuid primary key default uuid_generate_v4(),
  goal        text not null,
  curriculum  jsonb not null,
  matched_modules jsonb not null default '[]',
  created_at  timestamptz not null default now()
);

-- Index for quick lookup by id (already primary key, just documenting)
-- Optional: enable Row Level Security if you add user auth later
-- alter table public.suggestions enable row level security;

-- Allow anonymous reads (anyone with the link can view their result)
create policy "Public read access" on public.suggestions
  for select using (true);

-- Allow anonymous inserts (the API generates suggestions without auth)
create policy "Public insert access" on public.suggestions
  for insert with check (true);
