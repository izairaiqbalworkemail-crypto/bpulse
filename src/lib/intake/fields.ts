import type { FieldConfig, IntakeType } from "@/lib/intake/types";
import { BUDGET_BANDS } from "@/content/budgets";

const BUDGETS = [...BUDGET_BANDS];

const nameField: FieldConfig = {
  name: "name",
  label: "Name",
  type: "input",
  input: "text",
  autoComplete: "name",
  required: true,
  placeholder: "A first name is plenty",
};

const emailField: FieldConfig = {
  name: "email",
  label: "Email",
  type: "input",
  input: "email",
  autoComplete: "email",
  required: true,
  placeholder: "you@company.com",
};

const budgetField: FieldConfig = {
  name: "budget",
  label: "Budget range",
  type: "select",
  options: BUDGETS,
  required: false,
};

/**
 * One field set per door. Copy is already on SessionCopy.ask.
 * Contact was rendering CrewSession with no fields — the log never started.
 */
export const sessionFields: Record<IntakeType, FieldConfig[]> = {
  start: [
    nameField,
    {
      name: "company",
      label: "Company",
      type: "input",
      required: false,
      placeholder: "Stealth counts",
    },
    emailField,
    {
      name: "idea",
      label: "The product",
      type: "textarea",
      required: true,
      placeholder: "One or two lines",
    },
    {
      name: "spec",
      label: "Spec",
      type: "radio",
      options: ["Written spec", "Just the idea"],
      required: true,
    },
    budgetField,
  ],
  rescue: [
    nameField,
    {
      name: "company",
      label: "Company",
      type: "input",
      required: true,
      placeholder: "The project it belongs to",
    },
    emailField,
    {
      name: "codeLocation",
      label: "Where the code lives",
      type: "input",
      required: true,
      placeholder: "Repo, zip, or a laptop gone quiet",
    },
    {
      name: "progress",
      label: "How far it got",
      type: "radio",
      options: ["80% done", "Feature-complete", "Half-built", "Just started"],
      required: true,
    },
    {
      name: "access",
      label: "Access",
      type: "radio",
      options: ["Yes, full access", "Partial access", "No access yet"],
      required: true,
    },
    budgetField,
  ],
  contact: [
    nameField,
    emailField,
    {
      name: "stage",
      label: "Where it is",
      type: "radio",
      options: ["Rough idea", "Spec written", "Already building"],
      required: true,
    },
    {
      name: "build",
      label: "What you are sitting on",
      type: "textarea",
      required: true,
      placeholder: "One or two lines",
    },
    budgetField,
  ],
  about: [
    nameField,
    emailField,
    {
      name: "stage",
      label: "Where it is",
      type: "radio",
      options: ["Rough idea", "Spec written", "Already building"],
      required: true,
    },
    {
      name: "build",
      label: "What you are sitting on",
      type: "textarea",
      required: true,
      placeholder: "One or two lines",
    },
  ],
  careers: [
    {
      name: "mode",
      label: "Which door?",
      type: "radio",
      options: ["Join the studio", "Pitch an idea"],
      required: true,
    },
    nameField,
    emailField,
    {
      name: "link",
      label: "A link",
      type: "input",
      required: false,
      placeholder: "Portfolio, repo, resume",
    },
    {
      name: "detail",
      label: "What you'd bring, or the idea",
      type: "textarea",
      required: true,
    },
  ],
  work: [
    nameField,
    emailField,
    {
      name: "build",
      label: "What are we building?",
      type: "textarea",
      required: true,
      placeholder: "One or two lines",
    },
    {
      name: "timeline",
      label: "When should it be moving?",
      type: "radio",
      options: [
        "asap / this month",
        "within the quarter",
        "next quarter",
        "just exploring",
      ],
      required: true,
    },
    budgetField,
  ],
  check: [
    {
      name: "build",
      label: "What it is",
      type: "textarea",
      required: true,
      placeholder: "The last thing that will not ship",
    },
    {
      name: "situation",
      label: "Where it's stuck",
      type: "radio",
      options: ["Almost done", "Stalled", "Live, but fragile", "Just an idea"],
      required: true,
    },
    {
      name: "stack",
      label: "Stack",
      type: "radio",
      options: ["Next.js / React", "Rails / Django / Laravel", "Mobile", "Something else"],
      required: true,
      when: (answers) => !/idea/i.test(answers.situation ?? ""),
    },
    {
      name: "access",
      label: "Access you can give",
      type: "radio",
      options: ["Full access", "Partial", "Not yet"],
      required: true,
      when: (answers) => !/idea/i.test(answers.situation ?? ""),
    },
    nameField,
    emailField,
    {
      name: "codeLocation",
      label: "Repo, if you have one",
      type: "input",
      input: "url",
      required: false,
      placeholder: "https://github.com/you/the-thing",
      when: (answers) => !/idea/i.test(answers.situation ?? ""),
    },
  ],
};
