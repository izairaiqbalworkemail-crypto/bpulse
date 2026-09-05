import type { Field, Script } from "@/lib/conversation/types";
import { getSpecialist, specialists } from "@/content/specialists";

const YES_NO = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "unsure", label: "I don't know yet" },
] as const;

function identity(first: string): Field {
  return {
    name: "identity",
    ask: `Where should ${first} write back?`,
    kind: "identity",
    required: true,
  };
}

function banner(first: string): string {
  return `A written intake, not a chatbot. Nobody is typing. ${first} reads every one and replies within one business day.`;
}

function script(
  id: string,
  first: string,
  fields: Field[],
): Script {
  return {
    id,
    source: id,
    banner: banner(first),
    fields: [...fields, identity(first)],
  };
}

export const BRIEF_LABEL: Record<string, string> = {
  product: "Building",
  state: "State",
  deployed: "Deployed",
  firstDeploy: "First deploy",
  nextShip: "Next ship",
  pipeline: "Pipeline",
  model: "Model",
  realData: "Real data",
  evals: "Evals",
  scope: "Scope",
  whoLeft: "Who's left",
  docsLeft: "What's written down",
  architecture: "Architecture",
  refuse: "Refuse",
  lastTwenty: "Last twenty",
  fieldUse: "In the field",
  tested: "Tested",
  interface: "Interface",
  legal: "Legal",
  people: "People",
  trust: "Trust",
  deadline: "Timeline",
  name: "Contact",
  email: "Contact",
};

export const directScripts: Record<string, Script> = {
  aneeb: script("direct-aneeb", "Aneeb", [
    {
      name: "product",
      ask: "What are you sitting on?",
      kind: "textarea",
      required: true,
      placeholder: "The product, in a sentence.",
    },
    {
      name: "scope",
      ask: "Is the stuck part scoped, or is that the work?",
      kind: "chips",
      required: true,
      chips: [
        { id: "scoped", label: "We know the stuck part" },
        { id: "not-scoped", label: "That's what we need named" },
        { id: "idea", label: "It's still an idea" },
      ],
    },
    {
      name: "whoLeft",
      ask: "Who built it, and are they still there?",
      kind: "chips",
      required: true,
      chips: [
        { id: "still", label: "Still here" },
        { id: "left", label: "They left" },
        { id: "mixed", label: "Some left" },
      ],
    },
    {
      name: "docsLeft",
      ask: "Is any of it written down — the auth, the deploy, the decisions?",
      kind: "textarea",
      required: true,
      placeholder: "A README, a Notion page, nothing, a person who left with it.",
      when: (answers) => answers.whoLeft === "left" || answers.whoLeft === "mixed",
    },
    {
      name: "state",
      ask: "Where does it live today?",
      kind: "chips",
      required: true,
      chips: [
        { id: "demo", label: "Demo" },
        { id: "staging", label: "Staging" },
        { id: "live", label: "Live" },
      ],
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
      placeholder: "A board, a contract, or none.",
    },
  ]),
  hassan: script("direct-hassan", "Hassan", [
    {
      name: "product",
      ask: "What are you building?",
      kind: "textarea",
      required: true,
      placeholder: "One or two lines.",
    },
    {
      name: "deployed",
      ask: "Has this ever been deployed to production, even once?",
      kind: "chips",
      required: true,
      chips: [
        { id: "never", label: "Never" },
        { id: "once", label: "Once" },
        { id: "it-does", label: "It does" },
      ],
    },
    {
      name: "firstDeploy",
      ask: "What's stopping the first deploy?",
      kind: "textarea",
      required: true,
      placeholder: "Secrets, a VPC, a person who left…",
      when: (answers) => answers.deployed === "never",
    },
    {
      name: "nextShip",
      ask: "What happens when you try to ship the next one?",
      kind: "textarea",
      required: true,
      placeholder: "The rollback, the freeze, the Friday fear.",
      when: (answers) => answers.deployed === "once" || answers.deployed === "it-does",
    },
    {
      name: "pipeline",
      ask: "Who owns the pipeline today?",
      kind: "textarea",
      required: true,
      placeholder: "A name, a shop, or nobody.",
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
      placeholder: "Or none.",
    },
  ]),
  najiullah: script("direct-najiullah", "NajiUllah", [
    {
      name: "product",
      ask: "What is the model supposed to do?",
      kind: "textarea",
      required: true,
      placeholder: "The decision it is meant to make.",
    },
    {
      name: "model",
      ask: "Is there a model in it, or is that the wrong door?",
      kind: "chips",
      required: true,
      chips: [
        { id: "yes", label: "There is a model" },
        { id: "planned", label: "We're about to add one" },
        { id: "no", label: "Wrong door" },
      ],
    },
    {
      name: "realData",
      ask: "Does the model behave differently on real data than in testing?",
      kind: "textarea",
      required: true,
      placeholder: "What it gets wrong outside the demo set.",
      when: (answers) => answers.model === "yes" || answers.model === "planned",
    },
    {
      name: "evals",
      ask: "Can you measure that, or is it a feeling?",
      kind: "chips",
      required: true,
      chips: YES_NO,
      when: (answers) => answers.model === "yes" || answers.model === "planned",
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  zaira: script("direct-zaira", "Zaira", [
    {
      name: "product",
      ask: "What is the system supposed to hold?",
      kind: "textarea",
      required: true,
    },
    {
      name: "architecture",
      ask: "Is there a written architecture, or is it in someone's head?",
      kind: "chips",
      required: true,
      chips: [
        { id: "written", label: "Written" },
        { id: "head", label: "In someone's head" },
        { id: "none", label: "None yet" },
      ],
    },
    {
      name: "refuse",
      ask: "What should we refuse to build?",
      kind: "textarea",
      required: true,
      placeholder: "The part that would paint you into a corner.",
    },
    {
      name: "whoLeft",
      ask: "Who holds the architecture today?",
      kind: "chips",
      required: true,
      chips: [
        { id: "named", label: "A named person" },
        { id: "left", label: "They left" },
        { id: "none", label: "Nobody, really" },
      ],
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  fizza: script("direct-fizza", "Fizza", [
    {
      name: "product",
      ask: "What is almost done?",
      kind: "textarea",
      required: true,
    },
    {
      name: "lastTwenty",
      ask: "What is the last twenty percent, in your words?",
      kind: "textarea",
      required: true,
    },
    {
      name: "state",
      ask: "Where does it live today?",
      kind: "chips",
      required: true,
      chips: [
        { id: "demo", label: "Demo" },
        { id: "staging", label: "Staging" },
        { id: "live", label: "Live" },
      ],
    },
    {
      name: "whoLeft",
      ask: "Who is left to ship the last twenty?",
      kind: "chips",
      required: true,
      chips: [
        { id: "still", label: "Still here" },
        { id: "left", label: "They left" },
        { id: "mixed", label: "Some left" },
      ],
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  mehak: script("direct-mehak", "Mehak", [
    {
      name: "product",
      ask: "What requirements are still messy?",
      kind: "textarea",
      required: true,
    },
    {
      name: "scope",
      ask: "Has anyone signed off on a system, or are you still guessing?",
      kind: "chips",
      required: true,
      chips: [
        { id: "signed", label: "Signed off" },
        { id: "guessing", label: "Still guessing" },
      ],
    },
    {
      name: "state",
      ask: "Is compliance a constraint, or the product?",
      kind: "chips",
      required: true,
      chips: [
        { id: "constraint", label: "A constraint" },
        { id: "product", label: "The product" },
        { id: "neither", label: "Neither yet" },
      ],
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  suhaib: script("direct-suhaib", "Suhaib", [
    {
      name: "product",
      ask: "What are people using, if anything?",
      kind: "textarea",
      required: true,
    },
    {
      name: "fieldUse",
      ask: "Which feature do they actually reach for?",
      kind: "textarea",
      required: true,
    },
    {
      name: "state",
      ask: "Are you in the room with them, or reading tickets?",
      kind: "chips",
      required: true,
      chips: [
        { id: "room", label: "In the room" },
        { id: "tickets", label: "Tickets" },
      ],
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  mazar: script("direct-mazar", "Mazar", [
    {
      name: "product",
      ask: "What are you about to ship?",
      kind: "textarea",
      required: true,
    },
    {
      name: "tested",
      ask: "What was tested, and what was not?",
      kind: "textarea",
      required: true,
    },
    {
      name: "state",
      ask: "Has a release ever broken quietly?",
      kind: "chips",
      required: true,
      chips: YES_NO,
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  moiz: script("direct-moiz", "Moiz", [
    {
      name: "product",
      ask: "What needs to change in the stack?",
      kind: "textarea",
      required: true,
    },
    {
      name: "architecture",
      ask: "Is the change a page, an API, or both?",
      kind: "chips",
      required: true,
      chips: [
        { id: "page", label: "The page" },
        { id: "api", label: "The API" },
        { id: "both", label: "Both" },
      ],
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  abdullah: script("direct-abdullah", "Abdullah", [
    {
      name: "product",
      ask: "What should people see?",
      kind: "textarea",
      required: true,
    },
    {
      name: "interface",
      ask: "What can they not use today?",
      kind: "textarea",
      required: true,
    },
    {
      name: "state",
      ask: "Is this a new surface or a repair?",
      kind: "chips",
      required: true,
      chips: [
        { id: "new", label: "New" },
        { id: "repair", label: "Repair" },
      ],
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
  hamza: script("direct-hamza", "Hamza", [
    {
      name: "legal",
      ask: "What are you about to sign, or wish you had?",
      kind: "textarea",
      required: true,
      placeholder: "NDA, assignment, a vendor paper.",
    },
    {
      name: "scope",
      ask: "Has IP been assigned in writing, or is that still a handshake?",
      kind: "chips",
      required: true,
      chips: [
        { id: "written", label: "In writing" },
        { id: "handshake", label: "A handshake" },
        { id: "none", label: "Nothing yet" },
      ],
    },
    {
      name: "deadline",
      ask: "When does the paper need to be real?",
      kind: "textarea",
      required: true,
    },
  ]),
  madiha: script("direct-madiha", "Madiha", [
    {
      name: "people",
      ask: "Who on your side needs to talk to us?",
      kind: "textarea",
      required: true,
    },
    {
      name: "trust",
      ask: "What would make the next week feel less chaotic?",
      kind: "textarea",
      required: true,
    },
    {
      name: "deadline",
      ask: "What date actually matters?",
      kind: "textarea",
      required: true,
    },
  ]),
};

export const aboutDirectScript: Script = {
  id: "direct-about",
  source: "about-crew",
  banner:
    "A written intake, not a chatbot. Nobody is typing. Different people would read different answers. A person replies within one business day.",
  fields: [
    {
      name: "product",
      ask: "What kind of product are you sitting with?",
      kind: "textarea",
      required: true,
      placeholder: "Enough that Aneeb can tell if we are the door.",
    },
    {
      name: "deployed",
      ask: "Has anyone you trust seen it run outside a laptop?",
      kind: "chips",
      required: true,
      chips: [
        { id: "no", label: "No" },
        { id: "staging", label: "Staging" },
        { id: "live", label: "Live" },
      ],
    },
    {
      name: "model",
      ask: "Is there a model in it, or is that the wrong door?",
      kind: "chips",
      required: true,
      chips: [
        { id: "yes", label: "There is a model" },
        { id: "no", label: "Wrong door" },
      ],
    },
    {
      name: "realData",
      ask: "Does it behave differently on real data than in testing?",
      kind: "textarea",
      required: true,
      when: (answers) => answers.model === "yes",
    },
    {
      name: "trust",
      ask: "What would make you trust a studio with it?",
      kind: "textarea",
      required: true,
    },
    identity("Aneeb"),
  ],
};

export const ABOUT_ASKED_BY: Record<string, string> = {
  product: "aneeb",
  deployed: "hassan",
  model: "najiullah",
  realData: "najiullah",
  trust: "zaira",
  identity: "aneeb",
};

export function askedByFor(scriptId: string, fieldName: string): string {
  if (scriptId === "direct-about") {
    return ABOUT_ASKED_BY[fieldName] ?? "aneeb";
  }
  const id = scriptId.replace(/^direct-/, "");
  return specialists.some((person) => person.id === id) ? id : "aneeb";
}

export function getDirectScript(specialistId: string): Script {
  const found = directScripts[specialistId];
  if (!found) {
    const person = getSpecialist(specialistId);
    const first = person.name.split(" ")[0] ?? person.name;
    return script(`direct-${specialistId}`, first, [
      {
        name: "product",
        ask: "What should we read?",
        kind: "textarea",
        required: true,
      },
      {
        name: "deadline",
        ask: "What date actually matters?",
        kind: "textarea",
        required: true,
      },
    ]);
  }
  return found;
}

export function everySpecialistHasAScript() {
  return specialists.every((person) => Boolean(directScripts[person.id]));
}
