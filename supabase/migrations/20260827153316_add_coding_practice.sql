create table public.coding_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  question_id text not null,
  question_title text not null,
  study_year smallint not null check (study_year between 1 and 4),
  language text not null default 'javascript'
    check (language in ('javascript', 'python', 'java', 'cpp')),
  status text not null check (status in ('accepted', 'attempted')),
  passed_tests smallint not null check (passed_tests >= 0),
  total_tests smallint not null check (total_tests > 0 and passed_tests <= total_tests),
  runtime_ms integer not null check (runtime_ms >= 0),
  source_code text not null,
  created_at timestamptz not null default now()
);

create index coding_attempts_user_id_idx
  on public.coding_attempts using btree (user_id);

create index coding_attempts_user_question_created_idx
  on public.coding_attempts using btree (user_id, question_id, created_at desc);

alter table public.coding_attempts enable row level security;

revoke all on table public.coding_attempts from anon, authenticated;
grant select, insert on table public.coding_attempts to authenticated;
grant usage, select on sequence public.coding_attempts_id_seq to authenticated;

create policy "Users can view their own coding attempts"
  on public.coding_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own coding attempts"
  on public.coding_attempts
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
