"use client";

import Link from "next/link";
import { useState } from "react";
import {
  changeOrders,
  getDemoOverview,
  handover,
  progress,
  scopeVersions,
} from "@/content/demo";
import { pulseCopy, visibilityCopy } from "@/content/home";

const panes = visibilityCopy.panes;
type PaneId = (typeof panes)[number]["id"];

function vacant(value: string) {
  return value === "—" || value === "-" || value.trim() === ""
    ? visibilityCopy.vacant
    : value;
}

function ScopePane() {
  const overview = getDemoOverview();

  return (
    <div>
      <p className="letter-portal-kicker">{visibilityCopy.panes[0].label}</p>
      <p className="letter-portal-lead">v{overview.scopeVersion} locked</p>
      <ul className="letter-portal-list">
        {scopeVersions.map((row) => (
          <li key={row.version}>
            <p className="letter-portal-mono">
              v{row.version} · {row.dated}
            </p>
            <p className="letter-portal-body">{row.summary}</p>
          </li>
        ))}
        {changeOrders.map((row) => (
          <li key={row.id}>
            <p className="letter-portal-mono">
              {row.id} · {row.price} · signed {row.signed}
            </p>
            <p className="letter-portal-body">{row.request}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressPane() {
  const overview = getDemoOverview();
  const commit = overview.latestCommit;

  return (
    <div>
      <p className="letter-portal-kicker">{visibilityCopy.panes[1].label}</p>
      <p className="letter-portal-lead">
        day {overview.daysElapsed} of {overview.lockedDays}
        <span className="letter-portal-dot">·</span>
        {overview.usedPct}%
        <span className="letter-portal-dot">·</span>
        {overview.currentStage}
      </p>
      <p className="letter-portal-body letter-portal-gap">
        Next: {overview.nextMilestone}
      </p>
      {commit ? (
        <p className="letter-portal-mono letter-portal-gap">
          {commit.hash} · {commit.date}
        </p>
      ) : null}
      <p className="letter-portal-mono letter-portal-gap">
        {overview.findings.open} open findings
        <span className="letter-portal-dot">·</span>
        {overview.findings.closed} closed findings
      </p>
      <ul className="letter-portal-list">
        {progress.deploys.map((row) => (
          <li key={row.env} className="letter-portal-row">
            <span className="letter-portal-body">{row.env}</span>
            <span className="letter-portal-mono">{row.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RevocationPane() {
  return (
    <div>
      <p className="letter-portal-kicker">{visibilityCopy.panes[2].label}</p>
      <ul className="letter-portal-list">
        {handover.revocation.map((row) => {
          const empty = vacant(row.revokedOn) === visibilityCopy.vacant;
          return (
            <li key={row.item}>
              <p className="letter-portal-body">{row.item}</p>
              <p className="letter-portal-lead">
                {empty
                  ? visibilityCopy.revocationNote
                  : `revoked ${row.revokedOn}`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const paneView = {
  scope: ScopePane,
  progress: ProgressPane,
  revocation: RevocationPane,
} as const;

/**
 * Visibility. The only screen on the page. Sample data, labelled.
 */
export function View() {
  const overview = getDemoOverview();
  const [active, setActive] = useState<PaneId>("scope");
  const Pane = paneView[active];

  return (
    <section id="view" aria-labelledby="view-heading" className="letter-view">
      <div className="letter-sheet">
        <p className="kicker">
          {visibilityCopy.n} · {visibilityCopy.kicker}
        </p>
        <h2 id="view-heading" className="letter-view-title">
          {visibilityCopy.heading}
        </h2>
      </div>

      <div className="letter-portal" aria-label="Sample portal">
        <div className="letter-portal-chrome">
          <p className="letter-portal-url">{pulseCopy.portalUrl}</p>
          <p>
            {visibilityCopy.sample}
            <span className="letter-portal-dot">·</span>
            {overview.client}
            <span className="letter-portal-dot">·</span>
            day {overview.daysElapsed} of {overview.lockedDays}
          </p>
        </div>

        <div className="letter-portal-wide">
          <div>
            <ScopePane />
          </div>
          <div>
            <ProgressPane />
          </div>
          <div>
            <RevocationPane />
          </div>
        </div>

        <div className="letter-portal-narrow">
          <div
            role="tablist"
            aria-label="Sample panes"
            className="letter-portal-tabs"
          >
            {panes.map((pane) => {
              const on = pane.id === active;
              return (
                <button
                  key={pane.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`view-pane-${pane.id}`}
                  id={`view-tab-${pane.id}`}
                  onClick={() => setActive(pane.id)}
                  className={on ? "is-on" : undefined}
                >
                  {pane.label}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            id={`view-pane-${active}`}
            aria-labelledby={`view-tab-${active}`}
            className="letter-portal-pane"
          >
            <Pane />
          </div>
        </div>
      </div>

      <div className="letter-sheet letter-view-ask">
        <Link
          href={visibilityCopy.openHref}
          className="btn btn-ink letter-ask min-h-12 px-8 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {visibilityCopy.open}
        </Link>
      </div>
    </section>
  );
}
