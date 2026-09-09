"use client";

import Link from "next/link";
import { useActionState } from "react";
import { suggestStart } from "@/app/suggest-action";
import { pulseCopy, suggestCopy, whereCopy } from "@/content/home";
import { emptySuggest, type SuggestState } from "@/lib/offer-suggest";

function SuggestOut({
  start,
  href,
  price,
  meter,
  because,
  ask,
  person,
  role,
  offerIsRead,
}: {
  start: string;
  href: string;
  price: SuggestState["price"];
  meter: SuggestState["meter"];
  because: SuggestState["because"];
  ask: string | null;
  person: SuggestState["person"];
  role: SuggestState["role"];
  offerIsRead: boolean;
}) {
  return (
    <article className="letter-suggest-out" aria-live="polite">
      <p className="letter-suggest-because">{suggestCopy.because}</p>
      <p className="letter-suggest-if">{because}</p>
      <p className="letter-suggest-start">{start}</p>
      <p className="letter-suggest-meta">
        {price}
        {meter ? (
          <>
            <span aria-hidden="true"> · </span>
            {meter}
          </>
        ) : null}
      </p>
      {person ? (
        <p className="letter-suggest-person">
          {person}
          {role ? (
            <>
              <span aria-hidden="true"> · </span>
              {role}
            </>
          ) : null}
        </p>
      ) : null}
      <div className="letter-suggest-actions">
        {ask ? (
          <Link href={href} className="btn btn-gold letter-ask min-h-12 px-8 text-[15px]">
            {ask}
          </Link>
        ) : null}
        {offerIsRead ? null : (
          <Link href={pulseCopy.primaryHref} className="letter-suggest-more">
            {suggestCopy.next}
          </Link>
        )}
        <Link href={suggestCopy.matchHref} className="letter-suggest-more">
          {suggestCopy.match}
        </Link>
      </div>
    </article>
  );
}

/**
 * A first pass. Tap a situation or write it. Not a score. Not AI.
 */
export function Suggest() {
  const [state, action, pending] = useActionState(suggestStart, emptySuggest);
  const offerAsk = state.ask && state.href ? state.ask : null;
  const offerIsRead = state.href === pulseCopy.primaryHref;

  return (
    <section
      id="suggest"
      aria-labelledby="suggest-heading"
      className="letter-suggest"
    >
      <div className="letter-suggest-desk">
        <div>
          <p className="kicker">{suggestCopy.kicker}</p>
          <h2 id="suggest-heading" className="letter-suggest-title">
            {suggestCopy.heading}
          </h2>
          <p className="letter-suggest-dek">{suggestCopy.dek}</p>
        </div>

        <form action={action} className="letter-suggest-form">
          <fieldset className="letter-suggest-picks">
            <legend className="letter-suggest-label">{suggestCopy.picks}</legend>
            {whereCopy.rows.map((row) => (
              <button
                key={row.href}
                type="submit"
                name="pick"
                value={row.href}
                disabled={pending}
                className={state.href === row.href ? "is-on" : undefined}
              >
                {row.if}
              </button>
            ))}
          </fieldset>

          <label htmlFor="suggest-description" className="letter-suggest-label">
            {suggestCopy.write}
          </label>
          <textarea
            id="suggest-description"
            name="description"
            rows={4}
            maxLength={2000}
            placeholder={suggestCopy.placeholder}
          />
          <button
            type="submit"
            disabled={pending}
            className="btn btn-ink letter-ask min-h-12 px-8 text-[15px]"
          >
            {suggestCopy.action}
          </button>
          {state.error ? <p className="letter-suggest-error">{state.error}</p> : null}
        </form>

        {state.start && state.href ? (
          <SuggestOut
            start={state.start}
            href={state.href}
            price={state.price}
            meter={state.meter}
            because={state.because}
            ask={offerAsk}
            person={state.person}
            role={state.role}
            offerIsRead={offerIsRead}
          />
        ) : null}
      </div>
    </section>
  );
}
