-- Blueprint Alpha schema
create extension if not exists "pgcrypto";

create table if not exists company_functions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  description text,
  status text not null default 'Active',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists platforms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  description text,
  stage text not null default 'Planning',
  created_at timestamptz not null default now()
);

create table if not exists relationships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  relationship_type text,
  status text not null default 'Active',
  last_contact date,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  title text not null,
  priority text not null default 'Medium',
  status text not null default 'Not Started',
  due_date date,
  next_action text,
  relationship_id uuid references relationships(id) on delete set null,
  platform_id uuid references platforms(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists waiting_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  title text not null,
  counterparty text,
  requested_date date,
  follow_up_date date,
  status text not null default 'Open',
  impact text,
  relationship_id uuid references relationships(id) on delete set null,
  platform_id uuid references platforms(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists finance_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  title text not null,
  payee text,
  amount numeric(14,2),
  due_date date,
  item_type text not null default 'Payment Due',
  status text not null default 'Open',
  platform_id uuid references platforms(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  title text not null,
  upload_type text not null default 'Note',
  raw_text text,
  storage_path text,
  status text not null default 'Needs Review',
  created_at timestamptz not null default now()
);

create table if not exists timeline_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  event_date date not null default current_date,
  title text not null,
  description text,
  event_type text not null default 'General',
  created_at timestamptz not null default now()
);

alter table company_functions enable row level security;
alter table platforms enable row level security;
alter table relationships enable row level security;
alter table tasks enable row level security;
alter table waiting_items enable row level security;
alter table finance_items enable row level security;
alter table uploads enable row level security;
alter table timeline_events enable row level security;

do $$
declare t text;
begin
  foreach t in array array['company_functions','platforms','relationships','tasks','waiting_items','finance_items','uploads','timeline_events']
  loop
    execute format('drop policy if exists "Users manage own rows" on %I', t);
    execute format('create policy "Users manage own rows" on %I for all using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;

-- Storage bucket for future file uploads
insert into storage.buckets (id,name,public)
values ('blueprint-files','blueprint-files',false)
on conflict (id) do nothing;

drop policy if exists "Users manage own Blueprint files" on storage.objects;
create policy "Users manage own Blueprint files"
on storage.objects for all
using (bucket_id='blueprint-files' and auth.uid()::text = (storage.foldername(name))[1])
with check (bucket_id='blueprint-files' and auth.uid()::text = (storage.foldername(name))[1]);
