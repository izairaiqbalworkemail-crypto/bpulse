-- Row level security policy set for portal tables.
-- Deny by default, enable explicit policies only.

alter table organisations enable row level security;
alter table memberships enable row level security;
alter table engagements enable row level security;
alter table documents enable row level security;
alter table findings enable row level security;
alter table scope_versions enable row level security;
alter table change_orders enable row level security;
alter table progress enable row level security;
alter table updates enable row level security;
alter table assignments enable row level security;
alter table handover enable row level security;
alter table audit_log enable row level security;

create or replace function is_portal_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from memberships m
    where m.user_id = auth.uid()
      and m.role = 'admin'
  );
$$;

create or replace function can_read_org(org uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from memberships m
    where m.user_id = auth.uid()
      and m.org_id = org
  );
$$;

create or replace function can_read_engagement(eid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from engagements e
    where e.id = eid
      and (
        can_read_org(e.org_id)
        or exists (
          select 1
          from assignments a
          where a.engagement_id = e.id
            and a.crew_id = auth.uid()
        )
      )
  );
$$;

drop policy if exists organisations_select on organisations;
create policy organisations_select on organisations
for select
using (can_read_org(id) or is_portal_admin());

drop policy if exists memberships_select on memberships;
create policy memberships_select on memberships
for select
using (user_id = auth.uid() or is_portal_admin());

drop policy if exists engagements_select on engagements;
create policy engagements_select on engagements
for select
using (
  can_read_org(org_id)
  or exists (
    select 1
    from assignments a
    where a.engagement_id = engagements.id
      and a.crew_id = auth.uid()
  )
  or is_portal_admin()
);

drop policy if exists documents_select on documents;
create policy documents_select on documents
for select
using (can_read_engagement(engagement_id) or is_portal_admin());

drop policy if exists findings_select on findings;
create policy findings_select on findings
for select
using (can_read_engagement(engagement_id) or is_portal_admin());

drop policy if exists scope_versions_select on scope_versions;
create policy scope_versions_select on scope_versions
for select
using (can_read_engagement(engagement_id) or is_portal_admin());

drop policy if exists change_orders_select on change_orders;
create policy change_orders_select on change_orders
for select
using (can_read_engagement(engagement_id) or is_portal_admin());

drop policy if exists progress_select on progress;
create policy progress_select on progress
for select
using (can_read_engagement(engagement_id) or is_portal_admin());

drop policy if exists updates_select on updates;
create policy updates_select on updates
for select
using (can_read_engagement(engagement_id) or is_portal_admin());

drop policy if exists assignments_select on assignments;
create policy assignments_select on assignments
for select
using (
  crew_id = auth.uid()
  or can_read_engagement(engagement_id)
  or is_portal_admin()
);

drop policy if exists handover_select on handover;
create policy handover_select on handover
for select
using (can_read_engagement(engagement_id) or is_portal_admin());

drop policy if exists audit_log_select on audit_log;
create policy audit_log_select on audit_log
for select
using (is_portal_admin());
