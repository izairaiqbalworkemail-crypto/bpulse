-- Adversarial RLS checks.
-- This script assumes two organisations and two auth users.
-- Replace UUID literals before running in CI.

begin;

-- org and user fixtures for test run
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000a1', true);

-- User A should never see Org B rows.
select count(*) = 0 as ok_engagements
from engagements
where org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_documents
from documents d
join engagements e on e.id = d.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_findings
from findings f
join engagements e on e.id = f.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_scope_versions
from scope_versions s
join engagements e on e.id = s.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_change_orders
from change_orders c
join engagements e on e.id = c.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_progress
from progress p
join engagements e on e.id = p.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_updates
from updates u
join engagements e on e.id = u.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_assignments
from assignments a
join engagements e on e.id = a.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_handover
from handover h
join engagements e on e.id = h.engagement_id
where e.org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_orgs
from organisations
where id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_memberships
from memberships
where org_id = '00000000-0000-0000-0000-0000000000b1';

select count(*) = 0 as ok_audit_log
from audit_log;

rollback;
