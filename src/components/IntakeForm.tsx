"use client";

import { useState, useRef, useEffect } from "react";
import { BUDGET_BANDS } from "@/content/budgets";

type IntakeVariant = "general" | "check" | "specialist";

type IntakeFormProps = {
  variant?: IntakeVariant;
  specialistName?: string;
  prefill?: Partial<FormData> & { sourceHint?: string };
};

type FormData = {
  whatItIs: string;
  currentState: string;
  whatsBlocking: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  source: string;
};

const steps = [
  {
    key: "whatItIs" as const,
    prompt: "What is the product, and what does it do?",
    type: "text" as const,
    placeholder: "e.g. A healthcare AI platform for hospitals",
  },
  {
    key: "currentState" as const,
    prompt: "What state is it in right now?",
    type: "options" as const,
    options: [
      "Built but not shipped",
      "Shipped but not production-ready",
      "Stalled mid-build",
      "Works in demo, breaks in production",
      "Other",
    ],
  },
  {
    key: "whatsBlocking" as const,
    prompt: "What is blocking it from shipping?",
    type: "textarea" as const,
    placeholder: "e.g. Integration testing, compliance paths, deployment hardening",
  },
  {
    key: "budget" as const,
    prompt: "What is the budget range?",
    type: "options" as const,
    options: [...BUDGET_BANDS],
  },
  {
    key: "timeline" as const,
    prompt: "When does this need to ship?",
    type: "options" as const,
    options: [
      "ASAP",
      "Within 2 weeks",
      "Within a month",
      "Within 3 months",
      "No hard deadline",
    ],
  },
  {
    key: "name" as const,
    prompt: "Your name?",
    type: "text" as const,
    placeholder: "Full name",
  },
  {
    key: "email" as const,
    prompt: "Email address?",
    type: "email" as const,
    placeholder: "you@company.com",
  },
  {
    key: "source" as const,
    prompt: "How did you find bpulse?",
    type: "options" as const,
    options: [
      "Referral",
      "Google",
      "LinkedIn",
      "Twitter / X",
      "Portfolio site",
      "Other",
    ],
  },
];

export function IntakeForm({
  variant = "general",
  specialistName,
  prefill,
}: IntakeFormProps) {
  const initialAnswers: Partial<FormData> = {
    ...(prefill?.currentState ? { currentState: prefill.currentState } : {}),
    ...(prefill?.whatsBlocking ? { whatsBlocking: prefill.whatsBlocking } : {}),
    ...(prefill?.source ? { source: prefill.source } : {}),
  };

  const firstUnansweredIndex = steps.findIndex((candidate) => {
    const value = initialAnswers[candidate.key];
    return !value;
  });

  const [currentStep, setCurrentStep] = useState(
    firstUnansweredIndex === -1 ? steps.length - 1 : firstUnansweredIndex
  );
  const [answers, setAnswers] = useState<Partial<FormData>>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() => globalThis.crypto.randomUUID());
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const step = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;
  const isLast = currentStep === steps.length - 1;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [currentStep, submitted]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  const handleTextAnswer = (value: string) => {
    if (!value.trim()) return;
    setAnswers((prev) => ({ ...prev, [step.key]: value.trim() }));
    setCustomInput("");
    if (!isLast) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleOptionAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.key]: value }));
    if (!isLast) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        type: variant === "check" ? "pulse-check-form" : variant === "specialist" ? "specialist-intake" : "general-intake",
        website: honeypot,
        requestId,
        specialistName,
        ...answers,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your intake. Please email us directly at contact@bpulse.dev."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const variantLabel =
    variant === "check"
      ? "The Check intake"
      : variant === "specialist"
        ? `Intake for ${specialistName ?? "the team"}`
        : "General intake";

  if (submitted) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-sound/10 text-sound">
            ✓
          </span>
          <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
            {variantLabel} — submitted
          </p>
        </div>
        <h3 className="font-newsreader text-lot-title leading-title text-iron">
          Thank you. A real person will reply within one business day.
        </h3>
        <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
          Here is a record of what you submitted. You can print this page for
          your records.
        </p>

        <dl className="mt-6 flex flex-col gap-3">
          {steps.map((s) => (
            <div key={s.key} className="border-t border-iron/10 pt-3">
              <dt className="font-plex-sans text-[0.8rem] text-ink/70">{s.prompt}</dt>
              <dd className="mt-1 font-newsreader text-reading text-iron">
                {(answers as FormData)[s.key] || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="flex items-center justify-between">
        <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
          {variantLabel}
        </p>
        <p className="font-plex-mono text-[0.6rem] text-ink/70">
          {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-px w-full bg-iron/10">
        <div
          className="h-px bg-iron/40 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 font-plex-mono text-[0.6rem] text-ink/70">
        This is an intake form. A real person replies within one business day.
      </p>

      {prefill?.sourceHint ? (
        <p className="mt-2 font-newsreader text-[0.95rem] leading-reading text-ink/70">
          Prefilled from: {prefill.sourceHint}.
        </p>
      ) : null}

      {/* Chat-like column */}
      <div className="mt-6 flex flex-col gap-5">
        {/* Previous answers */}
        {steps.slice(0, currentStep).map((s) => (
          <div key={s.key} className="flex flex-col gap-1.5">
            <p className="font-newsreader text-[0.85rem] leading-reading text-ink/70">
              {s.prompt}
            </p>
            <p className="font-newsreader text-reading leading-reading text-iron pl-3 border-l-2 border-iron/10">
              {(answers as FormData)[s.key] || "—"}
            </p>
          </div>
        ))}

        {/* Current prompt */}
        <div className="flex flex-col gap-3">
          <p className="font-newsreader text-reading leading-reading text-iron">
            {step.prompt}
          </p>

            {step.type === "text" || step.type === "email" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTextAnswer(customInput);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={step.type}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={step.placeholder}
                  className="grow rounded-[8px] border border-iron/15 bg-transparent px-4 py-3 font-newsreader text-reading text-iron placeholder:text-ink/70 focus:border-iron/40 focus:outline-none transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-iron px-5 py-3 font-plex-sans text-sm font-medium text-rag transition-colors duration-200 hover:bg-ink"
                >
                  →
                </button>
              </form>
            ) : step.type === "textarea" ? (
              <div className="flex flex-col gap-2">
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={step.placeholder}
                  rows={3}
                  className="rounded-[8px] border border-iron/15 bg-transparent px-4 py-3 font-newsreader text-reading text-iron placeholder:text-ink/70 focus:border-iron/40 focus:outline-none transition-colors duration-200 resize-none"
                />
                <button
                  type="button"
                  onClick={() => handleTextAnswer(customInput)}
                  className="self-start rounded-full bg-iron px-5 py-3 font-plex-sans text-sm font-medium text-rag transition-colors duration-200 hover:bg-ink"
                >
                  →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {step.options?.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleOptionAnswer(opt)}
                    className={`rounded-surface border border-iron/15 px-4 py-3 text-left font-newsreader text-reading text-iron transition-all duration-200 hover:border-iron/30 hover:bg-iron/[0.03] ${
                      answers[step.key] === opt
                        ? "border-iron/40 bg-iron/5"
                        : ""
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div ref={endRef} />

      {/* Summary and submit — show after last step */}
      {isLast && answers[step.key] && (
        <div className="mt-8 border-t border-iron/10 pt-6">
          <h3 className="font-newsreader text-lot-title leading-title text-iron">
            Before you submit
          </h3>
          <p className="mt-2 font-newsreader text-reading leading-reading text-ink/70">
            Review your answers. A real person will read this and reply within
            one business day.
          </p>

          <dl className="mt-5 flex flex-col gap-2.5">
            {steps.map((s) => (
              <div key={s.key} className="flex items-baseline justify-between gap-4 border-b border-iron/8 pb-2">
                <dt className="shrink-0 font-plex-sans text-[0.8rem] text-ink/70">
                  {s.prompt}
                </dt>
                <dd className="grow border-b border-dotted border-iron/10" />
                <dd className="shrink-0 max-w-[280px] text-right font-newsreader text-sm text-iron truncate">
                  {(answers as FormData)[s.key] || "—"}
                </dd>
              </div>
            ))}
          </dl>

          {error && (
            <p className="mt-4 font-newsreader text-reading text-unsound">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-8 py-4 font-plex-sans text-sm font-medium text-iron transition-all duration-200 hover:brightness-95 hover:gap-3 disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Submit intake"}
            {!submitting && <span>→</span>}
          </button>
        </div>
      )}
    </div>
  );
}
