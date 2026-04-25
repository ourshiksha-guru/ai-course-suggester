# Our Shiksha – AI Course Suggester

Generate a personalised learning curriculum and get matched courses from Udemy & TuteDude — powered by GPT-4o.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **OpenAI GPT-4o** – curriculum generation
- **Supabase** – PostgreSQL to persist suggestions
- **Vercel** – zero-config deployment

## Local Setup

```bash
# 1. Clone & install
git clone https://github.com/ourshiksha-guru/ai-course-suggester
cd ai-course-suggester
npm install

# 2. Set environment variables
cp .env.example .env.local
# Fill in OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Set up Supabase
# Run supabase/schema.sql in your Supabase SQL Editor

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Add the three environment variables
4. Deploy — live at `https://your-app.vercel.app`

## Project Structure

```
app/
  page.tsx                    # Input form (home page)
  results/page.tsx            # Results page
  api/
    generate-curriculum/      # POST → GPT-4o curriculum + course matching
    match-courses/            # POST → standalone course matching
lib/
  supabase.ts                 # Supabase client + helpers
  courses.ts                  # Course database + matching algorithm
types/
  index.ts                    # Shared TypeScript types
supabase/
  schema.sql                  # Run this in Supabase SQL Editor
```
