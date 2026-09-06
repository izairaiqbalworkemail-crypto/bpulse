type SubmissionSuccessProps = {
  kicker?: string;
  heading: string;
  body: string;
  referenceId?: string | null;
  emailed?: boolean;
};

function shortId(value: string): string {
  return value.length > 12 ? value.slice(0, 12) : value;
}

export function SubmissionSuccess({
  kicker = "Filed",
  heading,
  body,
  referenceId,
  emailed,
}: Readonly<SubmissionSuccessProps>) {
  return (
    <div className="submission-success">
      <div className="submission-success-head">
        <span className="submission-success-seal" aria-hidden>
          <span>✓</span>
        </span>
        <p className="docket-kicker">{kicker}</p>
      </div>
      <p className="docket-ask">{heading}</p>
      <p className="docket-note">{body}</p>
      {referenceId ? (
        <p className="submission-success-meta">
          Reference {shortId(referenceId)}
          {emailed === undefined ? "" : emailed ? " · emailed" : " · saved"}
        </p>
      ) : null}
    </div>
  );
}
