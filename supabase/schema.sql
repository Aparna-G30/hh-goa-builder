-- Run this whole file in the Supabase SQL Editor
-- (Project dashboard -> SQL Editor -> New query -> paste -> Run)

create table if not exists public.builders (
  id uuid primary key default gen_random_uuid(),
  builder_id text unique not null,
  name text not null,
  role text not null,
  tech_stack text not null,
  title text not null,
  status text,
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists builders_builder_id_idx
  on public.builders (builder_id);

alter table public.builders enable row level security;

drop policy if exists "Public read access" on public.builders;
create policy "Public read access"
  on public.builders for select
  using (true);

drop policy if exists "Public insert access" on public.builders;
create policy "Public insert access"
  on public.builders for insert
  with check (true);

insert into storage.buckets (id, name, public)
values ('builder-photos', 'builder-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public read builder photos" on storage.objects;
create policy "Public read builder photos"
  on storage.objects for select
  using (bucket_id = 'builder-photos');

drop policy if exists "Public upload builder photos" on storage.objects;
create policy "Public upload builder photos"
  on storage.objects for insert
  with check (bucket_id = 'builder-photos');