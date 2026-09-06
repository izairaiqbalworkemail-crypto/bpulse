"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { PressButton } from "@/components/PressButton";

export type DocketStep = {
  id: string;
  n: string;
  label: string;
  value?: string;
  state: "done" | "now" | "next";
};

export type DocketPrior = {
  label: string;
  value: string;
  onEdit?: () => void;
};

export function Docket({
  kicker,
  to,
  note,
  step,
  of,
  ask,
  hint,
  error,
  prior,
  children,
  actions,
  onBack,
  canBack,
}: Readonly<{
  kicker?: string;
  title?: string;
  to?: string;
  note?: string;
  step: number;
  of: number;
  steps?: DocketStep[];
  ask: string;
  hint?: string;
  error?: string | null;
  prior?: readonly DocketPrior[];
  children: ReactNode;
  actions?: ReactNode;
  onBack?: () => void;
  canBack?: boolean;
}>) {
  const who = to ? `Write ${to}` : (kicker ?? "Write");

  return (
    <div className="docket">
      <header className="docket-head">
        <p className="docket-kicker">{who}</p>
        <p className="docket-count" aria-label={`Step ${step} of ${of}`}>
          {step} of {of}
        </p>
      </header>

      <ol className="docket-progress" aria-hidden="true">
        {Array.from({ length: of }, (_, i) => (
          <li key={i} className={i < step ? "is-on" : undefined} />
        ))}
      </ol>

      {note ? <p className="docket-note">{note}</p> : null}

      {prior && prior.length > 0 ? (
        <ol className="docket-prior">
          {prior.map((row) => (
            <li key={row.label}>
              {row.onEdit ? (
                <button type="button" onClick={row.onEdit} className="docket-prior-edit">
                  <span className="docket-prior-label">{row.label}</span>
                  <span className="docket-prior-value">{row.value}</span>
                </button>
              ) : (
                <p>
                  <span className="docket-prior-label">{row.label}</span>
                  <span className="docket-prior-value">{row.value}</span>
                </p>
              )}
            </li>
          ))}
        </ol>
      ) : null}

      <h2 className="docket-ask">{ask}</h2>

      <div className="docket-body">{children}</div>

      {error ? (
        <p role="alert" className="docket-error">
          {error}
        </p>
      ) : hint ? (
        <p className="docket-hint">{hint}</p>
      ) : null}

      {canBack || actions ? (
        <div className="docket-bar">
          {canBack && onBack ? (
            <PressButton onPress={onBack} className="docket-back">
              Back
            </PressButton>
          ) : (
            <span />
          )}
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export function DocketChoices({
  options,
  onPick,
  selected,
}: Readonly<{
  options: readonly { id: string; label: string }[];
  onPick: (id: string) => void;
  selected?: string;
}>) {
  return (
    <ul className="docket-choices">
      {options.map((option, index) => (
        <li key={option.id}>
          <PressButton
            onPress={() => onPick(option.id)}
            className={`docket-choice${selected === option.id ? " is-held" : ""}`}
          >
            <span className="docket-choice-n">{index + 1}</span>
            <span>{option.label}</span>
          </PressButton>
        </li>
      ))}
    </ul>
  );
}

export function DocketWrite({
  value,
  onChange,
  onSubmit,
  placeholder,
  rows = 3,
  type = "text",
  autoComplete,
  label,
  name,
  disabled,
  maxLength,
  autoFocus = true,
}: Readonly<{
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  rows?: number;
  type?: "text" | "email" | "url" | "textarea";
  autoComplete?: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
}>) {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    const node = type === "textarea" ? areaRef.current : inputRef.current;
    if (!node || disabled) return;
    const id = window.setTimeout(() => node.focus(), 20);
    return () => window.clearTimeout(id);
  }, [autoFocus, disabled, type, label]);

  useEffect(() => {
    const node = areaRef.current;
    if (!node || type !== "textarea") return;
    node.style.height = "auto";
    node.style.height = `${Math.max(node.scrollHeight, 96)}px`;
  }, [type, value]);

  if (type === "textarea") {
    return (
      <label className="docket-field">
        {label ? <span className="docket-field-label">{label}</span> : null}
        <textarea
          ref={areaRef}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          enterKeyHint="send"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
          className="docket-write"
        />
      </label>
    );
  }

  return (
    <label className="docket-field">
      {label ? <span className="docket-field-label">{label}</span> : null}
      <input
        ref={inputRef}
        id={name ? `docket-${name}` : undefined}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        disabled={disabled}
        enterKeyHint="send"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
          }
        }}
        className="docket-write"
      />
    </label>
  );
}

export function DocketNext({
  children,
  onPress,
  disabled,
}: Readonly<{
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}>) {
  return (
    <PressButton disabled={disabled} onPress={onPress} className="docket-next">
      {children}
    </PressButton>
  );
}

export function DocketFile({
  children,
  onPress,
  disabled,
  submit,
}: Readonly<{
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  submit?: boolean;
}>) {
  if (submit) {
    return (
      <button type="submit" disabled={disabled} className="docket-file">
        {children}
      </button>
    );
  }

  return (
    <PressButton
      disabled={disabled}
      onPress={onPress ?? (() => undefined)}
      className="docket-file"
    >
      {children}
    </PressButton>
  );
}

export function DocketFiled({
  heading,
  body,
}: Readonly<{ kicker?: string; heading: string; body: string }>) {
  return (
    <div className="docket">
      <p className="docket-kicker">Filed</p>
      <p className="docket-ask">{heading}</p>
      <p className="docket-note">{body}</p>
    </div>
  );
}

export function DocketReview({
  rows,
}: Readonly<{ rows: readonly { label: string; value: string }[] }>) {
  return (
    <dl className="docket-review">
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="docket-prior-label">{row.label}</dt>
          <dd className="docket-prior-value">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
