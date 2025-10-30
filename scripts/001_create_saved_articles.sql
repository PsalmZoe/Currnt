-- Create saved_articles table to store user's saved news articles
create table if not exists public.saved_articles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  article_url text not null,
  article_title text not null,
  article_description text,
  article_image_url text,
  article_source text,
  article_author text,
  article_published_at timestamp with time zone,
  saved_at timestamp with time zone default now(),
  unique(user_id, article_url)
);

-- Enable Row Level Security
alter table public.saved_articles enable row level security;

-- RLS Policies: Users can only access their own saved articles
create policy "Users can view their own saved articles"
  on public.saved_articles for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved articles"
  on public.saved_articles for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved articles"
  on public.saved_articles for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists saved_articles_user_id_idx on public.saved_articles(user_id);
create index if not exists saved_articles_saved_at_idx on public.saved_articles(saved_at desc);
