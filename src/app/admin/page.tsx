import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TriageButton } from "@/components/admin/TriageButton";
import { ReplyComposer } from "@/components/admin/ReplyComposer";
import { OutcomePicker } from "@/components/admin/OutcomePicker";
import { StatusPicker } from "@/components/admin/StatusPicker";
import { JobComposer } from "@/components/admin/JobComposer";
import { JobStatusPicker } from "@/components/admin/JobStatusPicker";
import {
  getFunnelRatios,
  listCandidateBoard,
  listFollowUpQueue,
  listInboxSubmissions,
  listReports,
} from "@/lib/admin/submissions";
import { listJobsWithCandidatesData } from "@/lib/careers/repo";
import { readSessionFromCookieHeader } from "@/lib/security/studio-auth";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ view?: string }>;
};

const views = [
  { id: "inbox", label: "Inbox" },
  { id: "reports", label: "Reports" },
  { id: "follow-up", label: "Follow-up queue" },
  { id: "candidates", label: "Candidates" },
  { id: "jobs", label: "Jobs" },
  { id: "numbers", label: "Numbers" },
] as const;

type AdminView = (typeof views)[number]["id"];

function viewFrom(value?: string): AdminView {
  const found = views.find((item) => item.id === value);
  return found?.id ?? "follow-up";
}

function ratioLine(left: number, right: number): string {
  return `${left} / ${Math.max(right, 1)}`;
}

function displayDate(value: string | null): string {
  if (!value) return "not logged";
  return value.slice(0, 10);
}

export default async function AdminPage({ searchParams }: Props) {
  const cookieHeader = (await headers()).get("cookie");
  const session = readSessionFromCookieHeader(cookieHeader);
  if (!session) notFound();

  const params = await searchParams;
  const currentView = viewFrom(params.view);

  const [inbox, reports, followUps, candidates, jobs, r30, r90] = await Promise.all([
    listInboxSubmissions(120),
    listReports(220),
    listFollowUpQueue(220),
    listCandidateBoard(),
    listJobsWithCandidatesData(),
    getFunnelRatios(30),
    getFunnelRatios(90),
  ]);

  const sortedCandidates = [...candidates].sort((left, right) => {
    if (left.gate !== right.gate) return left.gate - right.gate;
    return left.daysInGate - right.daysInGate;
  });

  return (
    <section className="w-full bg-rag pb-24">
      <div className="grid-container pt-14">
        <div className="overflow-x-auto border-y border-iron/20">
          <table className="min-w-[56rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-iron/20">
                {["Desk", "Live rows", "Purpose", "Action"].map((header) => (
                  <th
                    key={header}
                    className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-iron/10 align-top">
                <td className={`py-3 pr-4 font-newsreader text-[19px] ${currentView === "follow-up" ? "text-iron" : "text-ink"}`}>
                  Follow-up queue
                </td>
                <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{followUps.length}</td>
                <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">
                  Reports sent seven or more days ago, opened at least once, no reply logged.
                </td>
                <td className="py-3 pr-2">
                  <Link href="/admin?view=follow-up" className="font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4">
                    Open queue
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-iron/10 align-top">
                <td className={`py-3 pr-4 font-newsreader text-[19px] ${currentView === "inbox" ? "text-iron" : "text-ink"}`}>
                  Inbox
                </td>
                <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{inbox.length}</td>
                <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">
                  Structured submissions with triage, outcome, and direct reply controls.
                </td>
                <td className="py-3 pr-2">
                  <Link href="/admin?view=inbox" className="font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4">
                    Open inbox
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-iron/10 align-top">
                <td className={`py-3 pr-4 font-newsreader text-[19px] ${currentView === "reports" ? "text-iron" : "text-ink"}`}>
                  Reports
                </td>
                <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{reports.length}</td>
                <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">
                  Company, sent date, open count, last opened, and status from live view logs.
                </td>
                <td className="py-3 pr-2">
                  <Link href="/admin?view=reports" className="font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4">
                    Open reports
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-iron/10 align-top">
                <td className={`py-3 pr-4 font-newsreader text-[19px] ${currentView === "candidates" ? "text-iron" : "text-ink"}`}>
                  Candidates
                </td>
                <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{sortedCandidates.length}</td>
                <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">
                  Gate board with seven-day flags and direct jump to reviewer desk.
                </td>
                <td className="py-3 pr-2">
                  <Link href="/admin?view=candidates" className="font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4">
                    Open board
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-iron/10 align-top">
                <td className={`py-3 pr-4 font-newsreader text-[19px] ${currentView === "jobs" ? "text-iron" : "text-ink"}`}>
                  Jobs
                </td>
                <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{jobs.length}</td>
                <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">
                  Post roles from admin and track applicants under each role.
                </td>
                <td className="py-3 pr-2">
                  <Link href="/admin?view=jobs" className="font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4">
                    Open jobs
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-iron/10 align-top">
                <td className={`py-3 pr-4 font-newsreader text-[19px] ${currentView === "numbers" ? "text-iron" : "text-ink"}`}>
                  Numbers
                </td>
                <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">2 ratios</td>
                <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">
                  Reports and reads to calls booked, then calls booked to Checks paid.
                </td>
                <td className="py-3 pr-2">
                  <Link href="/admin?view=numbers" className="font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4">
                    Open numbers
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {currentView === "inbox" ? (
          <div className="mt-8 overflow-x-auto border-y border-iron/20">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-iron/20">
                  {[
                    "Submitted",
                    "Type",
                    "Email",
                    "Source",
                    "Status",
                    "Outcome",
                    "Outcome at",
                    "Structured fields",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inbox.map((row) => (
                  <tr key={row.id} className="border-b border-iron/10 align-top">
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(row.createdAt)}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.type}</td>
                    <td className="py-3 pr-4 font-plex-sans text-[13px] text-ink/80">{row.email ?? "-"}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.source ?? "-"}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.status}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.outcome}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(row.outcomeAt)}</td>
                    <td className="py-3 pr-4 font-newsreader text-[16px] leading-[1.4] text-iron">{row.summary}</td>
                    <td className="py-3 pr-2">
                      <div className="flex flex-col gap-2">
                        <OutcomePicker id={row.id} current={row.outcome} valueUsd={row.valueUsd} />
                        <StatusPicker id={row.id} current={row.status} />
                        <TriageButton id={row.id} />
                        {row.email ? (
                          <ReplyComposer
                            to={row.email}
                            subject={`bpulse follow-up: ${row.type}`}
                            submissionId={row.id}
                          />
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {currentView === "reports" ? (
          <div className="mt-8 overflow-x-auto border-y border-iron/20">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-iron/20">
                  {[
                    "Company",
                    "Report",
                    "Sent",
                    "Open count",
                    "Last opened",
                    "Status",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((row) => (
                  <tr key={row.slug} className="border-b border-iron/10 align-top">
                    <td className="py-3 pr-4 font-newsreader text-[17px] text-iron">{row.company}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">
                      <a
                        href={`https://report.bpulse.dev/${row.slug}`}
                        className="underline decoration-iron/30 underline-offset-4"
                      >
                        {row.slug}
                      </a>
                    </td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(row.sentAt)}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.openCount}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(row.lastOpenedAt)}</td>
                    <td className="py-3 pr-2 font-plex-mono text-[12px] text-ink/70">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {currentView === "follow-up" ? (
          <div className="mt-8 overflow-x-auto border-y border-iron/20">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-iron/20">
                  {[
                    "Company",
                    "Sent to",
                    "Sent",
                    "Days since sent",
                    "Open count",
                    "Last opened",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {followUps.map((row) => (
                  <tr key={row.slug} className="border-b border-iron/10 align-top">
                    <td className="py-3 pr-4 font-newsreader text-[17px] text-iron">{row.company}</td>
                    <td className="py-3 pr-4 font-plex-sans text-[13px] text-ink/80">{row.sentTo ?? "not logged"}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(row.sentAt)}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.daysSinceSent}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.openCount}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(row.lastOpenedAt)}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.status}</td>
                    <td className="py-3 pr-2">
                      {row.sentTo ? (
                        <ReplyComposer to={row.sentTo} subject={`bpulse follow-up: ${row.company}`} />
                      ) : (
                        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                          No email
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {currentView === "candidates" ? (
          <div className="mt-8 overflow-x-auto border-y border-iron/20">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-iron/20">
                  {[
                    "Name",
                    "Role",
                    "Gate",
                    "Days in gate",
                    "Updated",
                    "Diagnostic",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedCandidates.map((row) => (
                  <tr key={row.id} className="border-b border-iron/10 align-top">
                    <td className="py-3 pr-4 font-newsreader text-[17px] text-iron">{row.name}</td>
                    <td className="py-3 pr-4 font-newsreader text-[16px] text-ink">{row.role}</td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.gateName}</td>
                    <td className={`py-3 pr-4 font-plex-mono text-[12px] ${row.flagged ? "text-signal-ink" : "text-ink/70"}`}>
                      {row.daysInGate}
                    </td>
                    <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(row.updatedAt)}</td>
                    <td className="py-3 pr-2 font-plex-mono text-[12px] text-ink/70">
                      {row.diagnosticToken ? (
                        <Link
                          href={`/studio/careers?token=${row.diagnosticToken}`}
                          className="underline decoration-iron/30 underline-offset-4"
                        >
                          Open
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {currentView === "jobs" ? (
          <div className="mt-8">
            <JobComposer />
            <div className="mt-6 overflow-x-auto border-y border-iron/20">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-iron/20">
                    {["Role", "Status", "Applicants", "Location", "Band", "Action"].map((header) => (
                      <th
                        key={header}
                        className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-iron/10 align-top">
                      <td className="py-3 pr-4">
                        <p className="font-newsreader text-[17px] text-iron">{job.title}</p>
                        <p className="font-newsreader text-[15px] text-ink">{job.summary}</p>
                      </td>
                      <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{job.status}</td>
                      <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{job.candidates.length}</td>
                      <td className="py-3 pr-4 font-newsreader text-[15px] text-ink">{job.location}</td>
                      <td className="py-3 pr-4 font-newsreader text-[15px] text-ink">{job.band}</td>
                      <td className="py-3 pr-2">
                        <JobStatusPicker
                          id={job.id}
                          title={job.title}
                          pod={job.pod}
                          status={job.status}
                          location={job.location}
                          band={job.band}
                          summary={job.summary}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 space-y-6">
              {jobs.map((job) => (
                <section key={`${job.id}-candidates`} className="border-y border-iron/15 py-4">
                  <p className="font-newsreader text-[20px] text-iron">
                    {job.title} · {job.candidates.length} applicants
                  </p>
                  {job.candidates.length === 0 ? (
                    <p className="mt-2 font-newsreader text-[16px] text-ink">No applicants yet.</p>
                  ) : (
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full border-collapse text-left">
                        <thead>
                          <tr className="border-b border-iron/15">
                            {["Name", "Email", "Gate", "Submitted", "Status page"].map((header) => (
                              <th
                                key={header}
                                className="py-2 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {job.candidates.map((candidate) => (
                            <tr key={candidate.id} className="border-b border-iron/10 align-top">
                              <td className="py-2.5 pr-4 font-newsreader text-[16px] text-iron">{candidate.name}</td>
                              <td className="py-2.5 pr-4 font-plex-sans text-[13px] text-ink/80">{candidate.email}</td>
                              <td className="py-2.5 pr-4 font-plex-mono text-[12px] text-ink/70">{candidate.gate}</td>
                              <td className="py-2.5 pr-4 font-plex-mono text-[12px] text-ink/70">{displayDate(candidate.submittedAt)}</td>
                              <td className="py-2.5 pr-2 font-plex-mono text-[12px] text-ink/70">
                                <a href={`/careers/status/${candidate.statusToken}`} className="underline decoration-iron/30 underline-offset-4">
                                  Open
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        ) : null}

        {currentView === "numbers" ? (
          <div className="mt-8 overflow-x-auto border-y border-iron/20">
            <table className="min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-iron/20">
                  {[
                    "Window",
                    "Reports and reads to calls booked",
                    "Calls booked to Checks paid",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-iron/10">
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">Rolling 30 days</td>
                  <td className="py-3 pr-4 font-newsreader text-[19px] text-iron">
                    {ratioLine(r30.callsBooked, r30.reportsAndReads)}
                  </td>
                  <td className="py-3 pr-2 font-newsreader text-[19px] text-iron">
                    {ratioLine(r30.checksPaid, r30.callsBooked)}
                  </td>
                </tr>
                <tr className="border-b border-iron/10">
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">Rolling 90 days</td>
                  <td className="py-3 pr-4 font-newsreader text-[19px] text-iron">
                    {ratioLine(r90.callsBooked, r90.reportsAndReads)}
                  </td>
                  <td className="py-3 pr-2 font-newsreader text-[19px] text-iron">
                    {ratioLine(r90.checksPaid, r90.callsBooked)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}
